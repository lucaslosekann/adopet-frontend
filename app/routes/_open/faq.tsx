import Header from "../../components/Header";

export default function FAQ() {
    const faqs = [
        { question: "Como posso adotar um pet?", answer: "Você pode navegar pelos pets disponíveis na página de pesquisa e preencher o formulário de adoção." },
        { question: "Quais documentos são necessários?", answer: "É necessário RG, CPF e comprovante de residência." },
        { question: "Existe alguma taxa para adoção?", answer: "Não! A adoção é gratuita, mas você pode fazer doações voluntárias." },
        { question: "Posso visitar o pet antes de adotar?", answer: "Sim! Você pode agendar uma visita diretamente com a ONG responsável." },
        { question: "Como posso ajudar como voluntário?", answer: "Entre em contato com as ONGs cadastradas para se inscrever como voluntário." },
        { question: "O que é necessário para ser um doador?", answer: "Você pode doar dinheiro ou itens como ração e medicamentos diretamente no perfil da ONG." },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="max-w-6xl mx-auto p-6 mt-10">
                <h1 className="text-6xl font-extrabold font-secondary text-background-secondary mb-2">FAQ</h1>
                <p className="text-lg font-medium text-background-secondary mb-8">Perguntas Frequentes</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-slate-300 text-own-blue p-4 rounded-2xl shadow-md">
                            <h2 className="font-semibold text-lg text-background-secondary mb-2">{faq.question}</h2>
                            <p className="text-sm text-background-secondary">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}