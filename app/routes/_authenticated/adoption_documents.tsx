import React, { useCallback } from "react";
import Header from "../../components/Header";
import { cn } from "../../lib/utils";
import SendDocumentsProgress from "../../components/SendDocumentsProgress";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { adoptionRequest } from "../../lib/api";
import { useLocation, useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext";

export default function AdoptionDocuments() {
    const { state } = useLocation();
    const { updateUserData } = useAuthContext();
    const navigate = useNavigate();
    const [rgFile, setRgFile] = React.useState<File | null>(null);
    const rgFileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [residenceProofFile, setResidenceProofFile] = React.useState<File | null>(null);
    const residenceProofFileInputRef = React.useRef<HTMLInputElement | null>(null);

    const SubmitAdoptionRequestMutation = useMutation({
        mutationFn: adoptionRequest,
        onSuccess: async () => {
            toast.success("Documentos enviados com sucesso! Aguarde a análise.");
            setRgFile(null);
            setResidenceProofFile(null);
            await updateUserData();
            navigate("/adoption-status");
        },
        onError: (error: any) => {
            let message = "Ocorreu um erro ao submeter sua solicitação de adoção. Por favor, tente novamente.";
            if (error.response?.data?.message) {
                message = error.response.data.message;
            }
            toast.error(message);
        },
    });

    const handleFormSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!rgFile) {
                return toast.error("Por favor, anexe o RG (frente e verso).");
            }
            if (!residenceProofFile) {
                return toast.error("Por favor, anexe o comprovante de residência.");
            }
            const formData = new FormData(event.currentTarget);
            formData.append("idCard", rgFile);
            formData.append("proofOfResidence", residenceProofFile);
            formData.append("petId", state?.petId!);
            SubmitAdoptionRequestMutation.mutate(formData);
        },
        [rgFile, residenceProofFile, state?.petId],
    );
    if (!state?.petId) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="container mx-auto flex-1 flex flex-col mt-10 pb-8">
                    <h1 className="font-secondary text-background-secondary text-6xl">Erro</h1>
                    <p className="text-background-secondary mt-4">Nenhum pet selecionado para adoção.</p>
                </div>
            </div>
        );
    }
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className={cn("container mx-auto flex-1 flex flex-col mt-10 pb-8")}>
                <h1 className="font-secondary text-background-secondary text-6xl">ENVIO DE DOCUMENTOS</h1>
                {/* {state.petName} */}
                <h2 className="font-secondary text-background-secondary text-2xl">
                    {state?.petName!} - Etapa 1: Envio de Documentos
                </h2>
                <div className="w-2/3 mt-10">
                    <SendDocumentsProgress stage={1} />
                </div>
                <form className="text-background-secondary mt-10 flex flex-col gap-6" onSubmit={handleFormSubmit}>
                    <div>
                        <Label className="text-lg">
                            <strong>RG</strong> (frente e verso)
                        </Label>
                        {rgFile ? (
                            <div className="flex items-center gap-2">
                                <span>{rgFile.name}</span>
                                <Button
                                    type="button"
                                    variant={"link"}
                                    onClick={() => setRgFile(null)}
                                    className="text-xs cursor-pointer"
                                >
                                    Remover
                                </Button>
                            </div>
                        ) : (
                            <Button
                                type="button"
                                variant={"outline"}
                                className="cursor-pointer mt-2"
                                onClick={() => {
                                    rgFileInputRef.current?.click();
                                }}
                            >
                                Anexar Arquivo
                            </Button>
                        )}

                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png, .pdf"
                            className="hidden"
                            ref={rgFileInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                if (file) {
                                    setRgFile(file);
                                }
                            }}
                        />
                    </div>
                    <div>
                        <Label className="text-lg">
                            <strong>Comprovante de Residência</strong>
                        </Label>
                        {residenceProofFile ? (
                            <div className="flex items-center gap-2">
                                <span>{residenceProofFile.name}</span>
                                <Button
                                    type="button"
                                    variant={"link"}
                                    onClick={() => setResidenceProofFile(null)}
                                    className="text-xs cursor-pointer"
                                >
                                    Remover
                                </Button>
                            </div>
                        ) : (
                            <Button
                                type="button"
                                variant={"outline"}
                                className="cursor-pointer mt-2"
                                onClick={() => {
                                    residenceProofFileInputRef.current?.click();
                                }}
                            >
                                Anexar Arquivo
                            </Button>
                        )}
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png, .pdf"
                            className="hidden"
                            ref={residenceProofFileInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                if (file) {
                                    setResidenceProofFile(file);
                                }
                            }}
                        />
                    </div>
                    <div>
                        <Label className="text-lg">
                            <strong>Pergunta 1:</strong> Você já teve animais de estimação antes?
                        </Label>
                        <RadioGroup name="hadPetsBefore" className="mt-2" required>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem id="hadPetsBeforeY" value="true" />
                                <Label htmlFor="hadPetsBeforeY" className="text-lg">
                                    Sim
                                </Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem id="hadPetsBeforeN" value="false" />
                                <Label htmlFor="hadPetsBeforeN" className="text-lg">
                                    Nao
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div>
                        <Label className="text-lg">
                            <strong>Pergunta 2:</strong> Você tem outros animais atualmente?
                        </Label>
                        <RadioGroup name="hasOtherPets" className="mt-2" required>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem id="hasOtherPetsY" value="true" />
                                <Label htmlFor="hasOtherPetsY" className="text-lg">
                                    Sim
                                </Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem id="hasOtherPetsN" value="false" />
                                <Label htmlFor="hasOtherPetsN" className="text-lg">
                                    Nao
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div>
                        <Label className="text-lg">
                            <strong>Pergunta 3:</strong> Você vive em casa ou apartamento?
                        </Label>
                        <Select name="houseType" required>
                            <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Selecione uma opção" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="casa">Casa</SelectItem>
                                <SelectItem value="apartamento">Apartamento</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="text-lg">
                            <strong>Pergunta 4:</strong> Você tem condições financeiras para arcar com os custos de um
                            animal?
                        </Label>
                        <RadioGroup name="hasFinancialConditions" className="mt-2" required>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem id="hasFinancialConditionsY" value="true" />
                                <Label htmlFor="hasFinancialConditionsY" className="text-lg">
                                    Sim
                                </Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem id="hasFinancialConditionsN" value="false" />
                                <Label htmlFor="hasFinancialConditionsN" className="text-lg">
                                    Nao
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div>
                        <Label className="text-lg">
                            <strong>Pergunta 5:</strong> Você está preparado para as responsabilidades de longo prazo?
                        </Label>
                        <RadioGroup name="isPreparedForLongTerm" className="mt-2" required>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem id="isPreparedForLongTermY" value="true" />
                                <Label htmlFor="isPreparedForLongTermY" className="text-lg">
                                    Sim
                                </Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem id="isPreparedForLongTermN" value="false" />
                                <Label htmlFor="isPreparedForLongTermN" className="text-lg">
                                    Nao
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div>
                        <Label className="text-lg">
                            <strong>Pergunta 6:</strong> Se houver um problema de adaptação ou comportamento, o que você
                            faria?
                        </Label>
                        <Textarea
                            className="mt-2"
                            name="whatWillDoIfProblemsArise"
                            required
                            minLength={30}
                            placeholder="Sua resposta aqui."
                        />
                    </div>
                    <Button type="submit" className="mt-4 w-[200px]">
                        Finalizar
                    </Button>
                </form>
            </div>
        </div>
    );
}
