import React, { useState } from "react";
import Header from "../../components/Header";
import PetFilter from "~/components/filters/petFilter";
import PetCard from "~/components/pet_card/petCard";
import { useQuery } from "@tanstack/react-query";
import { getPets, getSpecies } from "~/lib/api";

const SearchPage = () => {
    const [filtros, setFiltros] = useState({
        especies: [] as string[],
        racas: [] as string[],
        portes: [] as string[],
        sexo: [] as string[],
        castrado: [] as boolean[],
        ordenar: "Adicionado recentemente" as string | null,
    });

    const PetsQuery = useQuery({
        queryKey: ["pets"],
        queryFn: getPets,
    });

    const SpeciesQuery = useQuery({
        queryKey: ["species"],
        queryFn: getSpecies,
    });

    const filteredPets = PetsQuery?.data
        ?.filter(
            (pet) =>
                (filtros.especies.length === 0 || filtros.especies.includes(pet.specieName)) &&
                (filtros.racas.length === 0 || filtros.racas.includes(pet.breedName)) &&
                (filtros.portes.length === 0 || filtros.portes.includes(pet.size)) &&
                (filtros.sexo.length === 0 || filtros.sexo.includes(pet.sex)) &&
                (filtros.castrado.length === 0 || filtros.castrado.includes(pet.castrated))
        )
        .sort((a, b) => {
            switch (filtros.ordenar) {
                case "Adicionado recentemente":
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case "Nome (A-Z)":
                    return a.formerName.localeCompare(b.formerName);
                case "Nome (Z-A)":
                    return b.formerName.localeCompare(a.formerName);
                case "Mais velho":
                    return new Date(a.dateOfBirth).getTime() - new Date(b.dateOfBirth).getTime();
                case "Mais novo":
                    return new Date(b.dateOfBirth).getTime() - new Date(a.dateOfBirth).getTime();
            }
            return 0;
        });

    return (
        <div>
            <Header />
            <div className="py-10">
                <PetFilter onFiltrar={setFiltros} species={SpeciesQuery?.data ?? []} />

                <h2 className="text-3xl font-black font-secondary text-center mt-10 mb-6 text-background-secondary">
                    ENCONTRE SEU NOVO COMPANHEIRO!
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center max-w-7xl mx-auto">
                    {filteredPets?.map((pet) => (
                        <PetCard key={pet.id} id={pet.id} nome={pet.formerName} imagem={pet.PetImage?.[0]?.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
