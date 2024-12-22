import { PrismaClient } from "@prisma/client";
import { env } from "process";
import { createUser } from "~/models/user.server";

const prisma = new PrismaClient();

async function main() {
  const user = await createUser(
    "demo_supervisor@safetyobservations.test",
    process.env["DEMO_SUPERVISOR_PASSWORD"]!
  );

  const organization1 = await prisma.organization.create({
    data: {
      auth0OrgId: "org_F7T4jwkIi4qPVcfm",
    },
  });

  const plant1 = await prisma.plant.create({
    data: {
      name: "Mega Plant",
      organization: { connect: { id: organization1.id } },
      userPlants: {
        create: {
          user: { connect: { id: user.id } },
        },
      },
    },
  });

  const category1 = await prisma.category.create({
    data: {
      name: "Break Room",
      plant: { connect: { id: plant1.id } },
    },
  });

  const subcategory1 = await prisma.subcategory.create({
    data: {
      name: "Chairs",
      category: { connect: { id: category1.id } },
    },
  });

  const subcategory2 = await prisma.subcategory.create({
    data: {
      name: "Tables",
      category: { connect: { id: category1.id } },
    },
  });

  const subcategory1Question1 = await prisma.question.create({
    data: {
      text: "Do they wobble or have broken parts (like wheels, arms, or bases)?",
      subcategory: { connect: { id: subcategory1.id } },
    },
  });
  const subcategory1Question2 = await prisma.question.create({
    data: {
      text: "Are there any sharp edges or protruding screws that could cause injury?",
      subcategory: { connect: { id: subcategory1.id } },
    },
  });
  const subcategory1Question3 = await prisma.question.create({
    data: {
      text: "Do they provide adequate back support and adjustability (height, tilt, lumbar support)?",
      subcategory: { connect: { id: subcategory1.id } },
    },
  });

  const subcategory1Question4 = await prisma.question.create({
    data: {
      text: "Are they regularly cleaned and sanitized to prevent the spread of germs?",
      subcategory: { connect: { id: subcategory1.id } },
    },
  });
  const subcategory1Question5 = await prisma.question.create({
    data: {
      text: "Can people easily move around without bumping into each other or the chairs?",
      subcategory: { connect: { id: subcategory1.id } },
    },
  });

  const subcategory2Question1 = await prisma.question.create({
    data: {
      text: "Are the tabletops stable and free of sharp edges or splinters?",
      subcategory: { connect: { id: subcategory2.id } },
    },
  });
  const subcategory2Question2 = await prisma.question.create({
    data: {
      text: "Are the table legs sturdy and the tables properly secured to the floor?",
      subcategory: { connect: { id: subcategory2.id } },
    },
  });
  const subcategory2Question3 = await prisma.question.create({
    data: {
      text: "Are the tables the appropriate height for comfortable seating and dining?",
      subcategory: { connect: { id: subcategory2.id } },
    },
  });
  const subcategory2Question4 = await prisma.question.create({
    data: {
      text: "Are there enough tables to accommodate all employees during break times?",
      subcategory: { connect: { id: subcategory2.id } },
    },
  });
  const subcategory2Question5 = await prisma.question.create({
    data: {
      text: "Are the tables regularly cleaned and sanitized to prevent the spread of germs? ",
      subcategory: { connect: { id: subcategory2.id } },
    },
  });
  const subcategory2Question6 = await prisma.question.create({
    data: {
      text: "Are any tables blocking any entrances or exits?",
      subcategory: { connect: { id: subcategory2.id } },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
