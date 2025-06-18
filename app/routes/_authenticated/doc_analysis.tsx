import React from "react";
import Header from "~/components/Header";
import SendDocumentsProgress from "~/components/SendDocumentsProgress";

export default function DocAnalysis() {
    return (
        <div className="bg-white w-screen h-screen flex flex-col">
            <Header />
            <div className="mt-35 flex justify-center items-center px-5">
                <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl">
                    <div className="flex-1">
                        <h1 className="font-secondary text-background-secondary text-5xl font-bold pb-5">Análise</h1>
                        <SendDocumentsProgress stage={2} />
                        <p className="mt-10 text-background-secondary text-justify leading-relaxed ">
                            Agradecemos por enviar seus documentos! Nossa equipe está revisando suas informações e, em
                            breve, entraremos em contato. Esse processo pode levar alguns dias, mas estamos trabalhando
                            para garantir que tudo seja analisado cuidadosamente.
                        </p>
                        <p className="mt-5 text-background-secondary text-justify leading-relaxed">
                            Por favor, fique atento(a) ao seu <span className="font-bold">e-mail</span>, onde enviaremos
                            atualizações ou solicitações adicionais, se necessário. Obrigado pela sua paciência!
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <img src="/docanalysis_img.png" alt="docanalysis_img" className="p-5 w-96" />
                    </div>
                </div>
            </div>
        </div>
    );
}
