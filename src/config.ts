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

export const TDAH_CONFIG: TestConfig = {
  id: "tdah",
  pageSize: 8,
  scoringStrategy: "yesCount",
  items: Array.from({ length: 24 }, (_, idx) => ({
    id: idx + 1,
    areaId: Math.floor(idx / 8) + 1,
  })),
};

export const NARC_CONFIG: TestConfig = {
  id: "narc",
  pageSize: 8,
  scoringStrategy: "yesCount",
  items: Array.from({ length: 24 }, (_, idx) => ({
    id: idx + 1,
    areaId: Math.floor(idx / 8) + 1,
  })),
};

export const TPL_CONFIG: TestConfig = {
  id: "tpl",
  pageSize: 8,
  scoringStrategy: "yesCount",
  items: Array.from({ length: 24 }, (_, idx) => ({
    id: idx + 1,
    areaId: Math.floor(idx / 6) + 1,
  })),
};
