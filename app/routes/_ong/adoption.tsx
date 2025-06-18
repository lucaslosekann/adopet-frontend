import { getPetsOng } from "~/lib/api";
import Header from "../../components/Header";
import ManagedAdoptionsTable from "~/components/tables/ManageAdoption";

export default function Pets() {
    return (
        <div>
            <Header />
            <div className="container mx-auto">
                <ManagedAdoptionsTable />
            </div>
        </div>
    );
}
