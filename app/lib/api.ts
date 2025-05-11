import axios from "axios";

export const instance = axios.create({
    baseURL: "http://localhost:8000/v1",
});

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
