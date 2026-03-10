-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "address_1" TEXT NOT NULL,
    "address_2" TEXT,
    "address_3" TEXT,
    "address_4" TEXT,
    "county" TEXT NOT NULL,
    "eircode" TEXT NOT NULL,
    "bedroom_no" INTEGER NOT NULL,
    "is_registered" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rent" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "arrangementType" TEXT NOT NULL,
    "occupants_count" INTEGER,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "property_id" INTEGER NOT NULL,

    CONSTRAINT "Rent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_eircode_key" ON "Property"("eircode");

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
