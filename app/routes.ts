import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/authenticatedLayout.tsx", [
    index("routes/home.tsx"),
    route("logout", "routes/logout.tsx"),
    route("/observations", "routes/observations/layout.tsx", [
      index("./routes/observations/index.tsx"),
      route("new", "./routes/observations/new.tsx"),
    ]),
  ]),
  route("login", "./routes/login.tsx"),
] satisfies RouteConfig;
