-- CreateTable
CREATE TABLE "Guidebook" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "restaurants" JSONB NOT NULL,
    "attractions" JSONB NOT NULL,
    "essentialServices" JSONB NOT NULL,
    "seasonalTip" TEXT NOT NULL,
    "welcomeMessage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guidebook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guidebook_propertyId_key" ON "Guidebook"("propertyId");

-- AddForeignKey
ALTER TABLE "Guidebook" ADD CONSTRAINT "Guidebook_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
