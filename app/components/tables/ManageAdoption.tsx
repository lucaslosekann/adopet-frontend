import type { CellContext, ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../DataTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PencilIcon, TextSelectIcon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { getAdoptions, getAdoptionSubmisson, getPetsOng, downloadFile, updateAdoptionStatus } from "~/lib/api";
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

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useCallback, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DatePicker } from "../DatePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

// adocaoId, nomepet, nomePessoa, status, created, updated

export type ManageAdoptions = {
    id: string;
    pet: {
        formerName: string;
    };
    user: {
        name: string;
    };
    status: string;
    createdAt: string;
    updatedAt: string;
};

export type ManageAdoptionsSubmission = {
    whatWillDoIfProblemsArise: string;
    hadPetsBefore: string;
    hasOtherPets: string;
    isPreparedForLongTerm: string;
    hasFinancialConditions: string;
    houseType: string;
};

export const columns: ColumnDef<ManageAdoptions>[] = [
    {
        accessorKey: "id",
        header: "ID",
        id: "ID",
    },
    {
        accessorFn: (row) => row.pet.formerName,
        header: "Pet",
        id: "Pet",
    },
    {
        accessorFn: (row) => row.user.name,
        header: "Adotante",
        id: "Adotante",
    },
    {
        accessorFn: (row) => {
            switch (row.status) {
                case "PENDING":
                    return "PENDENTE";
                case "APPROVED":
                    return "APROVADO";
                case "REJECTED":
                    return "REJEITADO";
                default:
                    return row.status;
            }
        },
        header: "Status",
        id: "Status",
    },
    {
        accessorFn: (row) => DateTime.fromISO(row.createdAt).toLocaleString(DateTime.DATETIME_MED),
        header: "Criado em",
        id: "Criado em",
    },
    {
        accessorFn: (row) => DateTime.fromISO(row.updatedAt).toLocaleString(DateTime.DATETIME_MED),
        header: "Atualizado em",
        id: "Atualizado em",
    },
    {
        id: "Ações",
        header: "Ações",
        cell: ({ row }) => <ActionsCellComponent row={row.original} />,
    },
];

export default function ManagedAdoptionsTable() {
    const ManagedAdoptionsQuery = useQuery({
        queryKey: ["adoptions"],
        queryFn: getAdoptions,
    });

    if (ManagedAdoptionsQuery.isLoading) {
        return <div>Loading...</div>;
    }
    if (ManagedAdoptionsQuery.isError) {
        return <div>Error: {ManagedAdoptionsQuery.error.message}</div>;
    }

    if (!ManagedAdoptionsQuery.data) {
        return <div>No data</div>;
    }

    return (
        <div>
            <DataTable columns={columns} data={ManagedAdoptionsQuery.data} />
        </div>
    );
}

function ActionsCellComponent({ row }: { row: ManageAdoptions }) {
    const queryClient = useQueryClient();

    const ManagedAdoptionsSubmissionQuery = useQuery({
        queryKey: ["adoptions-submission-query", row.id],
        queryFn: () => getAdoptionSubmisson(row.id),
        enabled: !!row.id,
    });

    const UpdateStatusMutation = useMutation({
        mutationFn: updateAdoptionStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({
                exact: true,
                queryKey: ["adoptions"],
            });
        },
    });

    return (
        <div className="flex justify-center gap-2">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="aspect-square cursor-pointer" variant="outline" size="icon">
                        <TextSelectIcon />
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-screen w-[2000px]">
                    <DialogHeader>
                        <DialogTitle>Informações da Adoção</DialogTitle>
                    </DialogHeader>
                    <div className="flex gap-4 justify-between">
                        <Button
                            className="bg-background-secondary w-[48%]"
                            onClick={() => {
                                downloadFile(`/adoption/docs/rg/${row.id}`);
                            }}
                        >
                            RG - Registro Geral
                        </Button>

                        <Button
                            className="bg-background-secondary w-[48%]"
                            onClick={() => {
                                downloadFile(`/adoption/docs/proofResidence/${row.id}`);
                            }}
                        >
                            Comprovante de residência
                        </Button>
                    </div>
                    <div className="text-black font-medium space-y-3">
                        <div>
                            <p>Pergunta 1: Você já teve animais de estimação antes?</p>
                            <p className="text-black font-semibold">
                                {ManagedAdoptionsSubmissionQuery.data?.hadPetsBefore ? "Sim" : "Não"}
                            </p>
                        </div>
                        <div>
                            <p>Pergunta 2: Você tem outros animais atualmente?</p>
                            <p className="text-black font-semibold">
                                {ManagedAdoptionsSubmissionQuery.data?.hasOtherPets ? "Sim" : "Não"}
                            </p>
                        </div>
                        <div>
                            <p>Pergunta 3: Você vive em casa ou apartamento?</p>
                            <p className="text-black font-semibold">
                                {ManagedAdoptionsSubmissionQuery.data?.houseType}
                            </p>
                        </div>
                        <div>
                            <p>Pergunta 4: Você tem condições financeiras para arcar com os custos de um animal?</p>
                            <p className="text-black font-semibold">
                                {ManagedAdoptionsSubmissionQuery.data?.hasFinancialConditions ? "Sim" : "Não"}
                            </p>
                        </div>
                        <div>
                            <p>Pergunta 5: Você está preparado para as responsabilidades de longo prazo?</p>
                            <p className="text-black font-semibold">
                                {ManagedAdoptionsSubmissionQuery.data?.isPreparedForLongTerm ? "Sim" : "Não"}
                            </p>
                        </div>
                        <div>
                            <p>Pergunta 6: Se houver um problema de adaptação ou comportamento, o que você faria?</p>
                            <p className="text-black font-semibold">
                                {ManagedAdoptionsSubmissionQuery.data?.whatWillDoIfProblemsArise}
                            </p>
                        </div>
                    </div>
                    {row.status === "PENDING" ? (
                        <div className="flex justify-evenly gap-2.5">
                            <Button
                                className="w-[48%] bg-green-600"
                                onClick={() => {
                                    UpdateStatusMutation.mutate({
                                        adoptionId: row.id,
                                        approved: true,
                                    });
                                }}
                            >
                                Aprovar
                            </Button>
                            <Button
                                className="w-[48%] bg-red-600"
                                onClick={() => {
                                    UpdateStatusMutation.mutate({
                                        adoptionId: row.id,
                                        approved: false,
                                    });
                                }}
                            >
                                Rejeitar
                            </Button>
                        </div>
                    ) : (
                        <div className="w-full text-center font-bold">
                            {row.status === "APPROVED" ? "APROVADO" : "REJEITADO"}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
