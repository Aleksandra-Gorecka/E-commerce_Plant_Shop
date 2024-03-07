import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Monstera',
      price: 30,
      description:
        'Lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum',
      image: 'image.jpg',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Ficus',
      price: 20,
      description:
        'Lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum',
      image: 'image2.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17123',
      name: 'Spathiphyllum',
      price: 20,
      description:
        'Lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum',
      image: 'image3.jpg',
    },
  ];
}

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );
}

seed();
