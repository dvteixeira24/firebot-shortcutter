import { promises as fs } from "fs";
import { Config, JsonDB } from "node-json-db";

const seed = {
  decks: {},
};

const filePath = process.env.APP_STORE_PATH || "db/appdb_" + (process.env.NODE_ENV || "") + ".json";

// Function to check if the file exists, and write to it if it doesn't
export async function checkAndCreateJSONDBFile() {
  try {
    // Check if the file exists asynchronously
    await fs.access(filePath);
    console.log("JSON DB file already exists.");
  } catch (error) {
    // If file does not exist, write the seed data
    console.log("JSON DB file does not exist, creating...");
    await fs.writeFile(filePath, JSON.stringify(seed, null, 2)); // Pretty-print with 2 spaces
    console.log("JSON DB file created at " + filePath);
  }
}

// Initialize the JsonDB instance
export const store = new JsonDB(new Config(filePath));

export type TailwindColor =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone";

export interface PresetAction {
  label: string;
  icon: string; // src url base 64
  presetId: string;
  args: Record<string, string | number>;
  color: TailwindColor;
}

export interface DeckConfig {
  name: string;
  columns: number;
  color: TailwindColor;
  tileOrder: string[];
}

export interface Store {
  decks: {
    [id: string]: {
      deckActions: {
        [id: string]: PresetAction;
      };
      deckConfig: DeckConfig;
    };
  };
}
