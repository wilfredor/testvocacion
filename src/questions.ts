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
import tdahEn from "./lang/tdah/en.json";
import tdahEs from "./lang/tdah/es.json";
import tdahPt from "./lang/tdah/pt.json";
import narcEn from "./lang/narc/en.json";
import narcEs from "./lang/narc/es.json";
import narcPt from "./lang/narc/pt.json";
import tplEn from "./lang/tpl/en.json";
import tplEs from "./lang/tpl/es.json";
import tplPt from "./lang/tpl/pt.json";
import { DomRenderer } from "./renderer";
import { AnswerStore } from "./state";
import { getTestConfig } from "./tests";
import { Lang, TestConfig } from "./types";
import { UI } from "./ui";

const params = new URLSearchParams(window.location.search);
const CONFIG: TestConfig = getTestConfig();
const answerStore = new AnswerStore(CONFIG);
const renderer = new DomRenderer(UI);
const controller = new TestController(CONFIG, renderer, answerStore, getLanguage);
const initialLang = params.get("lang") ?? "pt";

const LANGS: Record<string, Record<string, Lang>> = {
  en: { riasec: langEn, tdah: tdahEn, narc: narcEn, tpl: tplEn },
  es: { riasec: langEs, tdah: tdahEs, narc: narcEs, tpl: tplEs },
  pt: { riasec: langPt, tdah: tdahPt, narc: narcPt, tpl: tplPt },
  fr: { riasec: langFr },
  de: { riasec: langDe },
  it: { riasec: langIt },
  nl: { riasec: langNl },
  zh: { riasec: langZh },
  ja: { riasec: langJa },
  ar: { riasec: langAr },
  hi: { riasec: langHi },
  ru: { riasec: langRu },
};

async function getLanguage(lang: string): Promise<Lang> {
  const bundle = LANGS[lang] ?? LANGS.pt;
  const fallback = LANGS.pt;
  return bundle[CONFIG.id] ?? fallback[CONFIG.id] ?? bundle.riasec ?? fallback.riasec;
}

function wireUi() {
  const processBtn = document.getElementById("btn_procesar");
  const prevBtn = document.getElementById("btn_prev");
  const nextBtn = document.getElementById("btn_next");
  const langSelect = document.getElementById("lang") as HTMLSelectElement | null;
  const testSelect = document.getElementById("test-type") as HTMLSelectElement | null;

  if (langSelect) {
    langSelect.value = initialLang;
  }

  processBtn?.addEventListener("click", () => controller.process());
  prevBtn?.addEventListener("click", () => controller.handleNavigate(-1));
  nextBtn?.addEventListener("click", () => controller.handleNavigate(1));

  langSelect?.addEventListener("change", async (event) => {
    const target = event.target as HTMLSelectElement;
    updateUrlParam("lang", target.value);
    await controller.changeLanguage(target.value);
  });

  if (testSelect) {
    testSelect.value = CONFIG.id;
    testSelect.addEventListener("change", (event) => {
      const target = event.target as HTMLSelectElement;
      if (target.value === CONFIG.id) return;
      const params = new URLSearchParams(window.location.search);
      params.set("test", target.value);
      params.set("lang", langSelect?.value ?? initialLang);
      window.location.search = params.toString();
    });
  }
}

async function bootstrap() {
  wireUi();
  await controller.init(initialLang);
}

window.onload = bootstrap;

function updateUrlParam(key: string, value: string) {
  const current = new URLSearchParams(window.location.search);
  current.set(key, value);
  const newUrl = `${window.location.pathname}?${current.toString()}`;
  window.history.replaceState({}, "", newUrl);
}
