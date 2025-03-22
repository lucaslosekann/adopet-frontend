import axios from "axios";

export const instance = axios.create({
    baseURL: "http://localhost:8000/v1",
});

export const loginRequest = async (email: string, password: string) => {
    const response = await instance.post("/auth/login", { email, password });
    return response.data;
};

export const registerRequest = async (data: { email: string; password: string; name: string }) => {
    const response = await instance.post("/auth/register", data);
    return response.data;
};

export const getMe = async () => {
    const response = await instance.get("/auth/me");
    return response.data;
};
