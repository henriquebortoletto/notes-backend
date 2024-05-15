import path from "path";
import * as url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db"),
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },
    useNullAsDefault: true,
  },
};
