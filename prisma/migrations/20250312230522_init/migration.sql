-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Availability" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATETIME NOT NULL,
    "beginHour" DATETIME NOT NULL,
    "endHour" DATETIME NOT NULL,
    "laboratoryId" TEXT NOT NULL,
    CONSTRAINT "Availability_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "laboratories" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Availability" ("beginHour", "date", "endHour", "id", "laboratoryId") SELECT "beginHour", "date", "endHour", "id", "laboratoryId" FROM "Availability";
DROP TABLE "Availability";
ALTER TABLE "new_Availability" RENAME TO "Availability";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
