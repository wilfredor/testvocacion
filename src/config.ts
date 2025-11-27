import { TestConfig } from "./types";

export const RIASEC_CONFIG: TestConfig = {
  id: "riasec",
  pageSize: 8,
  scoringStrategy: "yesCount",
  items: Array.from({ length: 48 }, (_, idx) => ({
    id: idx + 1,
    areaId: Math.floor(idx / 8) + 1,
  })),
};
