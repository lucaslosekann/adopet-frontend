import { PawPrintIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { constructPetImageUrl } from "~/lib/api";

interface PetCardProps {
    nome: string;
    imagem: string;
    id: string;
}

const PetCard = ({ nome, imagem, id }: PetCardProps) => {
    return (
        <Link
            to={`/adoption/${id}`} // ou algum ID
            className="flex flex-col items-center rounded-2xl overflow-hidden shadow-lg bg-white w-44 hover:shadow-xl transition-transform duration-300 hover:-translate-y-2"
        >
            {imagem ? (
                <img src={constructPetImageUrl(id, imagem)} alt={nome} className="w-44 h-44 object-cover" />
            ) : (
                <PawPrintIcon className="w-44 h-44 text-gray-300" />
            )}
            <div className="bg-slate-200 w-full py-2 text-center font-secondary text-background-secondary">
                {nome.toUpperCase()}
            </div>
        </Link>
    );
};

export default PetCard;
