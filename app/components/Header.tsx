import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useAuthContext } from "~/contexts/AuthContext";
import { Link, useNavigate } from "react-router";

export default function Header() {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuthContext();
    return (
        <div className="flex bg-background-secondary h-16">
            <div className="container mx-auto flex items-center justify-between px-4">
                <Link to="/">
                    <img src="/logo.svg" alt="logo" className="w-32" />
                </Link>
                <div className="space-x-4">
                    {isAuthenticated ? (
                        <Button
                            className="bg-white text-background-secondary h-8"
                            onClick={() => {
                                console.log("saindo");
                                logout();
                                navigate("/login");
                            }}
                        >
                            Sair
                        </Button>
                    ) : (
                        <Button
                            className="bg-white text-background-secondary h-8 "
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Entrar
                        </Button>
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <FontAwesomeIcon icon={faBars} style={{ color: "#FFFFFF" }} size="lg" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent avoidCollisions={false} align="end" className="my-2.5">
                            <DropdownMenuLabel>{isAuthenticated ? user.name : "Anônimo"}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigate("/pesquisa")}>Pesquisar</DropdownMenuItem>
                            <DropdownMenuItem>Doar</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/faq")}>FAQ</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/meuperfil")}>Perfil</DropdownMenuItem>
                            {isAuthenticated && user.Ong ? (
                                <div>
                                    <DropdownMenuItem onClick={() => navigate("/manage/pets")}>
                                        Gerenciar Pets
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => navigate("/manage/adoption")}>
                                        Gerenciar Adoção
                                    </DropdownMenuItem>
                                </div>
                            ) : (
                                <></>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
