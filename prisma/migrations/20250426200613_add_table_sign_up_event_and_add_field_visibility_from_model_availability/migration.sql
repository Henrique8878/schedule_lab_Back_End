/*
  Warnings:

  - Added the required column `visibility` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "signUpEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "availabilityId" TEXT NOT NULL,
    CONSTRAINT "signUpEvent_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Availability" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATETIME NOT NULL,
    "beginHour" DATETIME NOT NULL,
    "endHour" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'approved',
    "visibility" TEXT NOT NULL,
    "laboratoryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Availability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Availability_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "laboratories" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Availability" ("beginHour", "created_at", "date", "endHour", "id", "laboratoryId", "status", "userId") SELECT "beginHour", "created_at", "date", "endHour", "id", "laboratoryId", "status", "userId" FROM "Availability";
DROP TABLE "Availability";
ALTER TABLE "new_Availability" RENAME TO "Availability";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
