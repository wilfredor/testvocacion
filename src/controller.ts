import { Area } from "./area";
import { DomRenderer, Renderer } from "./renderer";
import { scoringStrategies } from "./scoring";
import { AnswerStore } from "./state";
import { Lang, TestConfig } from "./types";

type LanguageLoader = (code: string) => Promise<Lang>;

export class TestController {
  private currentPage = 1;
  private totalPages = 1;
  private lang: Lang;

  constructor(
    private config: TestConfig,
    private renderer: Renderer = new DomRenderer(),
    private store: AnswerStore = new AnswerStore(config),
    private loadLanguage: LanguageLoader,
  ) {
    this.lang = {} as Lang;
  }

  async init(defaultLang = "pt") {
    this.lang = await this.loadLanguage(defaultLang);
    this.renderer.setLanguageTexts(this.lang);
    this.renderer.renderQuestions(this.config, this.lang, this.store.toRecord());
    this.renderer.updateToggleLabels(this.lang);
    this.renderer.resetResults();
    this.attachAnswerListeners();
    this.updatePaginationMeta();
    this.showPage(1);
    this.updateProgress();
  }

  async changeLanguage(code: string) {
    const previousPage = this.currentPage;
    const wasShowingResults = this.renderer.isResultsVisible();
    this.lang = await this.loadLanguage(code);
    this.renderer.setLanguageTexts(this.lang);
    this.renderer.renderQuestions(this.config, this.lang, this.store.toRecord());
    this.attachAnswerListeners();
    this.renderer.updateToggleLabels(this.lang);
    this.updatePaginationMeta();
    this.showPage(previousPage);
    if (wasShowingResults && this.store.areAllAnswered()) {
      const counts = this.areasCount();
      const porcents = counts.map((areaCount: number) => this.percent(areaCount, counts));
      this.writeAreas(porcents, counts);
    } else {
      this.renderer.resetResults();
    }
    this.updateProgress();
  }

  handleAnswer(index: number, isYes: boolean) {
    const itemId = this.config.items[index]?.id ?? index + 1;
    this.store.setAnswer(itemId, isYes);
    this.renderer.markRowError(index, false);
    this.renderer.hideNotice();
    this.updateProgress();
  }

  handleNavigate(delta: number) {
    this.showPage(this.currentPage + delta);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  process() {
    if (!this.validate()) return;
    const counts = this.areasCount();
    const porcents = counts.map((areaCount: number) => this.percent(areaCount, counts));
    this.writeAreas(porcents, counts);
  }

  private validate(): boolean {
    const missingIndex = this.config.items.findIndex((item) => !this.store.hasAnswer(item.id));
    if (missingIndex >= 0) {
      this.renderer.markRowError(missingIndex, true);
      this.renderer.showNotice(`${this.lang.labels.AllQuestionsNeedToBeAnswered} ${missingIndex + 1}`);
      this.showPage(Math.floor(missingIndex / this.config.pageSize) + 1);
      return false;
    }
    this.renderer.hideNotice();
    return true;
  }

  private areasCount() {
    const strategy = scoringStrategies[this.config.scoringStrategy];
    return strategy ? strategy.score(this.config, this.store.toRecord()) : [];
  }

  private percent(x: number, area: number[]) {
    const sum = area.reduce((a, b) => a + b, 0);
    if (sum === 0) return 0;
    return Math.floor((x * 100) / sum);
  }

  private writeAreas(areasPorcent: number[], counts: number[]) {
    const areaInstances = this.lang.areas.map((a) => {
      const area = new Area(a.id, this.lang);
      area.porcent = areasPorcent[a.id - 1] ?? 0;
      return area;
    });

    areaInstances.sort((a, b) => (b.porcent > a.porcent ? 1 : -1));
    this.renderer.renderResults(areaInstances, counts, this.lang, this.store);
  }

  private updatePaginationMeta() {
    this.totalPages = Math.max(1, Math.ceil(this.config.items.length / this.config.pageSize));
  }

  private showPage(page: number) {
    this.updatePaginationMeta();
    this.currentPage = Math.min(Math.max(page, 1), this.totalPages);
    this.renderer.showPage(this.currentPage, this.config.pageSize);
    const canProcess = this.currentPage >= this.totalPages && this.store.areAllAnswered();
    this.renderer.setNavigation(this.currentPage, this.totalPages, canProcess, this.lang);
  }

  private updateProgress() {
    const total = this.config.items.length;
    const answered = this.store.answeredCount();
    this.renderer.setProgress(answered, total, this.lang.labels.Answered);
    const canProcess = this.currentPage >= this.totalPages && this.store.areAllAnswered();
    this.renderer.setNavigation(this.currentPage, this.totalPages, canProcess, this.lang);
  }

  private attachAnswerListeners() {
    const rows = this.renderer.getQuestionRows();
    rows.forEach((row) => {
      const buttons = row.querySelectorAll(".option-btn");
      const index = Number((row as HTMLElement).dataset.questionIndex ?? "0");
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const value = (btn as HTMLElement).dataset.value === "yes";
          this.handleAnswer(index, value);
          buttons.forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
        });
      });
    });
  }
}
