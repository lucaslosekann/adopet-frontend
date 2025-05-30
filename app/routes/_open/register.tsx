import React, { useState, useEffect } from "react";
import StepUserAccount from "../../components/user/StepUserAccount";
import StepUserInfo from "~/components/user/StepUserInfo";
import StepPetRelatedInfo from "~/components/user/StepPetRelatedInfo";
import StepONGAccount from "~/components/ong/StepONGAccount";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

export default function Register() {
  const { isAuthenticated, user, loading } = useAuthContext();
  const [stepIndex, setStepIndex] = useState(0);
  const nextStep = () => setStepIndex((prev) => prev + 1);
  const prevStep = () => setStepIndex((prev) => prev - 1);
  const userSteps = [
    <StepUserAccount nextStep={nextStep} />,
    <StepUserInfo nextStep={nextStep} prevStep={prevStep} />,
    <StepPetRelatedInfo prevStep={prevStep} />,
  ];
  useEffect(() => {
    const json = sessionStorage.getItem("user-signup-state");
    if (!json) {
      return;
    }
    const existingData = JSON.parse(json);
    if (existingData?.step1) {
      if (existingData?.step2) {
        if (!existingData?.step1 && !existingData?.step2) {
          setStepIndex(0);
        }
        setStepIndex(2);
      } else {
        setStepIndex(1);
      }
    }
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/");
    }
  }, [isAuthenticated, loading]);

  return (
    <div className="bg-background-secondary w-screen h-screen flex justify-center items-center">
      <div>
        {loading ? (
          <img src="/tube-spinner.svg" alt="Spinner" className="w-15" />
        ) : (
          <>
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
                <TabsTrigger
                  value="user"
                  className="w-[198px] text-background-secondary"
                >
                  Adotante
                </TabsTrigger>
                <TabsTrigger
                  value="ong"
                  className="w-[198px] text-background-secondary"
                >
                  ONG
                </TabsTrigger>
              </TabsList>
              <TabsContent value="user">{userSteps[stepIndex]}</TabsContent>
              <TabsContent value="ong">
                <StepONGAccount />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}
