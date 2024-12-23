// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect } from "react";
// import { useSearchParams } from "react-router";

// export default function LoginPage() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { loginWithRedirect } = useAuth0();

//   useEffect(() => {
//     const invitation = searchParams.get("invitation");
//     const organization = searchParams.get("organization");
//     if (!invitation || !organization) return;

//     loginWithRedirect({
//       authorizationParams: {
//         invitation,
//         organization,
//       },
//     });
//   });
//   return <div>Redirecting to the login page...</div>;
// }

import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "react-router";
import { redirect } from "react-router";
import { Form, Link, useActionData, useSearchParams } from "react-router";
import * as React from "react";

import { createUserSession, getUserId } from "~/session.server";
import { verifyLogin } from "~/models/user.server";
import { safeRedirect, validateEmail } from "~/sessionUtils";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return {};
};

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return {
      errors: { email: "Email is invalid" },
      status: 400,
    };
  }

  if (typeof password !== "string" || password.length === 0) {
    return {
      errors: { password: "Password is required" },
      status: 400,
    };
  }

  if (password.length < 8) {
    return {
      errors: { password: "Password is too short" },
      status: 400,
    };
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return {
      errors: { email: "Invalid email or password" },
      status: 400,
    };
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo,
  });
};

export const meta: MetaFunction = () => [
  {
    title: "Login",
  },
];

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="grid place-content-center h-full m-12 gray-background rounded py-4">
      <div>
        <h3 className="text-center text-3xl font-bold mb-4">Login</h3>
        <div className="mx-auto w-full max-w-md px-2">
          <Form method="post" className="space-y-6" noValidate>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  ref={emailRef}
                  id="email"
                  required
                  autoFocus={true}
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={actionData?.errors?.email ? true : undefined}
                  aria-describedby="email-error"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                />
                {actionData?.errors?.email && (
                  <div className="pt-1 text-red-700" id="email-error">
                    {actionData.errors.email}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  ref={passwordRef}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={actionData?.errors?.password ? true : undefined}
                  aria-describedby="password-error"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                />
                {actionData?.errors?.password && (
                  <div className="pt-1 text-red-700" id="password-error">
                    {actionData.errors.password}
                  </div>
                )}
              </div>
            </div>
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <button
              type="submit"
              className="w-full rounded   py-2 px-4 blue-button"
            >
              Log in
            </button>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-white"
                >
                  Remember me
                </label>
              </div>

              {/* <div className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  className="text-blue-500 underline"
                  to={{
                    pathname: "/join",
                    search: searchParams.toString(),
                  }}
                >
                  Sign up
                </Link>
              </div> */}
            </div>
          </Form>
          <div className="mt-4">
            <Form
              className="grid text-center"
              action="/demoSupervisorLogin"
              method="post"
            >
              <button
                className="rounded blue-button font-bold py-2 px-4"
                type="submit"
              >
                Login as Demo Supervisor
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
