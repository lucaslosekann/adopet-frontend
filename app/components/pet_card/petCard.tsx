import React from "react";
//transformar o nome do pet como clicavel

interface PetCardProps {
    nome: string;
    imagem: string;
}

const petCard = ({nome, imagem}: PetCardProps) => {
    return (
        <div className="flex flex-col items-center rounded-2x1 overflow-hidden shadow-md">
            <img src={imagem} alt={nome} className="w-40 h-40 object-cover"/>
            <div className="bg-slate-200 w-full py-2 text-center font-bold text-blue-900 rounded-b-2x1">
                {nome.toUpperCase()}
            </div>
        </div>
    );
};

export default petCard;