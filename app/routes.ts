import { index, layout, route, type RouteConfig } from '@react-router/dev/routes';

export default [
    layout('./routes/_authenticated/authenticated-layout.tsx', [
        index('./routes/_authenticated/_index.tsx'),
        route('meuperfil', './routes/_authenticated/adopter_profile.tsx'),
        route('analisedoc', './routes/_authenticated/doc_analysis.tsx'),
    ]),
    layout('./routes/_open/open-layout.tsx', [
        route('login', './routes/_open/login.tsx'),
        route('ong/:id', './routes/_open/ngo_profile.tsx'),
        route('adocao/:petId', './routes/_open/adoption_profile.tsx'),
        route('register', './routes/_open/register.tsx'),
    ]),
] satisfies RouteConfig;
