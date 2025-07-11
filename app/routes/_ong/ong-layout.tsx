import { Outlet, useNavigate } from 'react-router';
import { useAuthContext } from '../../contexts/AuthContext';
import { useEffect } from 'react';
export function Layout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

export default function App() {
    const { loading, isAuthenticated, user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if ((!isAuthenticated || !user.Ong) && !loading) {
            navigate('/login');
        }
    }, [isAuthenticated, loading]);

    if (loading || !isAuthenticated) {
        return (
            <div className="bg-background-secondary w-screen h-screen flex justify-center items-center">
                <img src="/tube-spinner.svg" alt="Spinner" className="w-15" />
            </div>
        );
    }

    return <Outlet />;
}
