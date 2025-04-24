import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router";

export default function StepONGAccount({nextStep}:{nextStep: () => void}) {
  return (
    <div className="bg-white w-[400px] h-[500px] rounded-lg shadow-2xl">
      <h1 className="text-background-secondary font-secondary tracking-wide text-center text-2xl py-8">
        Crie sua conta
      </h1>
      <form className="flex flex-col items-center gap-28">
        <div className="flex flex-col gap-4">
          <div className="w-[320px]">
            <Input
              className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                    transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Nome fantasia"
            />
          </div>
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
          <div className="w-[320px]">
            <Input
              className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                    transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Confirmar senha"
              type="password"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="outline"
            className="cursor-pointer bg-background-secondary text-primary-foreground hover:bg-primary-foreground hover:text-primary w-[320px]"
            onClick={nextStep}
          >
            Próximo
          </Button>
          <Link to="/login" className="text-gray-400 text-[12px] text-center">
            Já tem uma conta? Clique aqui para entrar
          </Link>
        </div>
      </form>
    </div>
  );
}
