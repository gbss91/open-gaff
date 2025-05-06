import { prismaMock } from "@/tests/mocks/prisma";
import { propertyService } from "@/server/services/propertyService";

describe("Property service unit tests", () => {
  test("getAllProperties returns properties", async () => {
    const mockProperties = [
      {
        id: 1,
        address1: "Test",
        county: "Dublin",
        eircode: "D08",
        bedroomNo: 2,
        isRegistered: false,
      },
    ];
    prismaMock.property.findMany.mockResolvedValue(mockProperties);

    const result = await propertyService.getAllProperties();
    expect(prismaMock.property.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockProperties);
  });

  test("getPropertyById returns a property", async () => {
    const mockProperty = {
      id: 1,
      address1: "Test",
      county: "Dublin",
      isRegistered: false,
    };
    prismaMock.property.findUnique.mockResolvedValue(mockProperty);

    const result = await propertyService.getPropertyById(1);
    expect(prismaMock.property.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockProperty);
  });

  test("addProperty creates a property", async () => {
    const mockInput = {
      address1: "123",
      address2: "Street",
      address3: "",
      address4: "",
      address5: "",
      county: "Cork",
      eircode: "123",
      bedroomNo: 3,
    };
    const mockCreated = { ...mockInput, id: 1, isRegistered: false };
    prismaMock.property.create.mockResolvedValue(mockCreated);

    const result = await propertyService.addProperty(mockInput);
    expect(prismaMock.property.create).toHaveBeenCalled();
    expect(result).toEqual(mockCreated);
  });

  test("getPropertiesByQuery calls findMany with OR conditions", async () => {
    const mockResult = [
      { id: 2, address1: "Gran Street", county: "Galway", isRegistered: false },
    ];
    prismaMock.property.findMany.mockResolvedValue(mockResult);

    const query = "Grand";
    const result = await propertyService.getPropertiesByQuery(query);

    expect(prismaMock.property.findMany).toHaveBeenCalledWith({
      where: {
        OR: expect.any(Array),
      },
    });
    expect(result).toEqual(mockResult);
  });
});
