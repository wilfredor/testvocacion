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
