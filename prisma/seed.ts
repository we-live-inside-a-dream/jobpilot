import { faker } from "@faker-js/faker";
import { db } from "../src/lib/db";

async function main() {
  await db.$transaction(
    async (tx) => {
      // 1. Clear tables (order matters!)
      await tx.application.deleteMany();
      await tx.resume.deleteMany();
      await tx.job.deleteMany();
      await tx.company.deleteMany();
      await tx.user.deleteMany();

      // 2. Create the demo user with resumes
      const user = await tx.user.create({
        data: {
          email: "demo@example.com",
          name: "Demo User",
          bio: "..........",
          resumes: {
            create: [
              { title: "Frontend Engineer Resume", content: "..." },
              { title: "Product Designer Resume", content: "..." },
            ],
          },
        },
        include: {
          resumes: true,
        },
      });
      // 3. Create companies with jobs
      const jobIds: string[] = [];

      for (let i = 0; i < 5; i++) {
        const company = await tx.company.create({
          data: {
            name: faker.company.name(),
            website: faker.internet.url(),
            jobs: {
              create: Array.from(
                { length: faker.number.int({ min: 2, max: 3 }) },
                () => ({
                  title: faker.person.jobTitle(),
                  url: faker.internet.url() + "/jobs/" + faker.string.uuid(),
                  description: faker.lorem.paragraph(2),
                  location: faker.helpers.arrayElement([
                    "Remote",
                    "London UK",
                    null,
                  ]),
                }),
              ),
            },
          },
          include: { jobs: true },
        });
        jobIds.push(...company.jobs.map((job) => job.id));
      }

      // 4. Create applications in different statuses
      const statuses = [
        "DISCOVERED",
        "APPLIED",
        "INTERVIEWING",
        "OFFER",
        "REJECTED",
      ] as const;
      for (const [i, status] of statuses.entries()) {
        const isDiscovered = status === "DISCOVERED";
        await tx.application.create({
          data: {
            status,
            matchScore: isDiscovered
              ? null
              : faker.number.int({ min: 0, max: 100 }),
            notes: `Demo application ${i + 1}`,
            user: { connect: { id: user.id } },
            job: { connect: { id: jobIds[i] } },
            ...(isDiscovered
              ? null
              : { resume: { connect: { id: user.resumes[0].id } } }),
            appliedAt: isDiscovered ? null : faker.date.recent(),
          },
        });
      }
    },
    { timeout: 30_000 },
  );

  console.log("🌱 seed complete");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
