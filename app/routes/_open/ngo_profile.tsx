import React, { use, useCallback, useEffect, useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router';
import Header from '~/components/Header';
import { useQuery } from '@tanstack/react-query';
import { getOng } from '~/lib/api';
import Spinner from '~/components/Spinner';
import { DateTime } from 'luxon';
import type { AxiosError } from 'axios';
import { getDataFormatada } from '~/lib/utils';
import { createStaticPix, hasError } from 'pix-utils';

//{JSON.stringify(props.params.id)}

export default function NgoProfile(props: {
    params: {
        id: string;
    };
}) {
    const ongId = props.params.id;
    const OngQuery = useQuery({
        queryKey: ['ong', ongId],
        queryFn: () => getOng(ongId),
        refetchOnWindowFocus: false,
    });
    const ong = OngQuery.data;

    const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null);

    useEffect(() => {
        async function generateQrCode() {
            if (!ong) return;
            //@ts-ignore
            const pix = createStaticPix({
                merchantName: ong.name,
                merchantCity: ong.address.city,
                pixKey: ong.pixKey,
                infoAdicional: 'Doar faz bem!',
            });

            if (!hasError(pix)) {
                const brCode = await pix.toImage();
                setQrCodeBase64(brCode);
            }
        }
        generateQrCode();
    }, [ong]);

    if (OngQuery.isError && (OngQuery.error as AxiosError).response?.status === 404) {
        return (
            <div className="bg-white w-screen h-screen flex flex-col">
                <Header />
                <div className="flex flex-grow justify-center items-center text-center flex-col">
                    <h1 className="font-secondary text-background-secondary text-2xl">ONG não encontrada</h1>
                    <h1 className="text-background-secondary mt-1">Verifique o link e tente novamente.</h1>
                    <Button
                        asChild
                        variant="outline"
                        className="cursor-pointer bg-background-secondary text-primary-foreground mt-5 hover:bg-primary-foreground hover:text-primary w-[320px]"
                    >
                        <a href="/">Voltar para a tela inicial</a>
                    </Button>
                </div>
            </div>
        );
    }

    if (OngQuery.isLoading || !ong) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner color="#000000" className="w-20 h-20" />
            </div>
        );
    }

    return (
        <div className="bg-white w-screen h-screen flex flex-col">
            <Header />
            <div className="flex flex-grow justify-center items-center text-center">
                <div>
                    <div className="flex items-start text-start justify-center">
                        <img
                            src="/ngo_profile_icon.png"
                            alt="ngo_profile_icon"
                            className="w-40 rounded-2xl border-5 border-background-secondary"
                        />
                        <div className="mt-3 pl-3.5">
                            <h1 className="font-secondary text-background-secondary text-2xl">Perfil da ONG</h1>
                            <h1 className="font-secondary text-background-secondary text-5xl font-bold">{ong.name}</h1>
                            <h1 className="text-background-secondary mt-3 font-semibold">
                                Criado em {getDataFormatada(ong.createdAt)}.
                            </h1>
                        </div>
                    </div>
                    <div className="flex flex-col mt-3">
                        <h1 className="font-secondary text-background-secondary text-2xl">Sobre a ONG</h1>
                        <p className="text-background-secondary mt-1 font-semibold">
                            {ong.about ?? 'Nenhuma descrição informada.'}
                        </p>
                        <h1 className="font-secondary text-background-secondary text-2xl mt-7">Dados</h1>
                        <p className="text-background-secondary mt-1 font-semibold">{ong.phone}</p>
                        <p className="text-background-secondary mt-1 font-semibold">{ong.email}</p>
                        <p className="text-background-secondary mt-1 font-semibold">CNPJ {ong.cnpj}</p>
                        <p className="text-background-secondary mt-1 font-normal">
                            Última atualização: {getDataFormatada(ong.updatedAt)}.
                        </p>
                        <h1 className="font-secondary text-background-secondary text-2xl mt-7">Nos visite!</h1>
                        <p className="text-background-secondary mt-1 font-semibold">
                            {ong.address.city}, {ong.address.uf} - {ong.address.neighborhood}
                        </p>
                        <p className="text-background-secondary font-normal">
                            {ong.address.street}, {ong.address.number}
                        </p>
                        <p className="text-background-secondary font-normal">CEP: {ong.address.postalCode}</p>
                        {qrCodeBase64 && <img src={qrCodeBase64} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
