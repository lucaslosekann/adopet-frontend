import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../DataTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PencilIcon, Plus, PlusIcon, TextSelectIcon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { editPet, getPetsOng, getSpecies, registerPet } from "~/lib/api";
import { DateTime } from "luxon";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCallback, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DatePicker } from "../DatePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import ToastMessage from "../ToastMessage";
import { toast } from "sonner";
import Combobox from "../Combobox";

export type ManagedPet = {
    id: string;
    formerName: string;
    dateOfBirth: string;
    weight: number;
    size: string;
    breedName: string;
    castrated: boolean;
    expenseRange: string;
    isActive: boolean;
    isGoodWithKids: boolean;
    ongId: string;
    available: boolean;
    sex: string;
    createdAt: string;
    updatedAt: string;
    PetImage: {
        id: string;
        createdAt: string;
        mimeType: string;
    }[];
    breed: {
        specieName: string;
    };
};

export const columns: ColumnDef<ManagedPet>[] = [
    {
        accessorKey: "id",
        header: "ID",
        id: "ID",
    },
    {
        accessorKey: "formerName",
        header: "Nome",
        id: "Nome",
    },
    {
        accessorKey: "sex",
        header: "Sexo",
        id: "Sexo",
        accessorFn: (r) => (r.sex === "MALE" ? "Macho" : "Fêmea"),
    },
    {
        accessorKey: "breed.specieName",
        header: "Espécie",
        id: "Espécie",
    },
    {
        accessorKey: "breedName",
        header: "Raça",
        id: "Raça",
    },
    {
        accessorFn: (row) => DateTime.fromISO(row.dateOfBirth).toLocaleString(DateTime.DATE_MED),
        header: "Data de Nascimento",
        id: "Data de Nascimento",
    },
    {
        accessorKey: "weight",
        header: "Peso",
        id: "Peso",
        accessorFn: (row) => `${row.weight} kg`,
    },
    {
        header: "Castrado",
        id: "Castrado",
        accessorFn: (row) => (row.castrated ? "Sim" : "Não"),
    },
    {
        accessorFn: (row) => (row.available ? "Sim" : "Não"),
        header: "Disponível para Adoção?",
        id: "Disponível para Adoção?",
    },
    {
        id: "Ações",
        header: "Ações",
        cell: ActionsCellComponent,
    },
];

export default function ManagedPetsTable() {
    const ManagedPetsQuery = useQuery({
        queryKey: ["pets-ong"],
        queryFn: getPetsOng,
    });

    const [registerPetFormOpen, setRegisterPetFormOpen] = useState(false);

    if (ManagedPetsQuery.isLoading) {
        return <div>Loading...</div>;
    }
    if (ManagedPetsQuery.isError) {
        return <div>Error: {ManagedPetsQuery.error.message}</div>;
    }

    if (!ManagedPetsQuery.data) {
        return <div>No data</div>;
    }

    return (
        <div>
            <DataTable
                columns={columns}
                data={ManagedPetsQuery.data}
                leftComponent={
                    <Dialog open={registerPetFormOpen} onOpenChange={setRegisterPetFormOpen}>
                        <DialogTrigger asChild>
                            <Button className="cursor-pointer" variant="outline">
                                Cadastrar Pet
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Cadastro do pet</DialogTitle>
                            </DialogHeader>
                            <FormRegisterPet onClose={() => setRegisterPetFormOpen(false)} />
                        </DialogContent>
                    </Dialog>
                }
            />
        </div>
    );
}

