export type ItemConfig = {
  id: number;
  areaId: number;
};

export type TestConfig = {
  id: string;
  pageSize: number;
  scoringStrategy: string;
  items: ItemConfig[];
};

export type TestRegistry = Record<string, TestConfig>;

export type LangQuestion = { id: number; description: string };
export type LangArea = { id: number; description: string };
export type LangCareer = { id: number; description: string };

export type LangLabels = {
  AllQuestionsNeedToBeAnswered: string;
  Activity: string;
  HeroEyebrow: string;
  HeroTitle: string;
  HeroSubtitle: string;
  Yes: string;
  No: string;
  ProcessButton: string;
  ResultsTitle: string;
  Prev: string;
  Next: string;
  Page: string;
  Answered: string;
  MethodNote: string;
  MethodSummaryPrefix: string;
  MethodSummaryCode: string;
  MethodSummaryScoring: string;
  Language: string;
  ShowCareers: string;
  HideCareers: string;
  SeeAll?: string;
  SeeLess?: string;
  MethodDetail?: string;
  MethodReferencesTitle?: string;
  MethodReferences?: string[];
};

export type Lang = {
  questions: LangQuestion[];
  areas: LangArea[];
  carreras: LangCareer[];
  labels: LangLabels;
};
