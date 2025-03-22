import React, { use, useCallback } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Login() {
    const { login, isAuthenticated, user, loading } = useAuthContext();
    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        login(data.get("email") as string, data.get("password") as string);
    }, []);
    return (
        <div className="bg-background-secondary w-screen h-screen flex justify-center items-center">
            <div>
                {loading && <p>Carregando...</p>}
                {isAuthenticated && <p>Você está logado como {user?.email}</p>}

                <img src="/logo.svg" alt="logo" className="w-96 mx-auto" />
                <h1 className="text-primary-foreground font-secondary tracking-wide text-center text-2xl py-6">
                    Entre em sua conta
                </h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <Input placeholder="Email" name="email" />
                    <Input placeholder="Password" name="password" type="password" className="text-white" />
                    <Link to="/register" className="text-primary-foreground text-sm text-center">
                        Não tem uma conta? Clique aqui para criar
                    </Link>
                    <Button
                        variant="outline"
                        className="cursor-pointer bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                    >
                        Entrar
                    </Button>
                </form>
            </div>
        </div>
    );
}
