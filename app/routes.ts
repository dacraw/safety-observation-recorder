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
    route("/plants", "./routes/plants/layout.tsx", [
      route(":id", "./routes/plants/show/show.tsx", [
        route("observations", "routes/plants/show/observations/layout.tsx", [
          route("index", "./routes/plants/show/observations/index.tsx"),
          route("new", "./routes/plants/show/observations/new.tsx"),
          route(":observationId", "./routes/plants/show/observations/show.tsx"),
        ]),
      ]),
    ]),
  ]),
  route("login", "./routes/login.tsx"),
] satisfies RouteConfig;
