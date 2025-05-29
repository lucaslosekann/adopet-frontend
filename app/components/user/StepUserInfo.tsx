import React from "react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  maskCEP,
  maskCPF,
  maskPhone,
  maskStreetNumber,
  maskUF,
} from "~/lib/masks";

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
  const [uf, setUF] = useState("");
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
  const handleUF = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskUF(e.target.value);
    setUF(masked);
  };
  return (
    <div className="bg-white w-[400px] h-[500px] rounded-lg shadow-gray-700 shadow-2xl">
      <h1 className="text-background-secondary font-secondary tracking-wide text-center text-2xl py-8">
        Informações pessoais
      </h1>
      <form
        className="flex flex-col items-center gap-10"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const json = sessionStorage.getItem("user-signup-state");
          if (!json) {
            return;
          }
          const existingData = JSON.parse(json);
          if (!existingData?.step1) {
            return;
          }

          const step2Data = {
            taxId: cpf.replace(/\D/g, ""),
            phoneNumber: phone.replace(/\D/g, ""),
            address: {
              street: data.get("street"),
              number: streetNum,
              complement: data.get("complement"),
              neighborhood: data.get("neighborhood"),
              city: data.get("city"),
              uf: uf,
              postalCode: cep.replace(/\D/g, ""),
            },
          };
          sessionStorage.setItem(
            "user-signup-state",
            JSON.stringify({
              ...existingData,
              step2: step2Data,
            })
          );
          nextStep();
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="w-[320px]">
            <Input
              className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                    transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              name="cpf"
              placeholder="CPF"
              value={cpf}
              onChange={handleCPFChange}
              required
            />
          </div>
          <div className="w-[320px]">
            <Input
              className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                    transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              name="phoneNumber"
              value={phone}
              placeholder="Telefone"
              onChange={handlePhoneChange}
              required
            />
          </div>
          <div className="w-[320px]">
            <Input
              className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                        transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              name="cep"
              value={cep}
              onChange={handleCEP}
              placeholder="CEP"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[170px]">
              <Input
                className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                        transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                name="city"
                placeholder="Cidade"
                required
              />
            </div>
            <div className="w-[142px]">
              <Input
                className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                        transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                name="uf"
                placeholder="UF"
                value={uf}
                onChange={handleUF}
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[170px]">
              <Input
                className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                        transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                name="street"
                placeholder="Rua"
                required
              />
            </div>
            <div className="w-[142px]">
              <Input
                className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                        transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                name="streetNum"
                value={streetNum}
                onChange={handleStreetNumberChange}
                placeholder="Número"
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[170px]">
              <Input
                className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                        transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                name="complement"
                placeholder="Complemento"
                required
              />
            </div>
            <div className="w-[142px]">
              <Input
                className="w-full bg-transparent placeholder:text-gray-600 text-slate-700 text-sm border border-gray-300 rounded-md px-3 py-2 
                        transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                name="neighborhood"
                placeholder="Bairro"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="cursor-pointer bg-background-secondary text-primary-foreground hover:bg-primary-foreground hover:text-primary w-[155px]"
            onClick={prevStep}
            type="button"
          >
            Voltar
          </Button>
          <Button
            type="submit"
            variant="outline"
            className="cursor-pointer bg-background-secondary text-primary-foreground hover:bg-primary-foreground hover:text-primary w-[155px]"
          >
            Próximo
          </Button>
        </div>
      </form>
    </div>
  );
}
