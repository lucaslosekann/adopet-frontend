import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
    layout("./routes/_authenticated/authenticated-layout.tsx", [index("./routes/_authenticated/_index.tsx")]),
    layout("./routes/_open/open-layout.tsx", [route("login", "./routes/_open/login.tsx")]),
] satisfies RouteConfig;
