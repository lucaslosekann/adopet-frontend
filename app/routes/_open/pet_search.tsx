import React, { useState } from "react";
import Header from "../../components/Header";
import PetFilter from "~/components/filters/petFilter";
import PetCard from "~/components/pet_card/petCard";
import { useQuery } from "@tanstack/react-query";
import { getPets } from "~/lib/api";

const SearchPage = () => {
    const [filtros, setFiltros] = useState({
        especies: [] as string[],
        racas: [] as string[],
        portes: [] as string[],
        sexo: [] as string[],
        castrado: [] as boolean[],
        ordenar: null as string | null,
    });

    const PetsQuery = useQuery({
        queryKey: ["pets"],
        queryFn: getPets
    })


    const filteredPets = PetsQuery?.data
        ?.filter(
            (pet) =>
                (filtros.especies.length === 0 || filtros.especies.includes(pet.speciesName)) &&
                (filtros.racas.length === 0 || filtros.racas.includes(pet.breedName)) &&
                (filtros.portes.length === 0 || filtros.portes.includes(pet.size)) &&
                (filtros.sexo.length === 0 || filtros.sexo.includes(pet.sex)) &&
                (filtros.castrado.length === 0 || filtros.castrado.includes(pet.castrated))
        )
        .sort((a, b) => {
            switch (filtros.ordenar) {
                case "Nome (A-Z)":
                    return a.formerName.localeCompare(b.formerName);
                case "Nome (Z-A)":
                    return b.formerName.localeCompare(a.formerName);
                case "Mais velho": return 0; // implementar futuramente default:
                case "Mais novo":
                    return 0;
            }
            return 0;

        });

    return (
        <div>
            <Header />
            <div className="py-10">
                <PetFilter onFiltrar={setFiltros} />

                <h2 className="text-3xl font-black font-secondary text-center mt-10 mb-6 text-background-secondary">
                    ENCONTRE SEU NOVO COMPANHEIRO!
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center max-w-7xl mx-auto">
                    {filteredPets?.map((pet) => (
                        <PetCard key={pet.id} nome={pet.formerName} imagem={pet.PetImage?.[0]?.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
