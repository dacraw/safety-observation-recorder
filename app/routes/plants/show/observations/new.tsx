import { useForm } from "react-hook-form";
import { redirect, useOutletContext, useSubmit } from "react-router";
import type { Route } from "./+types/new";
import { PrismaClient } from "@prisma/client";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";
import { startCase } from "lodash-es";

// trying this since there seems to be an issue with enums in production
// https://github.com/sveltejs/kit/issues/4444
// https://github.com/prisma/prisma/issues/12504#issuecomment-1136126199
const RESPONSE_CHOICE = {
  CANNOT_DETERMINE: "CANNOT_DETERMINE",
  YES: "YES",
  NO: "NO",
};

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

  return redirect(
    `/plants/${Number(params.id)}/observations/${observation.id}`
  );
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
      <form onSubmit={handleSubmit(onSubmit)} className=" ">
        <fieldset className="grid mb-2">
          <legend className="bg-gray-950 p-2 rounded block w-full">
            Plant: {context?.plant?.name}
          </legend>
        </fieldset>
        <fieldset>
          {context?.categories.map((category) => (
            <div
              className="grid gap-2 bg-gray-900 p-2 rounded"
              key={category.id}
            >
              <legend className="sticky top-0 z-40 bg-gray-900 p-2 ">
                Category: {category?.name}
              </legend>
              {category.subcategories.map((subcategory) => (
                <div
                  className="grid gap-2 mb-4 bg-gray-800 p-2 rounded"
                  key={subcategory.id}
                >
                  <legend className="sticky top-10 z-30 bg-gray-800 p-2">
                    Subcategory: {subcategory.name}
                  </legend>
                  {subcategory.questions.map((question) => (
                    <div className="bg-gray-700 rounded p-2" key={question.id}>
                      <legend className="mb-4 text-center">
                        {question.text}
                      </legend>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="grid items-center grid-rows-[1fr_auto]">
                          <input
                            {...register(`question-${question.id}-response`)}
                            id={`${category.id}-${subcategory.id}-${question.id}-cannot-answer`}
                            type="radio"
                            value={RESPONSE_CHOICE["CANNOT_DETERMINE"]}
                            className="peer hidden"
                          />
                          <label
                            htmlFor={`${category.id}-${subcategory.id}-${question.id}-cannot-answer`}
                            className="observation-option"
                          >
                            {startCase(
                              RESPONSE_CHOICE["CANNOT_DETERMINE"].toLowerCase()
                            )}
                          </label>
                        </div>
                        <div className="grid items-center grid-rows-[1fr_auto]">
                          <input
                            {...register(`question-${question.id}-response`)}
                            id={`${category.id}-${subcategory.id}-${question.id}-no`}
                            type="radio"
                            value={RESPONSE_CHOICE["NO"]}
                            className="peer hidden"
                          />
                          <label
                            htmlFor={`${category.id}-${subcategory.id}-${question.id}-no`}
                            className="observation-option"
                          >
                            {startCase(RESPONSE_CHOICE["NO"].toLowerCase())}
                          </label>
                        </div>
                        <div className="grid items-center grid-rows-[1fr_auto]">
                          <input
                            {...register(`question-${question.id}-response`)}
                            id={`${category.id}-${subcategory.id}-${question.id}-yes`}
                            type="radio"
                            value={RESPONSE_CHOICE["YES"]}
                            className="peer hidden"
                          />
                          <label
                            htmlFor={`${category.id}-${subcategory.id}-${question.id}-yes`}
                            className="observation-option"
                          >
                            {startCase(RESPONSE_CHOICE["YES"].toLowerCase())}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </fieldset>
        <input
          className="px-2 py-4 my-2 font-bold text-white blue-button rounded block w-full"
          type="submit"
          value="Submit Observation"
        />
      </form>
    </div>
  );
}
