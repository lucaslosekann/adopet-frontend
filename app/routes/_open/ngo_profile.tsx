import React, { use, useCallback } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link } from "react-router";
import Header from "~/components/Header";

//{JSON.stringify(props.params.id)}

export default function NgoProfile() {
    return (
        <div className="bg-white w-screen h-screen flex flex-col">
            <Header/>
            <div className="flex flex-grow justify-center items-center text-center">
                <div>
                    <div className="flex items-start text-start justify-center">
                        <img src="/ngo_profile_icon.png" alt="ngo_profile_icon" className="w-40 rounded-2xl border-5 border-background-secondary" />
                        <div className="mt-3 pl-3.5">
                            <h1 className="font-secondary text-background-secondary text-2xl">Perfil da ONG</h1>
                            <h1 className="font-secondary text-background-secondary text-5xl font-bold">CACHORRO TOP</h1>
                            <h1 className="text-background-secondary mt-3 font-semibold">Criado em 01/01/2000.</h1>
                        </div>
                    </div>
                    <div className="flex flex-col mt-10">
                        <h1 className="font-secondary text-background-secondary text-2xl">Sobre a ONG</h1>
                        <p className="text-background-secondary mt-1 font-semibold max-w-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur sagittis, nisl nunc euismod nisi, euismod euismod nisi.</p>
                        <h1 className="font-secondary text-background-secondary text-2xl mt-12">Nos visite!</h1>
                        <p className="text-background-secondary mt-1 font-semibold max-w-2xl">Rua tal, Número X, Complemento tal</p>
                        <p className="text-background-secondary font-normal max-w-2xl">Ao lado da farmácia legal</p>
                        <h1 className="font-secondary text-background-secondary text-2xl mt-12">Últimos pets adicionados</h1>
                        <li className="justify-center flex flex-row mt-3 gap-5">
                            <div>
                                <img src="/ngo_profile_icon.png" className="w-32 rounded-2xl border-2 border-background-secondary"></img>
                                <h1 className="text-background-secondary mt-1 font-semibold max-w-2xl">Cachorro 1</h1>
                            </div>
                            <div>
                                <img src="/ngo_profile_icon.png" className="w-32 rounded-2xl border-2 border-background-secondary"></img>
                                <h1 className="text-background-secondary mt-1 font-semibold max-w-2xl">Cachorro 2</h1>
                            </div>
                            <div>
                                <img src="/ngo_profile_icon.png" className="w-32 rounded-2xl border-2 border-background-secondary"></img>
                                <h1 className="text-background-secondary mt-1 font-semibold max-w-2xl">Cachorro 3</h1>
                            </div>
                        </li>
                    </div>
                </div>
            </div>
        </div>
    );
}