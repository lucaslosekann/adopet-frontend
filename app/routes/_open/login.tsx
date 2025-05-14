import React, { use, useCallback } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
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
        {loading ? (
          <img src="/tube-spinner.svg" alt="Spinner" className="w-15" />
        ) : (
          <>
            {isAuthenticated && <p>Você está logado como {user?.email}</p>}
            <img
              src="/logo.svg"
              alt="logo"
              className="absolute top-4 left-4 w-50"
            />
            <div className="bg-white w-[400px] h-[380px] rounded-lg m-8 shadow-2xl">
              <h1 className="text-background-secondary font-secondary tracking-wide text-center text-2xl py-10">
                Entre em sua conta
              </h1>
              <form
                className="flex flex-col items-center gap-12"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-4">
                  <div className="w-[320px]">
                    <Input
                      className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                                transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      placeholder="Email"
                    />
                  </div>
                  <div className="w-[320px]">
                    <Input
                      className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                                transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      placeholder="Senha"
                      type="password"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" className="border-gray-300" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Lembrar de mim
                    </label>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant="outline"
                    className="cursor-pointer bg-background-secondary text-primary-foreground hover:bg-primary-foreground hover:text-primary w-[320px]"
                  >
                    Entrar
                  </Button>
                  <Link
                    to="/register"
                    className="text-gray-400 text-[12px] text-center"
                  >
                    Não tem uma conta? Clique aqui para criar
                  </Link>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
