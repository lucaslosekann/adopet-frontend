import Header from "~/components/Header";
import SendDocumentsProgress from "~/components/SendDocumentsProgress";

export default function RejectedAdoption() {
    return (
        <div className="bg-white w-screen h-screen flex flex-col">
            <Header />
            <div className="mt-20 flex justify-center items-center px-5">
                <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl gap-8">
                    <div className="flex-1">
                        <h1 className="font-secondary text-background-secondary text-5xl font-bold pb-4">Resultado</h1>
                        <SendDocumentsProgress stage={3} />
                        <h1 className="font-secondary text-background-secondary text-4xl font-bold mt-10">
                            Adoção Não Aprovada
                        </h1>
                        <p className="mt-10 text-background-secondary text-justify leading-relaxed">
                            Agradecemos o seu interesse e o carinho demonstrado no processo de adoção. Informamos que,
                            após análise, a sua solicitação não pôde ser aprovada neste momento.
                        </p>
                        <p className="mt-5 text-background-secondary text-justify leading-relaxed">
                            Entendemos que essa notícia pode ser frustrante, mas reforçamos que todos os processos são
                            avaliados com muito cuidado, sempre priorizando o bem-estar dos animais e o melhor contexto
                            para cada caso.
                        </p>
                        <p className="mt-5 text-background-secondary text-justify leading-relaxed">
                            Caso queira, estamos à disposição para conversar, esclarecer dúvidas e orientá-lo sobre
                            outras possibilidades de adoção no futuro. Agradecemos novamente pelo gesto e pelo interesse
                            em transformar a vida de um animal.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <img src="/rejected-adoption.svg" alt="rejected-adoption" className="p-5 w-96" />
                    </div>
                </div>
            </div>
        </div>
    );
}
