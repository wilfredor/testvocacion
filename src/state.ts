import { TestConfig } from "./types";

export class AnswerStore {
  private answers: Map<number, boolean>;
  private areas: number;

  constructor(private config: TestConfig) {
    this.answers = new Map();
    this.areas = Math.max(...config.items.map((i) => i.areaId));
  }

  setAnswer(itemId: number, value: boolean) {
    this.answers.set(itemId, value);
  }

  answeredCount(): number {
    return this.answers.size;
  }

  totalItems(): number {
    return this.config.items.length;
  }

  areAllAnswered(): boolean {
    return this.answers.size === this.config.items.length;
  }

  countsByArea(): number[] {
    const counts = Array.from({ length: this.areas }, () => 0);
    this.config.items.forEach((item) => {
      if (this.answers.get(item.id)) {
        counts[item.areaId - 1] = counts[item.areaId - 1] + 1;
      }
    });
    return counts;
  }

  toRecord(): Record<number, boolean> {
    const result: Record<number, boolean> = {};
    this.answers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
}
