import React, { useCallback, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import MultiSelect from "../MultiSelect";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useAuthContext } from "~/contexts/AuthContext";

export default function StepPetRelatedInfo({ prevStep }: { prevStep: () => void }) {
    const [selectedPets, setSelectedPets] = useState<string[]>([]);
    const [size, setSize] = useState<string>("");
    const [expenseRange, setExpenseRange] = useState<string>("");
    const [isActive, setIsActive] = useState<string>("");
    const [isGoodWithKids, setIsGoodWithKids] = useState<string>("");
    const { registerAdoptant } = useAuthContext();

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const json = sessionStorage.getItem("user-signup-state");
            if (!json) {
                return;
            }
            const existingData = JSON.parse(json);
            if (!existingData?.step1 || !existingData?.step2) {
                return;
            }

            const step3 = {
                petPreference: selectedPets,
                size: size,
                expenseRange: expenseRange,
                isActive: isActive === "true",
                isGoodWithKids: isGoodWithKids === "true",
            };

            registerAdoptant({
                ...existingData.step1,
                ...existingData.step2,
                ...step3,
            });
        },
        [selectedPets, size, expenseRange, isActive, isGoodWithKids],
    );
    return (
        <div
            className="bg-white w-[400px] h-[500px] rounded-lg shadow-2xl overflow-auto pb-4
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        [&::-webkit-scrollbar-thumb]:rounded-full
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
        dark:[&::-webkit-scrollbar-thumb]:rounded-full"
        >
            <h1 className=" text-background-secondary font-secondary tracking-wide text-center text-2xl py-8 pl-4">
                Informações adoção
            </h1>
            <form className="flex flex-col items-start gap-5 pl-5" onSubmit={handleSubmit} id="adoptionForm">
                <div className="flex flex-col justify-start gap-4">
                    <div className="flex flex-col justify-start gap-4">
                        <div className="text-black text-sm font-medium">Qual a sua preferência de animais?</div>
                        <MultiSelect
                            options={[
                                {
                                    label: "Cachorro",
                                    value: "dog",
                                },
                                {
                                    label: "Gato",
                                    value: "cat",
                                },
                                {
                                    label: "Ave",
                                    value: "bird",
                                },
                                {
                                    label: "Coelho",
                                    value: "rabbit",
                                },
                                {
                                    label: "Réptil",
                                    value: "reptile",
                                },
                            ]}
                            placeholder="Animais"
                            selected={selectedPets}
                            onChange={setSelectedPets}
                        />
                    </div>
                    <div className="flex flex-col justify-start gap-4">
                        <div className="text-black text-sm font-medium">Qual o tamanho da sua residência?</div>
                        <Select onValueChange={(value) => setSize(value)} value={size}>
                            <SelectTrigger className="w-[190px] border-gray-300">
                                <SelectValue placeholder="Selecione o tamanho" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Tamanho</SelectLabel>
                                    <SelectItem value="small">Pequena</SelectItem>
                                    <SelectItem value="medium">Média</SelectItem>
                                    <SelectItem value="large">Grande</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col justify-start gap-4">
                        <div className="text-black text-sm font-medium">
                            Quanto você está disposto a gastar com o animal?
                        </div>
                        <Select onValueChange={(value) => setExpenseRange(value)} value={expenseRange}>
                            <SelectTrigger className="w-[190px] border-gray-300">
                                <SelectValue placeholder="Selecione o valor" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Valor em BRL</SelectLabel>
                                    <SelectItem value="250-499">250-499</SelectItem>
                                    <SelectItem value="500-749">500-749</SelectItem>
                                    <SelectItem value="750-999">750-999</SelectItem>
                                    <SelectItem value="1000+">1000+</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="text-black text-sm font-medium">Você é uma pessoa fisicamente ativa?</div>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            <RadioGroup onValueChange={(value) => setIsActive(value)} value={isActive}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="true" id="activePerson-yes" className="border-gray-300" />
                                    <label
                                        htmlFor="activePerson-yes"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Sim
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="false" id="activePerson-no" className="border-gray-300" />
                                    <label
                                        htmlFor="activePerson-no"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Não
                                    </label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="text-black text-sm font-medium">Possui crianças (até 12 anos)?</div>
                    <div className="flex items-center gap-4">
                        <RadioGroup onValueChange={(value) => setIsGoodWithKids(value)} value={isGoodWithKids}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="true" id="goodWithKids-yes" className="border-gray-300" />
                                <label
                                    htmlFor="goodWithKids-yes"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Sim
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="false" id="goodWithKids-no" className="border-gray-300" />
                                <label
                                    htmlFor="goodWithKids-no"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Não
                                </label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </form>
            <div className="flex justify-center w-full pt-10 pb-2.5">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="cursor-pointer bg-background-secondary text-primary-foreground hover:bg-primary-foreground hover:text-primary w-[155px]"
                        onClick={prevStep}
                    >
                        Voltar
                    </Button>
                    <Button
                        type="submit"
                        form="adoptionForm"
                        variant="outline"
                        className="cursor-pointer bg-background-secondary text-primary-foreground hover:bg-primary-foreground hover:text-primary w-[155px]"
                    >
                        Finalizar
                    </Button>
                </div>
            </div>
        </div>
    );
}
