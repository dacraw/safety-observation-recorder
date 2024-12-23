import { useForm } from "react-hook-form";
import { useOutletContext, useSubmit } from "react-router";
import type { Route } from "./+types/new";
import { PrismaClient, ResponseChoice } from "@prisma/client";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";
import { startCase } from "lodash-es";

export async function loader({ request }: Route.LoaderArgs) {
  const prisma = new PrismaClient();

  // const categories = await prisma.
}

function getStartOfWeek(date = new Date()) {
  const dayOfWeek = date.getDay(); // 0 (Sunday) - 6 (Saturday)
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  return new Date(date.setDate(date.getDate() + diff));
}

export async function action({ request, params }: Route.ActionArgs) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const formDataEntries: {
    question: { connect: { id: number } };
    choice: string;
  }[] = [];
  formData.forEach((value, key) => {
    formDataEntries.push({
      question: { connect: { id: Number(key.split("-")[1]) } },
      choice: value,
    });
  });

  const observation = await prisma.observation.create({
    data: {
      weekOf: getStartOfWeek(),
      plant: {
        connect: { id: Number(params.id) },
      },
      user: {
        connect: { id: Number(userId) },
      },
      responses: {
        create: formDataEntries,
      },
    },
  });
  // await prisma.response.createMany({
  //   data: formDataEntries
  // })
  console.log("new observation action formDataEntries", formDataEntries);
}

export default function NewObservation({ actionData }: Route.ComponentProps) {
  const { register, handleSubmit } = useForm();
  const context = useOutletContext();
  // console.log("new observation context", context);
  const submit = useSubmit();
  const onSubmit = (data) => {
    console.log("new observation data", data);
    submit(data, { method: "POST" });
  };

  return (
    <div>
      <h3 className="font-bold text-xl mb-6">Create a new observation</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-700 rounded p-4 m-4"
      >
        <fieldset className="grid mb-6">
          <legend>Current Plant: {context?.plant?.name}</legend>
        </fieldset>
        <fieldset>
          {context?.categories.map((category) => (
            <div className="grid gap-2" key={category.id}>
              <legend>Category: {category?.name}</legend>
              {category.subcategories.map((subcategory) => (
                <div className="grid gap-2" key={subcategory.id}>
                  <h4>Subcategory: {subcategory.name}</h4>
                  {subcategory.questions.map((question) => (
                    <fieldset key={question.id}>
                      <legend>Question: {question.text}</legend>
                      <div className="grid grid-cols-3">
                        <div>
                          <label
                            htmlFor={`${category.id}-${subcategory.id}-${question.id}-cannot-answer`}
                          >
                            {startCase(
                              ResponseChoice["CANNOT_DETERMINE"].toLowerCase()
                            )}
                          </label>
                          <input
                            {...register(`question-${question.id}-response`)}
                            id={`${category.id}-${subcategory.id}-${question.id}-cannot-answer`}
                            type="radio"
                            value={ResponseChoice["CANNOT_DETERMINE"]}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`${category.id}-${subcategory.id}-${question.id}-no`}
                          >
                            {startCase(ResponseChoice["NO"].toLowerCase())}
                          </label>
                          <input
                            {...register(`question-${question.id}-response`)}
                            id={`${category.id}-${subcategory.id}-${question.id}-no`}
                            type="radio"
                            value={ResponseChoice["NO"]}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`${category.id}-${subcategory.id}-${question.id}-yes`}
                          >
                            {startCase(ResponseChoice["YES"].toLowerCase())}
                          </label>
                          <input
                            {...register(`question-${question.id}-response`)}
                            id={`${category.id}-${subcategory.id}-${question.id}-yes`}
                            type="radio"
                            value={ResponseChoice["YES"]}
                          />
                        </div>
                      </div>
                    </fieldset>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </fieldset>
        <input className="p-2 m-2 bg-green-400 rounded" type="submit" />
      </form>
    </div>
  );
}
