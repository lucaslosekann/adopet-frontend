import React, { useState } from "react";
import Header from "../../components/Header";
import PetFilter from "~/components/filters/petFilter";
import PetCard from "~/components/pet_card/petCard";

const pets = [
  { id: "1", nome: "Tapioca", imagem: "/pets/caozinho.jpg" },
  { id: "2", nome: "Belloso", imagem: "/pets/gatinha.jpg" },
  { id: "3", nome: "Billeiro", imagem: "/pets/cachorro2.jpg" },
  { id: "4", nome: "Tapioco", imagem: "/pets/gatinho2.jpg" },
  { id: "5", nome: "Fagner", imagem: "/pets/caozinho2.jpg" },
  { id: "6", nome: "Lurdes", imagem: "/pets/gatinha2.jpg" },
  { id: "7", nome: "Bolinha", imagem: "/pets/cao3.jpg" },
  { id: "8", nome: "Tifanny", imagem: "/pets/gata3.jpg" },
  { id: "9", nome: "Teddy", imagem: "/pets/cao4.jpg" },
  { id: "10", nome: "Robert", imagem: "/pets/gata4.jpg" },
];

//ajustar a fonte

const SearchPage = () => {
    return (
        <div>
            <Header />
            <div className="py-10">
                <PetFilter />
                <h2 className="text-3xl font-black font-secondary text-center mt-10 mb-6 text-background-secondary">
                    ENCONTRE SEU NOVO COMPANHEIRO!
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center max-w-7x1 mx-auto">
                    {pets.map((pet) => (
                        <PetCard key={pet.nome} nome={pet.nome} imagem={pet.imagem} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;