import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
    layout("./routes/_authenticated/authenticated-layout.tsx", [
        route("profile", "./routes/_authenticated/adopter_profile.tsx"),
        route("documents-adoption", "./routes/_authenticated/adoption_documents.tsx"),
        route("adoption-status", "./routes/_authenticated/adoption_status.tsx"),
    ]),
    layout("./routes/_open/open-layout.tsx", [
        index("./routes/_open/_index.tsx"),
        route("login", "./routes/_open/login.tsx"),
        route("ong/:id", "./routes/_open/ngo_profile.tsx"),
        route("adoption/:petId", "./routes/_open/adoption_profile.tsx"),
        route("register", "./routes/_open/register.tsx"),
        route("search", "./routes/_open/pet_search.tsx"),
        route("faq", "./routes/_open/faq.tsx"),
    ]),
    layout("./routes/_ong/ong-layout.tsx", [
        route("manage/pets", "./routes/_ong/pets.tsx"),
        route("manage/adoption", "./routes/_ong/adoption.tsx"),
    ]),
] satisfies RouteConfig;
