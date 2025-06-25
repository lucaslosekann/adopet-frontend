import axios from "axios";
import type { ManageAdoptionsSubmission, ManageAdoptions } from "~/components/tables/ManageAdoption";
import type { ManagedPet } from "~/components/tables/ManagePets";
import { fileTypeFromBlob } from "file-type";

export const API_URL = "http://localhost:8000/v1";
export const instance = axios.create({
    baseURL: API_URL,
});

export const constructPetImageUrl = (petId: string, imageId: string) => {
    return `${API_URL}/pets/${petId}/image/${imageId}`;
};

export const loginRequest = async (email: string, password: string) => {
    const response = await instance.post("/auth/login", { email, password });
    return response.data;
};

export const registerONGRequest = async (data: { cnpj: string; pixKey: string; email: string; password: string }) => {
    const response = await instance.post("/ongs/", data);
    return response.data;
};

export const registerAdoptantRequest = async (data: {
    email: string;
    password: string;
    name: string;
    cpf: string;
    phoneNumber: string;
    postalCode: string;
    uf: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement: string;
    petPreference: string[];
    size: string;
    expenseRange: string;
    isActive: boolean;
    isGoodWithKids: boolean;
}) => {
    const response = await instance.post("/auth/register", data);
    return response.data;
};

export const getMe = async () => {
    const response = await instance.get("/auth/me");
    return response.data;
};

type Pet = {
    id: string;
    formerName: string;
    dateOfBirth: string;
    weight: number;
    size: string;
    sex: "MALE" | "FEMALE";
    specieName: string;
    breedName: string;
    castrated: boolean;
    ongId: string;
    available: boolean;
    createdAt: string;
    updatedAt: string;
    PetImage: {
        id: string;
        createdAt: string;
        mimeType: string;
    }[];
    address: {
        city: string;
        uf: string;
    };
};

export const getPet = async (petId: string) => {
    const response = await instance.get<Pet>(`/pets/${petId}`);
    return response.data;
};
type CreatePetPayload = {
    formerName: string;
    dateOfBirth: string;
    species: string;
    breed: string;
    weight: number;
    size: string;
    castrated: boolean;
    available: boolean;
    expenseRange: string;
    isActive: boolean;
    isGoodWithKids: boolean;
    sex: string;
};

export const registerPet = async (data: CreatePetPayload) => {
    const response = await instance.post(`/pets`, data);
    return response.data;
};

export const editPet = async ({ id, ...data }: CreatePetPayload & { id: string }) => {
    const response = await instance.put(`/pets/${id}`, data);
    return response.data;
};

export type Species = {
    name: string;
    Breed: {
        name: string;
    }[];
};
export const getSpecies = async () => {
    const response = await instance.get<Species[]>(`/pets/species`);
    return response.data;
};

type Ong = {
    id: string;
    phone: string;
    cnpj: string;
    pixKey: string;
    about: string | null;
    createdAt: string;
    updatedAt: string;
    address: {
        id: string;
        street: string;
        number: string;
        neighborhood: string;
        city: string;
        uf: string;
        postalCode: string;
        createdAt: string;
        updatedAt: string;
    };
    email: string;
    name: string;
};

export const getOng = async (ongId: string) => {
    const response = await instance.get<Ong>(`/ongs/${ongId}`);
    return response.data;
};

export const adoptionRequest = async (data: FormData) => {
    const response = await instance.post(`/adoption`, data);
    return response.data;
};
export const getPets = async (limit?: number) => {
    const response = await instance.get<Omit<Pet, "address">[]>(`pets`, {
        ...(limit ? { params: { limit } } : {}),
    });
    return response.data;
};

export type RecommendedPet = {
    id: string;
    formerName: string;
    dateOfBirth: string;
    breed: {
        name: string;
        specieName: string;
    };
    weight: number;
    size: string;
    castrated: boolean;
    available: boolean;
    PetImage: {
        id: string;
    }[];
};

export const getRecommendedPets = async () => {
    const response = await instance.get<{ recommendedPets: RecommendedPet[] }>(`/recommendation`);
    return response.data.recommendedPets;
};

export const getPetsOng = async () => {
    return (await instance.get<ManagedPet[]>(`/ongs/manage/pets`)).data;
};

export const getAdoptions = async () => {
    return (await instance.get<ManageAdoptions[]>(`/adoption`)).data;
};

export const getAdoptionSubmisson = async (adoptionId: string) => {
    const response = await instance.get<ManageAdoptionsSubmission>(`adoption/submission/${adoptionId}`);
    return response.data;
};

export const downloadFile = async (path: string) => {
    const res = await instance.get(path, { responseType: "blob" });

    const mimeType = (await fileTypeFromBlob(res.data))?.mime || "application/octet-stream";
    const blob = new Blob([res.data], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
};

export const updateAdoptionStatus = async (body: { adoptionId: string; approved: boolean }) => {
    const response = await instance.put(`adoption/status/`, body);
    return response.data;
};
