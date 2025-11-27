import { Area } from "./area";
import { Question } from "./question";
import { AnswerStore } from "./state";
import Table from "./table";
import { Lang, TestConfig } from "./types";
import { UI, qs, qsa } from "./ui";

export interface Renderer {
  setLanguageTexts(lang: Lang): void;
  updateToggleLabels(lang: Lang): void;
  renderQuestions(config: TestConfig, lang: Lang, answers: Record<number, boolean>): void;
  setProgress(answered: number, total: number, label: string): void;
  setNavigation(current: number, total: number, canProcess: boolean, lang: Lang): void;
  markRowError(index: number, hasError: boolean): void;
  showNotice(message: string): void;
  hideNotice(): void;
  resetResults(): void;
  renderResults(areas: Area[], counts: number[], lang: Lang, answerStore: AnswerStore): void;
  showPage(page: number, pageSize: number): void;
  getQuestionRows(): NodeListOf<Element>;
  isResultsVisible(): boolean;
}

export class DomRenderer implements Renderer {
  constructor(private selectors = UI) {}

  setLanguageTexts(lang: Lang) {
    const eyebrow = qs(this.selectors.heroEyebrow);
    const title = qs(this.selectors.heroTitle);
    const subtitle = qs(this.selectors.heroSubtitle);
    if (eyebrow) eyebrow.textContent = lang.labels.HeroEyebrow;
    if (title) title.textContent = lang.labels.HeroTitle;
    if (subtitle) subtitle.textContent = lang.labels.HeroSubtitle;
    const yesLabel = qs(this.selectors.yesLabel);
    if (yesLabel) yesLabel.textContent = lang.labels.Yes;
    const processBtn = qs<HTMLInputElement>(this.selectors.processBtn);
    if (processBtn) processBtn.value = lang.labels.ProcessButton;
    const resultsTitle = qs(this.selectors.resultsTitle);
    if (resultsTitle) resultsTitle.textContent = lang.labels.ResultsTitle;
    const prevBtn = qs<HTMLButtonElement>(this.selectors.prevBtn);
    const nextBtn = qs<HTMLButtonElement>(this.selectors.nextBtn);
    if (prevBtn) prevBtn.textContent = lang.labels.Prev;
    if (nextBtn) nextBtn.textContent = lang.labels.Next;
    const langSelect = qs(this.selectors.langSelect);
    if (langSelect) langSelect.setAttribute("aria-label", lang.labels.Language);

    const docTitle = qs<HTMLTitleElement>("title");
    if (docTitle) docTitle.textContent = `${lang.labels.HeroEyebrow} - ${lang.labels.HeroTitle}`;

    this.updateToggleLabels(lang);
  }

  renderQuestions(config: TestConfig, lang: Lang, answers: Record<number, boolean> = {}) {
    const list = qs(this.selectors.questionList);
    if (!list) return;
    list.innerHTML = "";
    config.items.forEach((item, index) => {
      const question = new Question(item.id, lang);
      const selected = answers[item.id];
      Table.addRow(index, question, { yes: lang.labels.Yes, no: lang.labels.No }, index, selected);
    });
    this.updateToggleLabels(lang);
  }

  setProgress(answered: number, total: number, label: string) {
    const progressText = qs(this.selectors.progressText);
    if (progressText) progressText.textContent = `${label} ${answered}/${total}`;
    const bar = qs<HTMLElement>(this.selectors.progressBar);
    if (bar) bar.style.width = `${Math.round((answered / total) * 100)}%`;
  }

  setNavigation(current: number, total: number, canProcess: boolean, lang: Lang) {
    const pageText = qs(this.selectors.pageText);
    if (pageText) pageText.textContent = `${lang.labels.Page} ${current}/${total}`;
    const prev = qs<HTMLButtonElement>(this.selectors.prevBtn);
    const next = qs<HTMLButtonElement>(this.selectors.nextBtn);
    if (prev) prev.disabled = current <= 1;
    if (next) next.disabled = current >= total;
    const processBtn = qs<HTMLInputElement>(this.selectors.processBtn);
    if (processBtn) processBtn.style.display = canProcess ? "inline-block" : "none";
  }

  markRowError(index: number, hasError: boolean) {
    const row = qs<HTMLElement>(`${this.selectors.questionList} .question-row[data-question-index="${index}"]`);
    if (!row) return;
    row.classList.toggle("row-error", hasError);
  }

  showNotice(message: string) {
    const notice = qs<HTMLElement>(this.selectors.notice);
    if (!notice) return;
    notice.textContent = message;
    notice.classList.remove("hidden");
  }

