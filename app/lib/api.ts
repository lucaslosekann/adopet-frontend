import axios from "axios";
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

export const registerONGRequest = async (data: { cnpj: string,
    pixKey: string,
    email: string,
    password: string }) => {
    const response = await instance.post("/ongs/", data);
    return response.data;
};

export const registerAdoptantRequest = async (data: { email: string;
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
    isGoodWithKids: boolean; }) => {
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
    speciesName: string;
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

export const getPets = async () => {
    const response = await instance.get<Omit<Pet, "address">[]>(`/pets`);
    return response.data;
}
