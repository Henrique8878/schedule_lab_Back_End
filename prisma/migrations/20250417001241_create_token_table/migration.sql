/*
  Warnings:

  - Added the required column `token` to the `emailVerification` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_emailVerification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userEmail" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" DATETIME NOT NULL
);
INSERT INTO "new_emailVerification" ("expires_at", "id", "userEmail") SELECT "expires_at", "id", "userEmail" FROM "emailVerification";
DROP TABLE "emailVerification";
ALTER TABLE "new_emailVerification" RENAME TO "emailVerification";
CREATE UNIQUE INDEX "emailVerification_userEmail_key" ON "emailVerification"("userEmail");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
