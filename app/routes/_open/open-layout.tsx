import { Outlet } from "react-router";
export function Layout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

export default function App() {
    return <Outlet />;
}
