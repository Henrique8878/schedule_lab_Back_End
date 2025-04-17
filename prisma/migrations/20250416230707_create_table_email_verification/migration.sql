-- CreateTable
CREATE TABLE "emailVerification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userEmail" TEXT NOT NULL,
    "expirated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "emailVerification_userEmail_key" ON "emailVerification"("userEmail");
