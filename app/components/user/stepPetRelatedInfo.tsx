import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function StepPetRelatedInfo({
  prevStep,
}: {
  prevStep: () => void;
}) {
  return (
    <div className="bg-white w-[400px] h-[500px] rounded-lg shadow-2xl">
      <h1 className="text-background-secondary font-secondary tracking-wide text-left text-2xl py-8 pl-4">
        Informações adoção
      </h1>
      <form className="flex flex-col items-start gap-5 pl-4">
        <div className="flex flex-col justify-start gap-4">
          <div className="text-black text-sm font-medium">
            Possui tempo livre para cuidar de um animal?
          </div>
          <div className="flex items-center gap-4">
            <div className="">
              <Checkbox id="terms" className="border-gray-300" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Sim
              </label>
            </div>
            <div className="">
              <Checkbox id="terms" className="border-gray-300" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Não
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-4">
          <div className="text-black text-sm font-medium">
            Quanto você está disposto a gastar com o animal?
          </div>
        </div>
        <div className="flex flex-col justify-start gap-4">
          <div className="text-black text-sm font-medium">
            Qual o tipo da sua residência?
          </div>
          <Select>
            <SelectTrigger className="w-[180px] border-gray-300">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipos</SelectLabel>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="sitioFazenda">Sitío/Fazenda</SelectItem>
                <SelectItem value="loft">Loft</SelectItem>
                <SelectItem value="kitnet">Kitnet</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col justify-start gap-4">
          <div className="text-black text-sm font-medium">
            Qual o tamanho da sua residência?
          </div>
          <Select>
            <SelectTrigger className="w-[190px] border-gray-300">
              <SelectValue placeholder="Selecione o tamanho" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tamanho</SelectLabel>
                <SelectItem value="pequeno">Pequena</SelectItem>
                <SelectItem value="media">Média</SelectItem>
                <SelectItem value="grande">Grande</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="cursor-pointer bg-background-secondary text-primary-foreground hover:bg-primary-foreground hover:text-primary w-[155px]"
            onClick={prevStep}
          >
            Voltar
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer bg-background-secondary text-primary-foreground hover:bg-primary-foreground hover:text-primary w-[155px]"
          >
            Finalizar
          </Button>
        </div>
      </form>
    </div>
  );
}
