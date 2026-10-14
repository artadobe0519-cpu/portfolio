import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { Project } from "@/types/portfolio";
import type { ProjectOverride } from "@/lib/work-draft";

export type WorkStore = {
  overrides: Record<string, ProjectOverride>;
  created: Project[];
};

const file = path.join(process.cwd(), "data", "managed", "work.json");

export function readStore(): WorkStore {
  try {
    const parsed = JSON.parse(readFileSync(file, "utf8")) as Partial<WorkStore>;
    return {
      overrides: parsed.overrides ?? {},
      created: Array.isArray(parsed.created) ? parsed.created : [],
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { overrides: {}, created: [] };
    }
    throw error;
  }
}

export function writeStore(store: WorkStore) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}
