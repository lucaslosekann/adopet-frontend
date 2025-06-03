import React from "react";
import { Link } from "react-router-dom";

interface PetCardProps {
    nome: string;
    imagem: string;
}

const PetCard = ({ nome, imagem }: PetCardProps) => {
    return (
        <Link
            to={`/pets/${nome}`} // ou algum ID
            className="flex flex-col items-center rounded-2xl overflow-hidden shadow-lg bg-white w-44 hover:shadow-xl transition"
        >
            <img src={imagem} alt={nome} className="w-44 h-44 object-cover" />
            <div className="bg-slate-200 w-full py-2 text-center font-secondary text-background-secondary">
                {nome.toUpperCase()}
            </div>
        </Link>
    );
};

export default PetCard;