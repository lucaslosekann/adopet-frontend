"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getMe, instance, loginRequest, registerRequest } from "../lib/api";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export type User = {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

// Create the context
export type AuthContextProps = {
    login: (email: string, password: string) => void;
    register: (email: string, password: string, name: string) => void;
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
            }
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
        mutationKey: ["login"],
        mutationFn: ({ email, password }: { email: string; password: string }) => {
            return loginRequest(email, password);
        },
        onSuccess: (data) => {
            setUser(data.user);
            instance.defaults.headers["Authorization"] = data.token;
            localStorage.setItem("adopet-token", data.token);
            navigate("/");
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    toast.error("Credenciais Inválidas", {
                        description: "Email ou senha incorretos",
                    });
                } else {
                    toast.error("Algo deu errado", {
                        description: "Tente novamente mais tarde",
                    });
                }
            }
        },
    });

    const RegisterMutation = useMutation({
        mutationFn: registerRequest,
        onSuccess: (data) => {
            setUser(data.user);
            instance.defaults.headers["Authorization"] = data.token;
            localStorage.setItem("adopet-token", data.token);
        },
        onError: (error) => {
            let message = "Tente novamente mais tarde";
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    message = error.response?.data?.message;
                }
            }
            toast.error("Algo deu errado", {
                description: message,
            });
        },
    });

    const login = useCallback(async (email: string, password: string) => {
        await LoginMutation.mutateAsync({ email, password });
    }, []);

    const register = useCallback(async (email: string, password: string, name: string) => {
        await RegisterMutation.mutateAsync({ email, password, name });
    }, []);

    const logout = useCallback(async () => {
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
                register,
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
