import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create initial group data
  const group = await prisma.group.upsert({
    where: { name: 'Community Assistance' },
    update: {},
    create: { name: 'Community Assistance' },
  });

  // Create resource data with related models
  const resource = await prisma.resource.create({
    data: {
      name: 'Housing Support',
      description: 'Provides support for housing and rent assistance.',
      eligibility: 'Low-income families and individuals',
      cost: 0,
      externalLink: 'https://housing-support.example.com',
      group: { connect: { id: group.id } }, // Connect to the group

      // Create related languages
      languages: {
        create: [
          { name: 'English' },
          { name: 'Spanish' },
        ],
      },

      // Create related demographics
      Demo: {
        create: [
          { name: 'Families' },
          { name: 'Individuals' },
        ],
      },

      // Create related locations
      locations: {
        create: [
          {
            addressLine1: '123 Main St',
            addressLine2: 'Apt 1',
            city: 'Dallas',
            state: 'TX',
            postalCode: '75201',
            country: 'USA',
            longitude: -96.796,
            latitude: 32.7767,
          },
        ],
      },

      // Create phone number with related personal information
      phoneNumbers: {
        create: [
          {
            number: '555-1234',
            type: 'Office',
            personal: {
              create: {
                name: 'John Doe',
                description: 'Main contact person for housing support',
              },
            },
          },
        ],
      },
    },
  });

  console.log('Seeded resource:', resource);
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
