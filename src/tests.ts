import { NARC_CONFIG, RIASEC_CONFIG, TDAH_CONFIG, TPL_CONFIG } from "./config";
import { TestConfig, TestRegistry } from "./types";

const tests: TestRegistry = {
  riasec: RIASEC_CONFIG,
  tdah: TDAH_CONFIG,
  narc: NARC_CONFIG,
  tpl: TPL_CONFIG,
};

export function getTestConfig(): TestConfig {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("test") || "riasec";
  return tests[key] ?? RIASEC_CONFIG;
}
