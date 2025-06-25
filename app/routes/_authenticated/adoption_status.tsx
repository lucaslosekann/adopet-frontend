import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate, redirect } from "react-router";
import DocAnalysis from "./doc_analysis";
import ApprovedAdoption from "./approved_adoption";
import RejectedAdoption from "./rejected_adoption";

export default function AdoptionStatus() {
    const { user } = useAuthContext();

    if (!user.Adoption?.length) {
        return <Navigate to="/" />;
    }

    if (user.Adoption[0].status === "PENDING") {
        return <DocAnalysis />;
    } else if (user.Adoption[0].status === "APPROVED") {
        return <ApprovedAdoption />;
    } else {
        return <RejectedAdoption />;
    }
}
