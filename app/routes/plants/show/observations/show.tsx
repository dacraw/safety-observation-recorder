import { useOutletContext } from "react-router";
import type { Route } from "./+types/show";
import { prisma } from "~/db.server";
import { startCase } from "lodash-es";

export async function loader({ request, params }: Route.LoaderArgs) {
  const responses = await prisma.response.findMany({
    where: {
      observationId: Number(params.observationId),
    },
    include: {
      question: { include: { subcategory: { include: { category: true } } } },
    },
  });

  const observation = await prisma.observation.findUnique({
    where: { id: Number(params.observationId) },
    include: {
      plant: {
        include: {
          categories: {
            include: {
              subcategories: {
                include: {
                  questions: {
                    include: {
                      responses: {
                        where: { observationId: Number(params.observationId) },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return { responses, observation };
}

export default function ObservationShow({ loaderData }: Route.ComponentProps) {
  const context = useOutletContext();
  console.log("observation show loaderData", loaderData);
  //   console.log("observation show context", context);
  return (
    <div>
      <div>
        {loaderData?.observation.plant.categories?.map((category) => (
          <div className="grid gap-2" key={category.id}>
            <h3 className="font-bold text-2xl">Category: {category.name}</h3>
            {category.subcategories.map((subcategory) => (
              <div className="grid gap-2 mb-6" key={subcategory.id}>
                <h3 className="text-lg font-bold">
                  Subcategory: {subcategory.name}
                </h3>

                {subcategory.questions.map((question) => (
                  <div className="grid" key={question.id}>
                    <p className="font-bold">{question.text}</p>
                    <p>
                      {startCase(question.responses[0].choice.toLowerCase())}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