function FormRegisterPet({ onClose, pet }: { onClose: () => void; pet?: ManagedPet }) {
    const queryClient = useQueryClient();
    const SpeciesQuery = useQuery({
        queryKey: ["speciesEdit"],
        queryFn: getSpecies,
    });

    const RegisterPetMutation = useMutation({
        mutationFn: registerPet,
        onSuccess: () => {
            toast("Pet cadastrado com sucesso");
            SpeciesQuery.refetch();
            queryClient.invalidateQueries({
                exact: true,
                queryKey: ["pets-ong"],
            });
            onClose();
        },
        onError: () => {
            toast(<ToastMessage title="Algo deu errado!" />);
        },
    });

    const EditPetMutation = useMutation({
        mutationFn: editPet,
        onSuccess: () => {
            toast("Pet editado com sucesso");
            SpeciesQuery.refetch();
            queryClient.invalidateQueries({
                exact: true,
                queryKey: ["pets-ong"],
            });
            onClose();
        },
        onError: () => {
            toast(<ToastMessage title="Algo deu errado!" />);
        },
    });

    const [addedSpecies, setAddedSpecies] = useState<
        {
            name: string;
            Breed: {
                name: string;
            }[];
        }[]
    >([]);
    const [specie, setSpecie] = useState<string | undefined>(pet?.breed.specieName);
    const [breed, setBreed] = useState<string | undefined>(pet?.breedName);
    const [speciesComboboxOpen, setSpeciesComboboxOpen] = useState(false);
    const [breedComboboxOpen, setBreedComboboxOpen] = useState(false);

    const [birthDate, setBirthDate] = useState<Date | undefined>(
        pet?.dateOfBirth ? new Date(pet?.dateOfBirth) : undefined,
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!birthDate) {
                toast(<ToastMessage title="Preencha a data de nascimento" />);
                return;
            }
            if (!specie) {
                toast(<ToastMessage title="Preencha a espécie" />);
                return;
            }
            if (!breed) {
                toast(<ToastMessage title="Preencha a raça" />);
                return;
            }
            const data = new FormData(e.currentTarget);
            const payload = {
                formerName: data.get("formerName") as string,
                size: data.get("size") as string,
                expenseRange: data.get("expenseRange") as string,
                castrated: data.get("castrated") === "true",
                available: data.get("available") === "true",
                isActive: data.get("isActive") === "true",
                isGoodWithKids: data.get("isGoodWithKids") === "true",
                weight: Number(data.get("weight")),
                dateOfBirth: birthDate.toISOString().split("T")[0],
                species: specie,
                breed,
                sex: data.get("sex") as string,
            };

            if (pet) {
                EditPetMutation.mutate({ ...payload, id: pet.id });
            } else {
                RegisterPetMutation.mutate(payload);
            }
        },
        [birthDate, specie, breed, pet],
    );

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label className="text-md">Nome do Pet</Label>
                    <Input
                        type="text"
                        name="formerName"
                        placeholder="Ex: Tapioca"
                        className="w-full mt-2"
                        required
                        defaultValue={pet?.formerName}
                    />
                </div>
                <div>
                    <Label className="text-md mb-2">Data de Nascimento</Label>
                    <DatePicker date={birthDate} onChange={setBirthDate} />
                </div>
                <div>
                    <Label className="text-md">Peso</Label>
                    <Input
                        type="number"
                        step={0.01}
                        name="weight"
                        placeholder="Ex: 3 (em kilos)"
                        className="w-full mt-2"
                        required
                        defaultValue={pet?.weight}
                    />
                </div>
                <div>
                    <Label className="text-md">Tamanho</Label>
                    <Select name="size" required defaultValue={pet?.size}>
                        <SelectTrigger className="mt-2 w-full">
                            <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="small">Pequeno</SelectItem>
                            <SelectItem value="medium">Médio</SelectItem>
                            <SelectItem value="large">Grande</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="text-md">Sexo</Label>
                    <Select name="sex" required defaultValue={pet?.sex}>
                        <SelectTrigger className="mt-2 w-full">
                            <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="MALE">Masculino</SelectItem>
                            <SelectItem value="FEMALE">Feminino</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="text-md">É castrado?</Label>
                    <RadioGroup
                        name="castrated"
                        className="mt-2"
                        required
                        defaultValue={pet?.castrated !== undefined ? (pet.castrated ? "true" : "false") : undefined}
                    >
                        <div className="flex items-center gap-3">
                            <RadioGroupItem id="castratedY" value="true" />
                            <Label htmlFor="castratedY">Sim</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem id="castratedN" value="false" />
                            <Label htmlFor="castratedN">Nao</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div>
                    <Label className="text-md">Disponível para adoção?</Label>
                    <RadioGroup
                        name="available"
                        className="mt-2"
                        required
                        defaultValue={pet?.available !== undefined ? (pet.available ? "true" : "false") : undefined}
                    >
                        <div className="flex items-center gap-3">
                            <RadioGroupItem id="availableY" value="true" />
                            <Label htmlFor="availableY">Sim</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem id="availableN" value="false" />
                            <Label htmlFor="availableN">Nao</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div>
                    <Label className="text-md">Gasto estimado mensal</Label>
                    <Select name="expenseRange" required defaultValue={pet?.expenseRange}>
                        <SelectTrigger className="mt-2 w-full">
                            <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="250-499">R$250 - R$499</SelectItem>
                            <SelectItem value="500-749">R$500 - R$749</SelectItem>
                            <SelectItem value="750-999">R$750 - R$999</SelectItem>
                            <SelectItem value="1000+">R$1000+</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="text-md">É um pet ativo?</Label>
                    <RadioGroup
                        name="isActive"
                        className="mt-2"
                        required
                        defaultValue={pet?.isActive !== undefined ? (pet.isActive ? "true" : "false") : undefined}
                    >
                        <div className="flex items-center gap-3">
                            <RadioGroupItem id="isActiveY" value="true" />
                            <Label htmlFor="isActiveY">Sim</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem id="isActiveN" value="false" />
                            <Label htmlFor="isActiveN">Nao</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div>
                    <Label className="text-md">É bom com crianças?</Label>
                    <RadioGroup
                        name="isGoodWithKids"
                        className="mt-2"
                        required
                        defaultValue={
                            pet?.isGoodWithKids !== undefined ? (pet.isGoodWithKids ? "true" : "false") : undefined
                        }
                    >
                        <div className="flex items-center gap-3">
                            <RadioGroupItem id="isGoodWithKidsY" value="true" />
                            <Label htmlFor="isGoodWithKidsY">Sim</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem id="isGoodWithKidsN" value="false" />
                            <Label htmlFor="isGoodWithKidsN">Nao</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div>
                    <Label className="text-md">Espécie</Label>
                    <div className="flex justify-center items-center gap-2 mt-2">
                        <Combobox
                            items={[...(SpeciesQuery.data ?? []), ...addedSpecies]?.map((s) => ({
                                value: s.name,
                                label: s.name,
                            }))}
                            setValue={setSpecie}
                            value={specie}
                            open={speciesComboboxOpen}
                            setOpen={setSpeciesComboboxOpen}
                            placeholder="Selecione uma espécie"
                            onAddButtonClicked={(v) => {
                                setAddedSpecies((old) => [
                                    ...old,
                                    {
                                        name: v,
                                        Breed: [],
                                    },
                                ]);

                                setSpecie(v);
                            }}
                        />
                    </div>
                </div>
                <div>
                    <Label className="text-md">Raça</Label>
                    <div className="flex justify-center items-center gap-2 mt-2">
                        {specie ? (
                            <Combobox
                                items={
                                    [...(SpeciesQuery.data ?? []), ...addedSpecies]
                                        ?.find((v) => v.name === specie)
                                        ?.Breed.map((s) => ({ value: s.name, label: s.name })) ?? []
                                }
                                setValue={setBreed}
                                value={breed}
                                open={breedComboboxOpen}
                                setOpen={setBreedComboboxOpen}
                                placeholder="Selecione uma raça"
                                onAddButtonClicked={(newValue) => {
                                    setAddedSpecies((old) => {
                                        return old.map((v: any) => {
                                            if (v.name != specie) return v;
                                            return {
                                                name: specie,
                                                Breed: [
                                                    ...v.Breed,
                                                    {
                                                        name: newValue,
                                                    },
                                                ],
                                            };
                                        });
                                    });
                                    setBreed(newValue);
                                }}
                            />
                        ) : (
                            <span className="text-sm">Selecione a espécie primeiro</span>
                        )}
                    </div>
                </div>
            </div>
            <Button>{pet ? "Salvar" : "Cadastrar"}</Button>
        </form>
    );
}

