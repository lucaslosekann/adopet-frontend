import React, { use, useCallback } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router';
import Header from '~/components/Header';
import { useAuthContext } from '~/contexts/AuthContext';
import { getCpfFormatado, getDataFormatada } from '~/lib/utils';

//{JSON.stringify(props.params.id)}

export default function DocAnalysis() {
    return (
        <div className="bg-white w-screen h-screen flex flex-col">
            <Header />
            <div className="flex justify-center items-center text-center mt-7 grid-rows-2">
                <div className="max-w-100">
                    <h1 className="font-secondary text-background-secondary text-5xl">Análise</h1>
                    <p className="mt-5 text-background-secondary text-justify indent-10">
                        Agradecemos por enviar seus documentos! Nossa equipe está revisando suas informações e, em
                        breve, entraremos em contato. Esse processo pode levar alguns dias, mas estamos trabalhando para
                        garantir que tudo seja analisado cuidadosamente.
                    </p>
                    <p className="mt-5 text-background-secondary text-justify indent-10">
                        Por favor, fique atento(a) ao seu e-mail, onde enviaremos atualizações ou solicitações
                        adicionais, se necessário. Obrigado pela sua paciência!
                    </p>
                </div>
                <img
                    src="/docanalysis_img.png"
                    alt="docanalysis_img"
                    className="w-40 rounded-2xl border-2 border-background-secondary"
                />
            </div>
        </div>
    );
}
