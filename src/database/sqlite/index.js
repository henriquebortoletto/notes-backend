import sqlite3 from "sqlite3";
import path from "path";

import { open } from "sqlite";
import { fileURLToPath } from "url";

import { createUsers } from "./migrations/createUsers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class DB {
  async connection() {
    return await open({
      filename: path.resolve(__dirname, "..", "database.db"),
      driver: sqlite3.Database,
    });
  }

  async execute() {
    const schemas = [createUsers].join("");

    const database = await this.connection();
    console.log("> [database] connected!");

    const migrate = await database.exec(schemas);
    console.log("> [migrates] connected!");

    return migrate;
  }
}
