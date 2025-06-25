"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getMe, instance, loginRequest, registerONGRequest, registerAdoptantRequest } from "../lib/api";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import ToastMessage from "~/components/ToastMessage";

export type User = {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
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
    createdAt: string;
    updatedAt: string;
    taxId: string;
    Ong?: {
        id: string;
    };
    Adoption?: {
        status: "PENDING" | "APPROVED" | "REJECTED";
    }[];
};

type RegisterAdoptantData = {
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
};

// Create the context
export type AuthContextProps = {
    login: (email: string, password: string, rememberMe: boolean) => void;
    registerONG: (cnpj: string, pixKey: string, email: string, password: string) => void;
    registerAdoptant: (data: RegisterAdoptantData) => void;
    updateUserData: () => Promise<void>;
    logout: () => void;
    loading: boolean;
    user: User;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

// Create a provider component
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const id = instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 401) {
                        setUser(null);
                    }
                }
                return Promise.reject(error);
            },
        );
        (async () => {
            try {
                const token = localStorage.getItem("adopet-token");
                instance.defaults.headers["Authorization"] = token;
                const data = await getMe();
                setUser(data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        })();
        return () => {
            instance.interceptors.response.eject(id);
        };
    }, []);

    const LoginMutation = useMutation({
        mutationKey: ["login", searchParams],
        mutationFn: ({ email, password }: { email: string; password: string; rememberMe: boolean }) => {
            return loginRequest(email, password);
        },
        onSuccess: (data, variables) => {
            setUser(data.user);
            instance.defaults.headers["Authorization"] = data.token;
            if (variables.rememberMe) {
                localStorage.setItem("adopet-token", data.token);
            }
            const to = searchParams.get("to");
            const state = searchParams.get("state");
            if (to) {
                navigate(to, {
                    state: state ? JSON.parse(state) : undefined,
                });
            } else {
                navigate("/");
            }
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    toast(<ToastMessage title="Credencials inválidas!" description="Email ou Senha incorretos!" />);
                } else {
                    if (error.response?.data.message) {
                        toast(<ToastMessage title="Algo deu errado!" description={error.response?.data.message} />);
                    } else if (error.response?.data.error?.[0]?.message) {
                        toast(
                            <ToastMessage
                                title="Algo deu errado!"
                                description={error.response?.data.error?.[0]?.message}
                            />,
                        );
                    } else {
                        toast(<ToastMessage title="Algo deu errado!" description="Tente novamente mais tarde" />);
                    }
                }
            }
        },
    });

    const RegisterONGMutation = useMutation({
        mutationFn: registerONGRequest,
        onSuccess: (data) => {
            setUser(data.user);
            instance.defaults.headers["Authorization"] = data.token;
            localStorage.setItem("adopet-token", data.token);
            navigate("/");
        },
        onError: (error) => {
            let message = "Tente novamente mais tarde";
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    message = error.response?.data?.message;
                }
            }
            toast(<ToastMessage title="Algo deu errado!" description={message} />);
        },
    });

    const RegisterAdoptantMutation = useMutation({
        mutationFn: registerAdoptantRequest,
        onSuccess: (data) => {
            setUser(data.user);
            instance.defaults.headers["Authorization"] = data.token;
            localStorage.setItem("adopet-token", data.token);
            navigate("/");
        },
        onError: (error) => {
            let message = "Tente novamente mais tarde";
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    message = error.response?.data?.message;
                }
            }
            toast(<ToastMessage title="Algo deu errado!" description={message} />);
        },
    });

    const login = useCallback(async (email: string, password: string, rememberMe: boolean) => {
        await LoginMutation.mutateAsync({ email, password, rememberMe });
    }, []);

    const registerONG = useCallback(async (cnpj: string, pixKey: string, email: string, password: string) => {
        await RegisterONGMutation.mutateAsync({ cnpj, pixKey, email, password });
    }, []);

    const registerAdoptant = useCallback(async (data: RegisterAdoptantData) => {
        await RegisterAdoptantMutation.mutateAsync(data);
    }, []);

    const updateUserData = useCallback(async () => {
        const data = await getMe();
        setUser(data);
    }, []);

    const logout = useCallback(async () => {
        navigate("/login");
        setUser(null);
        localStorage.removeItem("adopet-token");
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: user as User,
                isAuthenticated: !!user,
                loading,
                login,
                logout,
                registerONG,
                registerAdoptant,
                updateUserData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the context
const useAuthContext = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuthContext };
