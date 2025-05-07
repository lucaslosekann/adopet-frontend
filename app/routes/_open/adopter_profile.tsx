import React, { use, useCallback } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link } from "react-router";

//{JSON.stringify(props.params.id)}

export default function AdopterProfile() {
    return (
        <div className="bg-white w-screen h-screen flex flex-col">
            <header className="bg-background-secondary p-4 w-full">
                <img src="/logo.svg" alt="logo" className="w-50 mx-auto" />
            </header>
            <div className="flex flex-col justify-center items-center text-center mt-7">
                        <h1 className="font-secondary text-background-secondary text-2xl">Meu Perfil</h1>
                        <img src="/ngo_profile_icon.png" alt="ngo_profile_icon" className="w-40 rounded-2xl border-5 border-background-secondary mt-2"/>
                        <h1 className="font-secondary text-background-secondary text-5xl font-bold mt-3">João da Silva</h1>
                        <h1 className="text-background-secondary font-secondary text-2xl">069.304.960-06</h1>
                        <h1 className="text-background-secondary font-bold">(47) 91234-4321</h1>
                        <h1 className="text-background-secondary font-semibold">Entrou em 01/01/2000.</h1>
                        <h1 className="text-background-secondary font-semibold">Última atualização em 01/01/2000.</h1>
                        <h1 className="text-background-secondary font-semibold">20 anos</h1>
                        <h1 className="font-secondary text-background-secondary text-2xl mt-5">Meu Endereço</h1>
                        <p className="text-background-secondary mt-1 font-semibold max-w-2xl">Residência de tamanho X</p>
                        <p className="text-background-secondary font-semibold max-w-2xl">Rua tal, numero tal, complemento tal</p>
                        <p className="text-background-secondary font-normal max-w-2xl">Ao lado do mercado top</p>
                        <h1 className="font-secondary text-background-secondary text-2xl mt-7">Meus Pets Adotados</h1>
                        <li className="justify-center flex flex-row mt-3 gap-5">
                            <div>
                                <img src="/ngo_profile_icon.png" className="w-32 rounded-2xl border-2 border-background-secondary"></img>
                                <h1 className="text-background-secondary mt-1 font-semibold max-w-2xl">Paulinho</h1>
                            </div>
                            <div>
                                <img src="/ngo_profile_icon.png" className="w-32 rounded-2xl border-2 border-background-secondary"></img>
                                <h1 className="text-background-secondary mt-1 font-semibold max-w-2xl">Roberto</h1>
                            </div>
                            <div>
                                <img src="/ngo_profile_icon.png" className="w-32 rounded-2xl border-2 border-background-secondary"></img>
                                <h1 className="text-background-secondary mt-1 font-semibold max-w-2xl">Anastácio</h1>
                            </div>
                        </li>
                </div>
        </div>
    );
}