/*
  Warnings:

  - You are about to drop the column `expirated_at` on the `emailVerification` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_emailVerification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userEmail" TEXT NOT NULL
);
INSERT INTO "new_emailVerification" ("id", "userEmail") SELECT "id", "userEmail" FROM "emailVerification";
DROP TABLE "emailVerification";
ALTER TABLE "new_emailVerification" RENAME TO "emailVerification";
CREATE UNIQUE INDEX "emailVerification_userEmail_key" ON "emailVerification"("userEmail");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
