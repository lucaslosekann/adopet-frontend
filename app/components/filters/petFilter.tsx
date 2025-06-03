import React, { useState, useEffect } from "react";
import ExpandableFilter from "./expandableFilter";
import MultiSelectCheckbox from "./multiSelectCheckBox";
import MultiSelect from "../MultiSelect";

//o filtro "raça" somente aparecer quando for selecionada alguma especie

const especiesOptions = ["Cachorro", "Gato", "Coelho", "Hamster", "Cobra", "Furão", "Papagaio"];

const racaMap: Record<string, string[]> = {
    Cachorro: ["Bulldog", "Poodle", "Labrador", "Beagle", "SRD"],
    Gato: ["Siamês", "Persa", "SRD", "Sphynx"],
    Coelho: ["Mini Lop", "Lionhead"],
    Hamster: ["Sírio", "Anão Russo"],
};

const porteOptions = ["Pequeno", "Médio", "Grande"];
const sexoOptions = ["Macho", "Fêmea"];
const castradoOptions = ["Sim", "Não"];
const ordenarOptions = ["Nome (A-Z)", "Nome (Z-A)", "Mais novo", "Mais velho"]; //só pode selecionar um

const PetFilter = () => {
    const [especies, setEspecies] = useState<string[]>([]);
    const [racas, setRacas] = useState<string[]>([]);
    const [portes, setPortes] = useState<string[]>([]);
    const [sexo, setSexo] = useState<string[]>([]);
    const [castrado, setCastrado] = useState<string[]>([]);
    const [ordenar, setOrdenar] = useState<string | null>(null);

    const racasDisponiveis = especies.flatMap((especie) => racaMap[especie] || []);
    const racasFiltradas = [...new Set(racasDisponiveis)];

    // Garantir que raças selecionadas inválidas sejam removidas
    useEffect(() => {
        setRacas((racasAtuais) =>
            racasAtuais.filter((raca) => racasFiltradas.includes(raca))
        );
    }, [especies]);

    return (
        <div className="bg-slate-300 p-6 rounded-2xl max-w-6xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <ExpandableFilter title="Espécie">
                    <MultiSelectCheckbox
                        options={especiesOptions}
                        selectedOptions={especies}
                        onChange={setEspecies}
                    />
                </ExpandableFilter>

                {especies.length > 0 && (
                    <ExpandableFilter title="Raça">
                        <MultiSelectCheckbox
                            options={racasFiltradas}
                            selectedOptions={racas}
                            onChange={setRacas}
                        />
                    </ExpandableFilter>
                )}

                <ExpandableFilter title="Porte">
                    <MultiSelectCheckbox
                        options={porteOptions}
                        selectedOptions={portes}
                        onChange={setPortes}
                    />
                </ExpandableFilter>

                <ExpandableFilter title="Sexo">
                    <MultiSelectCheckbox
                        options={sexoOptions}
                        selectedOptions={sexo}
                        onChange={setSexo}
                    />
                </ExpandableFilter>

                <ExpandableFilter title="Castrado">
                    <MultiSelectCheckbox
                        options={castradoOptions}
                        selectedOptions={castrado}
                        onChange={setCastrado}
                    />
                </ExpandableFilter>

                <ExpandableFilter title="Ordenar">
                    <div className="space-y-2">
                        {ordenarOptions.map((option) => (
                            <label key={option} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="ordenar"
                                    value={option}
                                    checked={ordenar === option}
                                    onChange={() => setOrdenar(option)}
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                </ExpandableFilter>
            </div>

            <div className="flex justify-end mt-6">
                <button className="bg-slate-600 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition">
                    BUSCAR
                </button>
            </div>
        </div>
    );

};

export default PetFilter;