import { SQLDatabase } from "encore.dev/storage/sqldb";

export const cmsDB = new SQLDatabase("cms", {
  migrations: "./migrations",
});