function ActionsCellComponent({ row }: CellContext<ManagedPet, unknown>) {
    const pet = row.original;
    const [editPetFormOpen, setEditPetFormOpen] = useState(false);
    const DeletePetMutation = useMutation({
        mutationFn: async (petId: string) => {
            alert(`Deleting pet with ID: ${petId}`);
        },
    });

    return (
        <div className="flex gap-2">
            <Dialog open={editPetFormOpen} onOpenChange={setEditPetFormOpen}>
                <DialogTrigger asChild>
                    <Button className="aspect-square cursor-pointer" variant="outline" size="icon">
                        <PencilIcon />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edição de pet</DialogTitle>
                    </DialogHeader>
                    <FormRegisterPet onClose={() => setEditPetFormOpen(false)} pet={pet} />
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="aspect-square cursor-pointer" variant="outline" size="icon">
                        <TextSelectIcon />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detalhes do pet</DialogTitle>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-md font-semibold">Gasto estimado mensal</p>
                                <p>R${pet.expenseRange}</p>
                            </div>
                            <div>
                                <p className="text-md font-semibold">É bom com crianças?</p>
                                <p>{pet.isGoodWithKids ? "Sim" : "Não"}</p>
                            </div>
                            <div>
                                <p className="text-md font-semibold">Tamanho</p>
                                <p>
                                    {(() => {
                                        switch (pet.size) {
                                            case "small":
                                                return "Pequeno";
                                            case "medium":
                                                return "Médio";
                                            case "large":
                                                return "Grande";
                                            default:
                                                return "N/A";
                                        }
                                    })()}
                                </p>
                            </div>
                            <div>
                                <p className="text-md font-semibold">É um pet fisicamente ativo?</p>
                                <p>{pet.isActive ? "Sim" : "Não"}</p>
                            </div>

                            <div>
                                <p className="text-md font-semibold">Criado em</p>
                                <p>
                                    {new Date(pet.createdAt)
                                        .toLocaleDateString("pt-BR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        })
                                        .replace(",", "")}
                                </p>
                            </div>
                            <div>
                                <p className="text-md font-semibold">Atualizado em</p>
                                <p>
                                    {new Date(pet.updatedAt)
                                        .toLocaleDateString("pt-BR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        })
                                        .replace(",", "")}
                                </p>
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="aspect-square cursor-pointer" variant="destructive" size="icon">
                        <Trash2Icon />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Você tem certeza que deseja deletar este pet?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso irá deletar esse pert permanentemente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                DeletePetMutation.mutate(pet.id);
                            }}
                        >
                            Sim, tenho certeza
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
