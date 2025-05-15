import React, { useState } from "react";
import Header from "../../components/Header";
import PetFilter from "~/components/filters/petFilter";
import PetCard from "~/components/pet_card/petCard";

const pets = [
    { nome: "Bichinho", imagem: "/pets/caozinho.jpg" }
]

//ajustar a fonte

const SearchPage = () => {
    return (
        <div>
            <Header />
            <div className="py-10">
                <PetFilter />
                <h2 className="text-3x1 font-black text-center mt-10 mb-6 text-blue-900">
                    ENCONTRE SEU NOVO COMPANHEIRO!
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center max-w-6x1 mx-auto">
                    {pets.map((pet) => (
                        <PetCard key={pet.nome} nome={pet.nome} imagem={pet.imagem} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;