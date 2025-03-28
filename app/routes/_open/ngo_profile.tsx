import React, { use, useCallback } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link } from "react-router";

//{JSON.stringify(props.params.id)}

export default function NgoProfile() {
    return (
        <div className="bg-white w-screen h-screen flex flex-col">
            <header className="bg-background-secondary p-4 w-full fixed top-0 left-0">
                <img src="/logo.svg" alt="logo" className="w-50 mx-auto" />
            </header>
            <div className="flex flex-grow justify-center items-center text-center">
                <div>
                    <div className="flex items-start text-start">
                        <img src="/ngo_profile_icon.png" alt="ngo_profile_icon" className="w-40 mx-auto rounded-2xl border-5 border-background-secondary" />
                        <div className="mt-3 pl-3.5">
                            <h1 className="font-secondary text-background-secondary text-2xl">Perfil da ONG</h1>
                            <h1 className="font-secondary text-background-secondary text-5xl font-bold">CACHORRO TOP</h1>
                            <h1 className="text-background-secondary mt-3 font-semibold">Criado em 01/01/2000.</h1>
                        </div>
                    </div>
                    <h1>popopo</h1>
                </div>
            </div>
        </div>
    );
}