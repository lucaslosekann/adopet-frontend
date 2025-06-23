import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../DataTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PencilIcon, TextSelectIcon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { getPetsOng } from "~/lib/api";
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="aspect-square cursor-pointer" variant="outline">
                                Cadastrar Pet
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Cadastro do pet</DialogTitle>
                            </DialogHeader>
                            <FormRegisterPet />
                        </DialogContent>
                    </Dialog>
                }
            />
        </div>
    );
}

function FormRegisterPet() {
    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }, []);

    const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
                <Label className="text-md">Nome do Pet</Label>
                <Input type="text" name="formerName" placeholder="Ex: Tapioca" className="w-full mt-2" required />
            </div>
            <div>
                <Label className="text-md mb-2">Data de Nascimento</Label>
                <DatePicker date={birthDate} onChange={setBirthDate} />
            </div>
            <div>
                <Label className="text-md">Peso</Label>
                <Input
                    type="number"
                    name="weight"
                    placeholder="Ex: 5000 (em gramas)"
                    className="w-full mt-2"
                    required
                />
            </div>
            <div>
                <Label className="text-md">Tamanho</Label>
                <Select name="size" required>
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
                <Label className="text-md">É castrado?</Label>
                <RadioGroup name="castrated" className="mt-2" required>
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
                <RadioGroup name="available" className="mt-2" required>
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
                <Select name="expenseRange" required>
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
                <RadioGroup name="isActive" className="mt-2" required>
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
                <RadioGroup name="isGoodWithKids" className="mt-2" required>
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
        </form>
    );
}

function ActionsCellComponent({ row }: CellContext<ManagedPet, unknown>) {
    const pet = row.original;
    const DeletePetMutation = useMutation({
        mutationFn: async (petId: string) => {
            alert(`Deleting pet with ID: ${petId}`);
        },
    });

    return (
        <div className="flex gap-2">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="aspect-square cursor-pointer" variant="outline" size="icon">
                        <PencilIcon />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar pet</DialogTitle>
                    </DialogHeader>
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
