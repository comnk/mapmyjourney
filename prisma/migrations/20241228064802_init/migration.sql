-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpires" TIMESTAMP(3),
    "profilePicture" TEXT,
    "timeZone" TEXT,
    "currency" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TravelPreferences_userId_key" ON "TravelPreferences"("userId");

-- AddForeignKey
ALTER TABLE "TravelPreferences" ADD CONSTRAINT "TravelPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
