/*
  Warnings:

  - Added the required column `operatingDays` to the `laboratories` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_laboratories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "capacity" INTEGER NOT NULL,
    "localization" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startOfBlockade" INTEGER NOT NULL,
    "endOfBlockade" INTEGER NOT NULL,
    "operatingDays" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "laboratories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_laboratories" ("capacity", "created_at", "description", "endOfBlockade", "id", "localization", "name", "startOfBlockade", "userId") SELECT "capacity", "created_at", "description", "endOfBlockade", "id", "localization", "name", "startOfBlockade", "userId" FROM "laboratories";
DROP TABLE "laboratories";
ALTER TABLE "new_laboratories" RENAME TO "laboratories";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
