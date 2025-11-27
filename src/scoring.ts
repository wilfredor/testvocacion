import { TestConfig } from "./types";

export interface ScoringStrategy {
  score: (config: TestConfig, answers: Record<number, boolean>) => number[];
}

const yesCountStrategy: ScoringStrategy = {
  score: (config, answers) => {
    const areas = Math.max(...config.items.map((i) => i.areaId));
    const counts = Array.from({ length: areas }, () => 0);
    config.items.forEach((item, idx) => {
      const answeredYes = answers[item.id] ?? answers[idx + 1];
      if (answeredYes) {
        counts[item.areaId - 1] = counts[item.areaId - 1] + 1;
      }
    });
    return counts;
  },
};

export const scoringStrategies: Record<string, ScoringStrategy> = {
  yesCount: yesCountStrategy,
};
