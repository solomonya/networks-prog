/*
  Warnings:

  - Added the required column `duration` to the `RequestHistory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RequestHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,
    "query" TEXT NOT NULL
);
INSERT INTO "new_RequestHistory" ("createdAt", "id", "query") SELECT "createdAt", "id", "query" FROM "RequestHistory";
DROP TABLE "RequestHistory";
ALTER TABLE "new_RequestHistory" RENAME TO "RequestHistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
