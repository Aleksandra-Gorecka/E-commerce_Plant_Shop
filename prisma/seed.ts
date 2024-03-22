import { PrismaClient, Role } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Monstera Deliciosa',
      price: 30,
      description:
        'Also known as the "split leaf" or "swiss cheese" plant, Monstera deliciosa is a stunning tropical plant with large, glossy leaves that develop their trademark splits in maturity. This statement plant is perfect to fill a large space in your house as it is a very quick grower!',
      image: 'monstera_deliciosa.jpg',
      gallery: {
        create: [
          { image: 'monstera_deliciosa_2.jpg' },
          { image: 'monstera_deliciosa_3.jpg' },
        ],
      },
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Ficus Lyrata',
      price: 20,
      description:
        'The Ficus Lyrata "Little Fiddle" is a cousin to the Fiddle Leaf Fig that is bred to stay more compact (though it can still get sizeable!). They share similar violin-shaped leaves, but the Little Fiddle will grow to about half the size, and the plant itself will top out at around six feet instead of twelve. Like the larger Ficus Lyrata, the Little Fiddle requires a bit of extra attention to stay healthy. With enough light, humidity, and drainage, this plant will reward you with its attractive foliage.',
      image: 'ficus_lyrata.jpg',
      gallery: {
        create: [
          { image: 'ficus_lyrata_2.jpg' },
          { image: 'ficus_lyrata_3.jpg' },
        ],
      },
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17123',
      name: 'Spathiphyllum',
      price: 20,
      description:
        'This lovely indoor plant is also known as "the Peace Lily", originating from South and Central America. Its a very easy-going plant, with green glossy foliage and lovely white spathe flowers. The great thing about this plant is its ability to absorb potentially harmful chemicals from the air. So keeping it indoors can actually improve the air quality of your home or office.',
      image: 'spathiphyllum.jpg',
      gallery: {
        create: [
          { image: 'spathiphyllum_2.jpg' },
          { image: 'spathiphyllum_3.jpg' },
        ],
      },
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17124',
      name: 'Zamioculcas',
      price: 45,
      description:
        'The "ZZ" plant, or Zamioculcas zamiifolia, is one of our go-to plants for gifts, offices, or just a simple first plant that you almost certainly wont kill. This easy to care for plant does well in low light settings and barely needs any water. Perfect for beginning plant lovers!',
      image: 'zamioculcas.jpg',
      gallery: {
        create: [
          { image: 'zamioculcas_2.jpg' },
          { image: 'zamioculcas_3.jpg' },
        ],
      },
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17125',
      name: 'Philodendron',
      price: 45,
      description:
        'The philodendron micans is a rare relative of the more common philodendron cordatum. It shares the familiar heart-shaped leaves, but features a darker color and a velvety texture. This is definitely a wishlist plant in the philodendron family!',
      image: 'philodendron.jpg',
      gallery: {
        create: [
          { image: 'philodendron_2.jpg' },
          { image: 'philodendron_3.jpg' },
        ],
      },
    },
  ];
}

function getUsers() {
  return [
    {
      id: 'fd100000-0f0d-4a9f-bc41-c559c8a17125',
      email: 'admin@mail.com',
      role: Role.ADMIN,
      password: {
        create: {
          hashedPassword:
            '$2a$10$/64cmk2ozCiQktIIIufbnOFwJUBcsOlh4PL68Nlh7OJ0jesADQjJ2',
        },
      },
    },
  ];
}

async function seed() {
  await db.product.deleteMany();
  await db.user.deleteMany();

  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getUsers().map((user) => {
      return db.user.create({ data: user });
    }),
  );
}

seed();
