import { faker } from "@faker-js/faker";
import { db } from "../src/lib/db"

async function main() {
    await db.$transaction(async (tx) => {
        // 1. Clear tables (order matters!)
        await tx.application.deleteMany();
        await tx.resume.deleteMany();
        await tx.job.deleteMany();
        await tx.company.deleteMany();
        await tx.user.deleteMany();
        
        // 2. Create the demo user with resumes
        const user = await tx.user.create({
            data: {
                email: "demo@jobpilot.com",
                name: "Demo User",
                bio: "..........",
                resumes: {
                    create: [
                        { title: "Frontend Engineer Resume", content: "..." },
                        { title: "Product Designer Resume", content: "..." }
                    ]
                }
            },
            include: {
                resumes: true
            }
        });
        // 3. Create companies with jobs
        const company = await tx.company.create({
            data: {
                name: "Anthropic Job",
                website: "https://www.anthropic.com/",
                jobs: {
                    create: [
                        { title: "Demo Job at Anthropics", url: "https://job-boards.greenhouse.io/anthropic/jobs/5439169008", description: "Frontend job", location: "UK",  },
                        { title: "Demo Job at OpenAI", url: "https://openai.com/careers/applied-ai-architect-large-enterprise-london-uk/", description: "AI job", location: "UK",  }
                    ]
                }

            },
            include: {
                jobs: true
            }
        });
        // 4. Create applications in different statuses
        const application = await tx.application.create({
            data: {
                status: "DISCOVERED",
                matchScore: 5,
                notes: "Demo Notes",

                user: {
                    connect: { id: user.id}
                },
                job: {
                    connect: { id: company.jobs[0].id}
                },
            }
        })
    })

    console.log("🌱 seed complete")
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => db.$disconnect());