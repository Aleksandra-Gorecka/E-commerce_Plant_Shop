import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getPlants() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Monstera',
      price: 30,
      description:
        '<p>Lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum</p>',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Ficus',
      price: 20,
      description:
        '<p>Lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum</p>',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17123',
      name: 'Spathiphyllum',
      price: 20,
      description:
        '<p>Lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum</p>',
    },
  ];
}

function getImages() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      fileName: 'image.jpg',
      plantId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17211',
      fileName: 'image2.jpg',
      plantId: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17333',
      fileName: 'image3.jpg',
      plantId: 'fd105551-0f0d-4a9f-bc41-c559c8a17123',
    },
  ];
}

async function seed() {
  await Promise.all(
    getPlants().map((plant) => {
      return db.plant.create({ data: plant });
    }),
  );

  await Promise.all(
    getImages().map(({ plantId, ...imageData }) => {
      return db.image.create({
        data: {
          ...imageData,
          plant: {
            connect: { id: plantId },
          },
        },
      });
    }),
  );
}

seed();
