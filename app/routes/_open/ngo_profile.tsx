import React, { use, useCallback, useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link } from "react-router";
import Header from "~/components/Header";
import { useQuery } from "@tanstack/react-query";
import { getOng } from "~/lib/api";
import Spinner from "~/components/Spinner";
import { DateTime } from "luxon";
import type { AxiosError } from "axios";
import { getDataFormatada } from "~/lib/utils";
import { createStaticPix, hasError } from "pix-utils";

//{JSON.stringify(props.params.id)}

export default function NgoProfile(props: {
    params: {
        id: string;
    };
}) {
    const ongId = props.params.id;
    const OngQuery = useQuery({
        queryKey: ["ong", ongId],
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
                infoAdicional: "Doar faz bem!",
            });

            if (!hasError(pix)) {
                const brCode = await pix.toImage();
                setQrCodeBase64(brCode);
            }
        }
        generateQrCode();
    }, [ong]);

    if ((OngQuery.isError && (OngQuery.error as AxiosError).response?.status === 404) || !ong) {
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

    if (OngQuery.isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner color="#000000" className="w-20 h-20" />
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 md:py-16 text-background-secondary">
                <div className="max-w-4xl mx-auto space-y-12">
                    <section className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                        <img
                            src="/ngo_profile_icon.png"
                            alt={`Logo da ONG ${ong.name}`}
                            className="w-40 h-40 rounded-2xl border-4 border-background-secondary"
                        />
                        <div className="space-y-1">
                            <h1 className="font-secondary text-5xl font-bold">{ong.name}</h1>
                            <p className="text-sm text-gray-500 pt-2">Criado em {getDataFormatada(ong.createdAt)}.</p>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-3xl font-bold font-secondary border-b-2 border-gray-200 pb-2 mb-4">
                            Sobre a ONG
                        </h2>
                        <p className="font-semibold text-lg">{ong.about ?? "Nenhuma descrição informada."}</p>
                    </section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                        <section>
                            <h2 className="text-3xl font-bold font-secondary border-b-2 border-gray-200 pb-2 mb-4">
                                Dados
                            </h2>
                            <div className="space-y-2 text-lg">
                                <p className="font-semibold">{ong.phone}</p>
                                <p className="font-semibold">{ong.email}</p>
                                <p className="font-semibold">CNPJ {ong.cnpj}</p>
                                <p className="text-sm text-gray-500 pt-4">
                                    Última atualização: {getDataFormatada(ong.updatedAt)}.
                                </p>
                            </div>
                        </section>
                        <section>
                            <h2 className="text-3xl font-bold font-secondary border-b-2 border-gray-200 pb-2 mb-4">
                                Nos visite!
                            </h2>
                            <div className="space-y-1 text-lg">
                                <p className="font-semibold">
                                    {ong.address.city}, {ong.address.uf} - {ong.address.neighborhood}
                                </p>
                                <p className="font-normal">
                                    {ong.address.street}, {ong.address.number}
                                </p>
                                <p className="font-normal">CEP: {ong.address.postalCode}</p>
                            </div>
                        </section>
                    </div>
                    {qrCodeBase64 && (
                        <section className="text-center">
                            <h2 className="text-3xl font-bold font-secondary border-b-2 border-gray-200 pb-2 mb-4 inline-block">
                                Doar Faz Bem!
                            </h2>
                            <div>
                                <img className="max-h-48 mx-auto" src={qrCodeBase64} />
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}
