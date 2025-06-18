import React, { useEffect, useState } from "react";
import ExpandableFilter from "./expandableFilter";
import MultiSelectCheckbox from "./multiSelectCheckBox";
import type { Species } from "../../lib/api";

const porteOptions = [
    { label: "Pequeno", value: "small" },
    { label: "Médio", value: "medium" },
    { label: "Grande", value: "big" },
];

const sexoOptions = [
    { label: "Macho", value: "MALE" },
    { label: "Fêmea", value: "FEMALE" },
];

const castradoOptions = [
    { label: "Sim", value: true },
    { label: "Não", value: false },
];
const ordenarOptions = ["Adicionado recentemente", "Nome (A-Z)", "Nome (Z-A)", "Mais novo", "Mais velho"];

type Props = {
    onFiltrar: (filtros: {
        especies: string[];
        racas: string[];
        portes: string[];
        sexo: string[];
        castrado: boolean[];
        ordenar: string | null;
    }) => void;
    species: Species[];
};

const PetFilter = ({ onFiltrar, species }: Props) => {
    const [especies, setEspecies] = useState<string[]>([]);
    const [racas, setRacas] = useState<string[]>([]);
    const [portes, setPortes] = useState<string[]>([]);
    const [sexo, setSexo] = useState<string[]>([]);
    const [castrado, setCastrado] = useState<boolean[]>([]);
    const [ordenar, setOrdenar] = useState<string>("Adicionado recentemente");

    const racasDisponiveis = especies.flatMap((e) => species.find((s) => s.name === e)?.Breed.map((b) => b.name) || []);
    const racasFiltradas = [...new Set(racasDisponiveis)];

    useEffect(() => {
        setRacas((racasAtuais) => racasAtuais.filter((r) => racasFiltradas.includes(r)));
    }, [especies]);

    useEffect(() => {
        onFiltrar({ especies, racas, portes, sexo, castrado, ordenar });
    }, [especies, racas, portes, sexo, castrado, ordenar]);

    return (
        <div className="bg-slate-300 p-6 rounded-2xl max-w-6xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ExpandableFilter title="Espécie">
                    <MultiSelectCheckbox
                        options={species.map((v) => ({
                            label: v.name,
                            value: v.name,
                        }))}
                        selectedOptions={especies}
                        onChange={setEspecies}
                    />
                </ExpandableFilter>

                {especies.length > 0 && (
                    <ExpandableFilter title="Raça">
                        <MultiSelectCheckbox
                            options={racasFiltradas.map((v) => ({
                                label: v,
                                value: v,
                            }))}
                            selectedOptions={racas}
                            onChange={setRacas}
                        />
                    </ExpandableFilter>
                )}

                <ExpandableFilter title="Porte">
                    <MultiSelectCheckbox options={porteOptions} selectedOptions={portes} onChange={setPortes} />
                </ExpandableFilter>

                <ExpandableFilter title="Sexo">
                    <MultiSelectCheckbox options={sexoOptions} selectedOptions={sexo} onChange={setSexo} />
                </ExpandableFilter>

                <ExpandableFilter title="Castrado">
                    <MultiSelectCheckbox options={castradoOptions} selectedOptions={castrado} onChange={setCastrado} />
                </ExpandableFilter>

                <ExpandableFilter title="Ordenar">
                    <div className="space-y-2">
                        {ordenarOptions.map((opt) => (
                            <label key={opt} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="ordenar"
                                    value={opt}
                                    checked={ordenar === opt}
                                    onChange={() => setOrdenar(opt)}
                                />
                                <span>{opt}</span>
                            </label>
                        ))}
                    </div>
                </ExpandableFilter>
            </div>
        </div>
    );
};

export default PetFilter;
