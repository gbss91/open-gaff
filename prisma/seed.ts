import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { Pool } from "pg";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const properties = [
  {
    address1: "14 Grafton Street",
    address2: "Dublin 2",
    county: "Dublin",
    eircode: "D02Y828",
    bedroomNo: 2,
    rents: [
      {
        amount: 2800,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-01-15"),
      },
      {
        amount: 2650,
        arrangementType: "whole_unit",
        addedAt: new Date("2023-06-01"),
      },
    ],
  },
  {
    address1: "5 Rathmines Road Upper",
    address2: "Rathmines",
    address3: "Dublin 6",
    county: "Dublin",
    eircode: "D06H210",
    bedroomNo: 3,
    rents: [
      {
        amount: 3200,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-03-10"),
      },
      {
        amount: 1100,
        arrangementType: "private_room",
        occupantsCount: 3,
        addedAt: new Date("2024-02-01"),
      },
    ],
  },
  {
    address1: "22 Clontarf Road",
    address2: "Clontarf",
    address3: "Dublin 3",
    county: "Dublin",
    eircode: "D03V6K2",
    bedroomNo: 2,
    rents: [
      {
        amount: 2600,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-02-20"),
      },
    ],
  },
  {
    address1: "8 Ranelagh Road",
    address2: "Ranelagh",
    address3: "Dublin 6",
    county: "Dublin",
    eircode: "D06W821",
    bedroomNo: 1,
    rents: [
      {
        amount: 1950,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-04-05"),
      },
      {
        amount: 1850,
        arrangementType: "whole_unit",
        addedAt: new Date("2023-09-01"),
      },
    ],
  },
  {
    address1: "31 Drumcondra Road Lower",
    address2: "Drumcondra",
    address3: "Dublin 9",
    county: "Dublin",
    eircode: "D09W2K4",
    bedroomNo: 3,
    rents: [
      {
        amount: 3400,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-01-30"),
      },
      {
        amount: 1150,
        arrangementType: "private_room",
        occupantsCount: 4,
        addedAt: new Date("2024-03-15"),
      },
    ],
  },
  {
    address1: "Apartment 4, Block B",
    address2: "Grand Canal Dock",
    address3: "Dublin 2",
    county: "Dublin",
    eircode: "D02XK50",
    bedroomNo: 1,
    rents: [
      {
        amount: 2200,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-05-01"),
      },
    ],
  },
  {
    address1: "17 College Road",
    address2: "Galway",
    county: "Galway",
    eircode: "H91XD24",
    bedroomNo: 2,
    rents: [
      {
        amount: 1800,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-02-14"),
      },
      {
        amount: 900,
        arrangementType: "private_room",
        occupantsCount: 2,
        addedAt: new Date("2024-01-10"),
      },
    ],
  },
  {
    address1: "3 Western Road",
    address2: "Galway",
    county: "Galway",
    eircode: "H91Y3N8",
    bedroomNo: 4,
    rents: [
      {
        amount: 2800,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-03-22"),
      },
      {
        amount: 750,
        arrangementType: "shared_room",
        occupantsCount: 4,
        addedAt: new Date("2024-02-28"),
      },
    ],
  },
  {
    address1: "42 Patrick Street",
    address2: "Cork",
    county: "Cork",
    eircode: "T12W6X4",
    bedroomNo: 2,
    rents: [
      {
        amount: 1900,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-04-18"),
      },
    ],
  },
  {
    address1: "9 Sunday's Well Road",
    address2: "Cork",
    county: "Cork",
    eircode: "T23HP54",
    bedroomNo: 3,
    rents: [
      {
        amount: 2400,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-01-25"),
      },
      {
        amount: 950,
        arrangementType: "private_room",
        occupantsCount: 3,
        addedAt: new Date("2024-03-01"),
      },
    ],
  },
  {
    address1: "15 O'Connell Street",
    address2: "Limerick",
    county: "Limerick",
    eircode: "V94XP28",
    bedroomNo: 2,
    rents: [
      {
        amount: 1600,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-02-10"),
      },
    ],
  },
  {
    address1: "7 Pery Square",
    address2: "Limerick",
    county: "Limerick",
    eircode: "V94C5R2",
    bedroomNo: 3,
    rents: [
      {
        amount: 2100,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-04-30"),
      },
      {
        amount: 800,
        arrangementType: "private_room",
        occupantsCount: 3,
        addedAt: new Date("2024-03-20"),
      },
    ],
  },
  {
    address1: "28 Waterford Quay",
    address2: "Waterford",
    county: "Waterford",
    eircode: "X91YK32",
    bedroomNo: 2,
    rents: [
      {
        amount: 1500,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-01-08"),
      },
    ],
  },
  {
    address1: "Apartment 12",
    address2: "Kilkenny Road",
    address3: "Kilkenny",
    county: "Kilkenny",
    eircode: "R95XH48",
    bedroomNo: 1,
    rents: [
      {
        amount: 1300,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-05-12"),
      },
    ],
  },
  {
    address1: "6 Friar Street",
    address2: "Kilkenny",
    county: "Kilkenny",
    eircode: "R95W2N6",
    bedroomNo: 3,
    rents: [
      {
        amount: 2000,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-02-05"),
      },
      {
        amount: 750,
        arrangementType: "shared_room",
        occupantsCount: 3,
        addedAt: new Date("2024-04-01"),
      },
    ],
  },
  {
    address1: "19 Pembroke Road",
    address2: "Ballsbridge",
    address3: "Dublin 4",
    county: "Dublin",
    eircode: "D04V6P8",
    bedroomNo: 2,
    rents: [
      {
        amount: 3100,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-03-28"),
      },
      {
        amount: 1250,
        arrangementType: "private_room",
        occupantsCount: 2,
        addedAt: new Date("2024-05-05"),
      },
    ],
  },
  {
    address1: "2 Salthill Promenade",
    address2: "Salthill",
    address3: "Galway",
    county: "Galway",
    eircode: "H91V8K2",
    bedroomNo: 2,
    rents: [
      {
        amount: 2000,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-04-10"),
      },
    ],
  },
  {
    address1: "55 Dorset Street Upper",
    address2: "Dublin 1",
    county: "Dublin",
    eircode: "D01Y6W4",
    bedroomNo: 1,
    rents: [
      {
        amount: 1800,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-01-20"),
      },
      {
        amount: 700,
        arrangementType: "shared_room",
        occupantsCount: 2,
        addedAt: new Date("2024-03-05"),
      },
    ],
  },
  {
    address1: "11 MacCurtain Street",
    address2: "Cork",
    county: "Cork",
    eircode: "T23KP62",
    bedroomNo: 2,
    rents: [
      {
        amount: 1750,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-05-20"),
      },
    ],
  },
  {
    address1: "Apartment 3",
    address2: "Dominick Street",
    address3: "Galway",
    county: "Galway",
    eircode: "H91T4R6",
    bedroomNo: 1,
    rents: [
      {
        amount: 1600,
        arrangementType: "whole_unit",
        addedAt: new Date("2024-02-25"),
      },
      {
        amount: 850,
        arrangementType: "private_room",
        occupantsCount: 2,
        addedAt: new Date("2024-04-15"),
      },
    ],
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.rent.deleteMany();
  await prisma.property.deleteMany();

  for (const property of properties) {
    const { rents, ...propertyData } = property;

    const created = await prisma.property.create({
      data: {
        ...propertyData,
        rents: {
          create: rents,
        },
      },
    });

    console.log(`✅ Created property: ${created.address1}, ${created.county}`);
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
