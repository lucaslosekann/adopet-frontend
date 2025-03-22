import { Navigate, Outlet, useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
export function Layout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

export default function App() {
    const { loading, isAuthenticated, user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            console.log(loading, isAuthenticated, user);
            navigate("/login");
        }
    }, [isAuthenticated, loading]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return <Outlet />;
}
