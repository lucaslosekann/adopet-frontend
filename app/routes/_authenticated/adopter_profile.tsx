import React, { use, useCallback } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router';
import Header from '~/components/Header';
import { useAuthContext } from '~/contexts/AuthContext';
import { getCpfFormatado, getDataFormatada } from '~/lib/utils';

//{JSON.stringify(props.params.id)}

export default function AdopterProfile() {
    const { user } = useAuthContext();
    return (
        <div className="bg-white w-screen h-screen flex flex-col">
            <Header />
            <div className="flex flex-col justify-center items-center text-center mt-7">
                <h1 className="font-secondary text-background-secondary text-2xl">Meu Perfil</h1>
                <img
                    src="/ngo_profile_icon.png"
                    alt="ngo_profile_icon"
                    className="w-40 rounded-2xl border-5 border-background-secondary mt-2"
                />
                <h1 className="font-secondary text-background-secondary text-5xl font-bold mt-3">{user.name}</h1>
                <h1 className="text-background-secondary font-secondary text-2xl mt-1">
                    {getCpfFormatado(user.taxId)}
                </h1>
                <h1 className="text-background-secondary font-bold mt-3">{user.phoneNumber}</h1>
                <h1 className="text-background-secondary font-bold">{user.email}</h1>
                <h1 className="text-background-secondary font-semibold">
                    Entrou em {getDataFormatada(user.createdAt)}.
                </h1>
                <h1 className="text-background-secondary font-semibold">
                    Última atualização em {getDataFormatada(user.updatedAt)}.
                </h1>
                <h1 className="font-secondary text-background-secondary text-2xl mt-5">Meu Endereço</h1>
                <p className="text-background-secondary mt-1 font-semibold max-w-2xl">
                    {user.address.neighborhood} - {user.address.city}, {user.address.uf}
                </p>
                <p className="text-background-secondary font-semibold max-w-2xl">
                    CEP {user.address.postalCode} - {user.address.street}, {user.address.number}
                </p>
                <p className="text-background-secondary font-normal max-w-2xl">
                    Atualizado em {getDataFormatada(user.address.updatedAt)}.
                </p>
            </div>
        </div>
    );
}
