import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/observations", "routes/observations/layout.tsx", [
    index("./routes/observations/index.tsx"),
    route("new", "./routes/observations/new.tsx"),
  ]),
  route("login", "./routes/login.tsx"),
] satisfies RouteConfig;
