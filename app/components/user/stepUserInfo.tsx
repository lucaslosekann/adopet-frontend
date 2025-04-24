import React from "react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { maskCEP, maskCPF, maskPhone, maskStreetNumber } from "~/lib/masks";

export default function StepUserInfo({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) {
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [streetNum, setStreeNum] = useState("");
  const [cep, setCEP] = useState("");
  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskCPF(e.target.value);
    setCpf(masked);
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskPhone(e.target.value);
    setPhone(masked);
  };
  const handleStreetNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskStreetNumber(e.target.value);
    setStreeNum(masked);
  };
  const handleCEP = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskCEP(e.target.value);
    setCEP(masked);
  };
  return (
    <div className="bg-white w-[400px] h-[500px] rounded-lg shadow-gray-700 shadow-2xl">
      <h1 className="text-background-secondary font-secondary tracking-wide text-center text-2xl py-8">
        Informações pessoais
      </h1>
      <form className="flex flex-col items-center gap-10">
        <div className="flex flex-col gap-4">
          <div className="w-[320px]">
            <Input
              className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                    transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="CPF"
              value={cpf}
              onChange={handleCPFChange}
            />
          </div>
          <div className="w-[320px]">
            <Input
              className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                    transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              value={phone}
              placeholder="Telefone"
              onChange={handlePhoneChange}
            />
          </div>
          <div className="w-[320px]">
            <Input
              className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                        transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              value={cep}
              onChange={handleCEP}
              placeholder="CEP"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[170px]">
              <Input
                className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                        transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Cidade"
              />
            </div>
            <div className="w-[142px]">
              <Input
                className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                        transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="País"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[170px]">
              <Input
                className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                        transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Rua"
              />
            </div>
            <div className="w-[142px]">
              <Input
                className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                        transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                value={streetNum}
                onChange={handleStreetNumberChange}
                placeholder="Número"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[170px]">
              <Input
                className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                        transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Complemento"
              />
            </div>
            <div className="w-[142px]">
              <Input
                className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                        transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Bairro"
              />
            </div>
          </div>
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
            onClick={nextStep}
          >
            Próximo
          </Button>
        </div>
      </form>
    </div>
  );
}
