import Header from "~/components/Header";
import { useAuthContext } from "~/contexts/AuthContext";
import { getCpfFormatado, getDataFormatada, getPhoneFormatted } from "~/lib/utils";

export default function AdopterProfile() {
    const { user } = useAuthContext();
    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 md:py-16 text-background-secondary">
                <div className="max-w-4xl mx-auto space-y-12">
                    <section className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                        <img
                            src="/profilePic_default.jpg"
                            alt="Foto de perfil" // mudar aqui
                            className="w-40 h-40 rounded-2xl border-4 border-background-secondary"
                        />
                        <div className="space-y-1">
                            <h1 className="font-secondary text-5xl font-bold">{user.name}</h1>
                            <p className="text-sm text-gray-500 pt-2">
                                Criado em {new Date(user.createdAt).toLocaleDateString("pt-BR").replace(",", "")}.
                            </p>
                        </div>
                    </section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                        <section>
                            <h2 className="text-3xl font-bold font-secondary border-b-2 border-gray-200 pb-2 mb-4">
                                Meus Dados
                            </h2>
                            <div className="space-y-2 text-lg">
                                <div>
                                    <p>Email</p>
                                    <p className="font-semibold">{user.email}</p>
                                </div>
                                <div>
                                    <p>Telefone</p>
                                    <p className="font-semibold">{getPhoneFormatted(user.phoneNumber)}</p>
                                </div>
                                <div>
                                    <p>CPF</p>
                                    <p className="font-semibold">{getCpfFormatado(user.taxId)}</p>
                                </div>
                                <p className="text-sm text-gray-500 pt-4">
                                    Última atualização:{" "}
                                    {new Date(user.updatedAt)
                                        .toLocaleDateString("pt-BR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        })
                                        .replace(",", "")}
                                    .
                                </p>
                            </div>
                        </section>
                        <section>
                            <h2 className="text-3xl font-bold font-secondary border-b-2 border-gray-200 pb-2 mb-4">
                                Meu Endereço
                            </h2>
                            <div className="space-y-1 text-lg">
                                <p className="font-normal">
                                    {user.address.street}, {user.address.number}
                                </p>
                                <p className="">
                                    {user.address.city}, {user.address.uf} - {user.address.neighborhood}
                                </p>
                                <p className="font-normal">CEP: {user.address.postalCode}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
