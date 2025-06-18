import React, { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { toast } from "sonner";
import ToastMessage from "../ToastMessage";

export default function StepUserAccount({ nextStep }: { nextStep: () => void }) {
    const nameInputRef = useRef<HTMLInputElement>(null);
    const surnameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const json = sessionStorage.getItem("user-signup-state");
        if (!json) {
            return;
        }
        const existingData = JSON.parse(json);
        if (!existingData?.step1) {
            return;
        }
        nameInputRef.current!.defaultValue = existingData.step1.name;
        surnameInputRef.current!.defaultValue = existingData.step1.surname;
        emailInputRef.current!.defaultValue = existingData.step1.email;
    }, []);

    return (
        <div className="bg-white w-[400px] h-[500px] rounded-lg shadow-2xl">
            <h1 className="text-background-secondary font-secondary tracking-wide text-center text-2xl py-8">
                Crie sua conta
            </h1>
            <form
                className="flex flex-col items-center gap-15"
                onSubmit={(e) => {
                    e.preventDefault();

                    const data = new FormData(e.currentTarget);
                    if ((data.get("password") as string).length >= 8) {
                        if (data.get("password") === data.get("confirmPassword")) {
                            const step1Data = {
                                name: data.get("name"),
                                surname: data.get("surname"),
                                email: data.get("email"),
                                password: data.get("password"),
                            };
                            sessionStorage.setItem(
                                "user-signup-state",
                                JSON.stringify({
                                    step1: step1Data,
                                }),
                            );

                            nextStep();
                        } else {
                            toast(<ToastMessage title="Senhas diferentes!" />);
                        }
                    } else {
                        toast(
                            <ToastMessage
                                title="Senha inválida!"
                                description="A senha deve ter no minímo 8 caracteres"
                            />,
                        );
                    }
                }}
            >
                <div className="flex flex-col gap-4">
                    <div className="w-[320px]">
                        <Input
                            className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                    transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            name="name"
                            placeholder="Nome"
                            required
                            ref={nameInputRef}
                        />
                    </div>
                    <div className="w-[320px]">
                        <Input
                            className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                    transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            name="surname"
                            placeholder="Sobrenome"
                            required
                            ref={surnameInputRef}
                        />
                    </div>
                    <div className="w-[320px]">
                        <Input
                            className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                    transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            name="email"
                            placeholder="Email"
                            type="email"
                            required
                            ref={emailInputRef}
                        />
                    </div>
                    <div className="w-[320px]">
                        <Input
                            className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                    transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            name="password"
                            placeholder="Senha"
                            type="password"
                            required
                        />
                    </div>
                    <div className="w-[320px]">
                        <Input
                            className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                    transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            name="confirmPassword"
                            placeholder="Confirmar senha"
                            type="password"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Button
                        variant="outline"
                        className="cursor-pointer bg-background-secondary text-primary-foreground hover:bg-primary-foreground hover:text-primary w-[320px]"
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
