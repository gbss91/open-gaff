-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "address_1" TEXT NOT NULL,
    "address_2" TEXT,
    "address_3" TEXT,
    "address_4" TEXT,
    "address_5" TEXT,
    "county" TEXT NOT NULL,
    "eircode" TEXT NOT NULL,
    "bedroom_no" INTEGER NOT NULL,
    "is_registered" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rent" (
    "id" SERIAL NOT NULL,
    "rent_value" INTEGER NOT NULL,
    "rent_period" TEXT NOT NULL,
    "property_Id" INTEGER NOT NULL,

    CONSTRAINT "Rent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT,
    "property_Id" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_eircode_key" ON "Property"("eircode");

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_property_Id_fkey" FOREIGN KEY ("property_Id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_property_Id_fkey" FOREIGN KEY ("property_Id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
