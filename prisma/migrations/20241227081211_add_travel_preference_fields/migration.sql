-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currency" TEXT,
ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "timeZone" TEXT;

-- CreateTable
CREATE TABLE "TravelPreferences" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "travelPace" TEXT,
    "activityTypes" TEXT,
    "budgetRange" TEXT,

    CONSTRAINT "TravelPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TravelPreferences_userId_key" ON "TravelPreferences"("userId");

-- AddForeignKey
ALTER TABLE "TravelPreferences" ADD CONSTRAINT "TravelPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
