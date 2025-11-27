import { TestController } from "./controller";
import langAr from "./lang/ar.json";
import langDe from "./lang/de.json";
import langEn from "./lang/en.json";
import langEs from "./lang/es.json";
import langFr from "./lang/fr.json";
import langHi from "./lang/hi.json";
import langIt from "./lang/it.json";
import langJa from "./lang/ja.json";
import langNl from "./lang/nl.json";
import langPt from "./lang/pt.json";
import langRu from "./lang/ru.json";
import langZh from "./lang/zh.json";
import { DomRenderer } from "./renderer";
import { AnswerStore } from "./state";
import { getTestConfig } from "./tests";
import { Lang, TestConfig } from "./types";
import { UI } from "./ui";

const CONFIG: TestConfig = getTestConfig();
const answerStore = new AnswerStore(CONFIG);
const renderer = new DomRenderer(UI);
const controller = new TestController(CONFIG, renderer, answerStore, getLanguage);

async function getLanguage(lang: string): Promise<Lang> {
  const langs: Record<string, Lang> = {
    en: langEn,
    es: langEs,
    pt: langPt,
    fr: langFr,
    de: langDe,
    it: langIt,
    nl: langNl,
    zh: langZh,
    ja: langJa,
    ar: langAr,
    hi: langHi,
    ru: langRu,
  };
  return langs[lang] ?? langs.pt;
}

function wireUi() {
  const processBtn = document.getElementById("btn_procesar");
  const prevBtn = document.getElementById("btn_prev");
  const nextBtn = document.getElementById("btn_next");
  const langSelect = document.getElementById("lang") as HTMLSelectElement | null;

  processBtn?.addEventListener("click", () => controller.process());
  prevBtn?.addEventListener("click", () => controller.handleNavigate(-1));
  nextBtn?.addEventListener("click", () => controller.handleNavigate(1));

  langSelect?.addEventListener("change", async (event) => {
    const target = event.target as HTMLSelectElement;
    await controller.changeLanguage(target.value);
  });
}

async function bootstrap() {
  wireUi();
  await controller.init("pt");
}

window.onload = bootstrap;