  hideNotice() {
    const notice = qs<HTMLElement>(this.selectors.notice);
    if (!notice) return;
    notice.textContent = "";
    notice.classList.add("hidden");
  }

  resetResults() {
    const results = qs(this.selectors.areasContainer);
    const resultsSection = qs<HTMLElement>(this.selectors.resultsSection);
    this.clearChildren(results);
    if (resultsSection) {
      resultsSection.classList.add("hidden");
      resultsSection.classList.remove("visible");
    }
  }

  showPage(page: number, pageSize: number) {
    const rows = qsa(`${this.selectors.questionList} .question-row`);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    rows.forEach((row, idx) => {
      (row as HTMLElement).classList.toggle("hidden", idx < start || idx >= end);
    });
  }

  renderResults(areas: Area[], counts: number[], lang: Lang, answerStore: AnswerStore) {
    const results = qs(this.selectors.areasContainer);
    const resultsSection = qs<HTMLElement>(this.selectors.resultsSection);
    this.clearChildren(results);

    areas.forEach((area, idx) => {
      const card = document.createElement("div");
      card.className = "area-card";
      if (idx < 3) card.classList.add("top");

      const badge = document.createElement("div");
      badge.className = "badge-rank";
      badge.textContent = `#${idx + 1}`;

      const titleRow = document.createElement("div");
      titleRow.className = "area-title-row";

      const h1 = document.createElement("h1");
      h1.className = "area-name";
      h1.innerText = area.description;

      const percent = document.createElement("div");
      percent.className = "area-percent";
      const questionsPerArea = lang.questions.length / lang.areas.length;
      const areaIndex = lang.areas.findIndex((a) => a.id === area._id);
      const countValue = areaIndex >= 0 ? counts[areaIndex] ?? 0 : 0;
      percent.innerText = `${area.porcent}% (${countValue}/${questionsPerArea})`;

      titleRow.appendChild(h1);
      titleRow.appendChild(percent);

      const bar = document.createElement("div");
      bar.className = "bar";
      const barFill = document.createElement("div");
      barFill.className = "bar-fill";
      barFill.style.width = `${area.porcent}%`;
      bar.appendChild(barFill);

      const desc = document.createElement("p");
      desc.className = "area-description";
      desc.innerText = area.carreras;

      const toggle = document.createElement("button");
      toggle.className = "toggle-desc";
      toggle.textContent = lang.labels.ShowCareers;
      toggle.addEventListener("click", () => {
        const expanded = card.classList.toggle("expanded");
        toggle.textContent = expanded ? lang.labels.HideCareers : lang.labels.ShowCareers;
      });

      card.appendChild(badge);
      card.appendChild(titleRow);
      card.appendChild(bar);
      card.appendChild(toggle);
      card.appendChild(desc);

      results?.appendChild(card);
    });

    const methodNote = document.createElement("div");
    methodNote.className = "method-note";
    methodNote.textContent = this.buildMethodSummary(areas, counts, lang, answerStore);
    results?.appendChild(methodNote);

    if (resultsSection) {
      resultsSection.classList.remove("hidden");
      resultsSection.classList.add("visible");
    }
  }

  updateToggleLabels(lang: Lang) {
    const toggles = qsa(`${this.selectors.questionList} .toggle .option-btn`);
    toggles.forEach((btn) => {
      const value = (btn as HTMLElement).dataset.value;
      if (value === "yes") {
        (btn as HTMLElement).textContent = lang.labels.Yes;
      }
      if (value === "no") {
        (btn as HTMLElement).textContent = lang.labels.No;
      }
    });
  }

  private buildMethodSummary(areas: Area[], counts: number[], lang: Lang, store: AnswerStore): string {
    const total = store.totalItems();
    const answered = store.answeredCount();
    const topCode = areas.slice(0, 3).map((a) => a.description.charAt(0)).join("");
    const base = lang.labels.MethodNote;
    const prefix = `${lang.labels.MethodSummaryPrefix} ${answered}/${total}.`;
    const code = `${lang.labels.MethodSummaryCode}: ${topCode}.`;
    const scoring = lang.labels.MethodSummaryScoring;
    return `${base} ${prefix} ${code} ${scoring}`;
  }

  getQuestionRows(): NodeListOf<Element> {
    return qsa(`${this.selectors.questionList} .question-row`);
  }

  isResultsVisible(): boolean {
    const resultsSection = qs<HTMLElement>(this.selectors.resultsSection);
    return !!resultsSection && resultsSection.classList.contains("visible");
  }

  private clearChildren(element: Element | null) {
    if (!element) return;
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}
