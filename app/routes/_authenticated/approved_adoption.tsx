import React from "react";
import Header from "~/components/Header";
import SendDocumentsProgress from "~/components/SendDocumentsProgress";

export default function ApprovedAdoption() {
    return (
        <div className="bg-white w-screen h-screen flex flex-col">
            <Header />
            <div className="mt-20 flex justify-center items-center px-5">
                <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl">
                    <div className="flex-1">
                        <h1 className="font-secondary text-background-secondary text-5xl font-bold pb-4">Resultado</h1>
                        <SendDocumentsProgress stage={3} />
                        <h1 className="font-secondary text-background-secondary text-4xl font-bold mt-10">
                            Adoção Aprovada!
                        </h1>
                        <p className="mt-10 text-background-secondary text-justify leading-relaxed ">
                            É com muita alegria que informamos que o seu processo de adoção foi analisado pelos
                            responsáveis e aprovado!
                        </p>
                        <p className="mt-5 text-background-secondary text-justify leading-relaxed">
                            Em breve, entraremos em contato para agendar os próximos passos e fornecer todas as
                            orientações necessárias para a adaptação do novo membro da sua família.
                        </p>
                        <p className="mt-5 text-background-secondary text-justify leading-relaxed">
                            Estamos ansiosos para acompanhar essa nova fase e desejamos a vocês muitos momentos de
                            felicidade juntos! Se tiver qualquer dúvida, não hesite em nos contatar.{" "}
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <img src="/approvedadoption_img.png" alt="approvedadoption_img" className="p-5 w-96" />
                    </div>
                </div>
            </div>
        </div>
    );
}
