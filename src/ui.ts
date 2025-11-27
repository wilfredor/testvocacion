export type UiSelectors = {
  questionList: string;
  progressText: string;
  pageText: string;
  progressBar: string;
  prevBtn: string;
  nextBtn: string;
  processBtn: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  yesLabel: string;
  resultsTitle: string;
  langSelect: string;
};

export const UI: UiSelectors = {
  questionList: "#question-list",
  progressText: "#progress-text",
  pageText: "#page-text",
  progressBar: "#progress-bar-inner",
  prevBtn: "#btn_prev",
  nextBtn: "#btn_next",
  processBtn: "#btn_procesar",
  heroEyebrow: "#hero-eyebrow",
  heroTitle: "#hero-title",
  heroSubtitle: "#hero-subtitle",
  yesLabel: "#yes-label",
  resultsTitle: "#results-title",
  langSelect: "#lang",
};

export const qs = <T extends Element = HTMLElement>(selector: string): T | null =>
  document.querySelector(selector) as T | null;

export const qsa = <T extends Element = HTMLElement>(selector: string): NodeListOf<T> =>
  document.querySelectorAll(selector) as NodeListOf<T>;
