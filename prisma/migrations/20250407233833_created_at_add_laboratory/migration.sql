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
    "userId" TEXT NOT NULL,
    CONSTRAINT "laboratories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_laboratories" ("capacity", "description", "id", "localization", "name", "userId") SELECT "capacity", "description", "id", "localization", "name", "userId" FROM "laboratories";
DROP TABLE "laboratories";
ALTER TABLE "new_laboratories" RENAME TO "laboratories";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
