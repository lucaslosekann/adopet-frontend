import axios from 'axios';
import type { ManagedPet } from '~/components/tables/ManagePets';
export const API_URL = 'http://localhost:8000/v1';
export const instance = axios.create({
    baseURL: API_URL,
});

export const constructPetImageUrl = (petId: string, imageId: string) => {
    return `${API_URL}/pets/${petId}/image/${imageId}`;
};

export const loginRequest = async (email: string, password: string) => {
    const response = await instance.post('/auth/login', { email, password });
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
    const response = await instance.get('/auth/me');
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
}

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

export const getRecommendedPets = async () =>{
    const response = await instance.get<{recommendedPets: RecommendedPet[]}>(`/recommendation`);
    return response.data.recommendedPets;
}


export const getPetsOng = async () => {
    return (await instance.get<ManagedPet[]>(`/ongs/manage/pets`)).data;
}
