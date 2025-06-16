import React from 'react';
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
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
import { AuthProvider, useAuthContext } from "~/contexts/AuthContext";
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
              <FontAwesomeIcon
                icon={faBars}
                style={{ color: "#FFFFFF" }}
                size="lg"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {isAuthenticated ? user.name : "Anônimo"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Buscar</DropdownMenuItem>
              <DropdownMenuItem>Doar</DropdownMenuItem>
              <DropdownMenuItem>FAQ</DropdownMenuItem>
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Sobre</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
