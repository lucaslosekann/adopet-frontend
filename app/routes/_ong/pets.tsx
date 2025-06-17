import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ManagedPetsTable from '~/components/tables/ManagePets';
import { getPetsOng } from '~/lib/api';
import Header from '../../components/Header';

export default function Pets() {
    return (
        <div>
            <Header />
            <div className="container mx-auto">
                <ManagedPetsTable />
            </div>
        </div>
    );
}
