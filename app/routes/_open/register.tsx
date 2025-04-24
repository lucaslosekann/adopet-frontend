import React, { use, useCallback, useState } from "react";
import StepUserAccount from "../../components/user/stepUserAccount";
import StepUserInfo from "~/components/user/stepUserInfo";
import StepPetRelatedInfo from "~/components/user/stepPetRelatedInfo";
import StepONGAccount from "~/components/ong/stepONGAccount";
import StepONGInfo from "~/components/ong/stepONGInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Register() {
  // alterar aqui depois
  const { register, isAuthenticated, user, loading } = useAuthContext();
  const [userType, setUserType] = useState<"user" | "ong" | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const nextStep = () => setStepIndex((prev) => prev + 1);
  const prevStep = () => setStepIndex((prev) => prev - 1);
  const userSteps = [
    <StepUserAccount nextStep={nextStep} />,
    <StepUserInfo nextStep={nextStep} prevStep={prevStep} />,
    <StepPetRelatedInfo prevStep={prevStep} />,
  ];
  const ongSteps = [
    <StepONGAccount nextStep={nextStep} />,
    <StepONGInfo prevStep={prevStep} />,
  ];
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    register(
      data.get("name") as string,
      data.get("email") as string,
      data.get("password") as string
    );
  }, []);
  return (
    <div className="bg-background-secondary w-screen h-screen flex justify-center items-center">
      <div>
        {loading && <p>Carregando...</p>}
        {isAuthenticated && <p>Você está logado como {user?.email}</p>}
        <img
          src="/logo.svg"
          alt="logo"
          className="absolute top-4 left-4 w-50"
        />
        <Tabs
          defaultValue="user"
          className="max-w-[396px] flex items-center"
          onValueChange={() => setStepIndex(0)}
        >
          <TabsList className="bg-gray-200">
            <TabsTrigger value="user" className="w-[198px]">
              Adotante
            </TabsTrigger>
            <TabsTrigger value="ong" className="w-[198px]">
              ONG
            </TabsTrigger>
          </TabsList>
          <TabsContent value="user">{userSteps[stepIndex]}</TabsContent>
          <TabsContent value="ong">{ongSteps[stepIndex]}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
