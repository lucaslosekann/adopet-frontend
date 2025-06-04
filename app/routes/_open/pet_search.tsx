import React, { useState } from "react";
import Header from "../../components/Header";
import PetFilter from "~/components/filters/petFilter";
import PetCard from "~/components/pet_card/petCard";

const pets = [
  { id: "1", nome: "Tapioca", imagem: "/pets/caozinho.jpg", especie: "Cachorro", porte: "Pequeno", raca: "Galgo", sexo: "Fêmea", castrado: "Sim" },
  { id: "2", nome: "Belloso", imagem: "", especie: "Gato", porte: "Médio", raca: "SRD", sexo: "Macho", castrado: "Não" },
  { id: "3", nome: "Billeiro", imagem: "", especie: "Cachorro", porte: "Grande", raca: "SRD", sexo: "Macho", castrado: "Não" },
  { id: "4", nome: "Tapioco", imagem: "", especie: "Gato", porte: "Grande", raca: "Sphynx", sexo: "Macho", castrado: "Sim" },
  { id: "5", nome: "Fagner", imagem: "", especie: "Cachorro", porte: "Pequeno", raca: "Bulldog", sexo: "Macho", castrado: "Sim" },
  { id: "6", nome: "Lurdes", imagem: "", especie: "Gato", porte: "Pequeno", raca: "Persa", sexo: "Fêmea", castrado: "Sim" },
  { id: "7", nome: "Bolinha", imagem: "", especie: "Cachorro", porte: "Grande", raca: "Labrador", sexo: "Macho", castrado: "Sim" },
  { id: "8", nome: "Tifanny", imagem: "", especie: "Gato", porte: "Médio", raca: "SRD", sexo: "Fêmea", castrado: "Não" },
  { id: "9", nome: "Teddy", imagem: "", especie: "Cachorro", porte: "Médio", raca: "Beagle", sexo: "Macho", castrado: "Sim" },
  { id: "10", nome: "Robert", imagem: "", especie: "Gato", porte: "Médio", raca: "Siamês", sexo: "Macho", castrado: "Sim" },
];

const SearchPage = () => {
  const [filtros, setFiltros] = useState({
    especies: [] as string[],
    racas: [] as string[],
    portes: [] as string[],
    sexo: [] as string[],
    castrado: [] as string[],
    ordenar: null as string | null,
  });

  const filteredPets = pets
    .filter(
      (pet) =>
        (filtros.especies.length === 0 || filtros.especies.includes(pet.especie)) &&
        (filtros.racas.length === 0 || filtros.racas.includes(pet.raca)) &&
        (filtros.portes.length === 0 || filtros.portes.includes(pet.porte)) &&
        (filtros.sexo.length === 0 || filtros.sexo.includes(pet.sexo)) &&
        (filtros.castrado.length === 0 || filtros.castrado.includes(pet.castrado))
    )
    .sort((a, b) => {
      switch (filtros.ordenar) {
        case "Nome (A-Z)":
          return a.nome.localeCompare(b.nome);
        case "Nome (Z-A)":
          return b.nome.localeCompare(a.nome);
        case "Mais novo":
        case "Mais velho":
          return 0; // implementar futuramente
        default:
          return 0;
      }
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
          {filteredPets.map((pet) => (
            <PetCard key={pet.id} nome={pet.nome} imagem={pet.imagem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;