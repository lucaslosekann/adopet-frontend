import { useQuery } from '@tanstack/react-query';

import { Link, useParams } from 'react-router';
import { API_URL, constructPetImageUrl, getPet } from '../../lib/api';
import Header from '../../components/Header';
import { DateTime } from 'luxon';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../components/ui/carousel';
import { cn } from '../../lib/utils';

export default function adoption_profile() {
    const { petId } = useParams();
    const PetQuery = useQuery({
        queryKey: ['pet', petId],
        queryFn: () => getPet(petId as string),
        enabled: !!petId,
    });
    if (!PetQuery.data) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div
                className={cn(
                    'container mx-auto flex-1 flex flex-col mt-10 pb-8',
                    !PetQuery.data.PetImage.length && 'h-full justify-center',
                )}
            >
                <h1 className="font-secondary text-background-secondary text-6xl">{PetQuery.data.formerName}</h1>
                {!!PetQuery.data.PetImage.length && (
                    <div className="mt-4">
                        <Carousel
                            opts={{
                                align: 'center',
                                loop: true,
                            }}
                        >
                            <CarouselContent>
                                {PetQuery.data.PetImage.map((image) => (
                                    <CarouselItem key={image.id} className="basis-1/2 flex justify-center">
                                        <img
                                            src={constructPetImageUrl(PetQuery.data.id, image.id)}
                                            alt={PetQuery.data.formerName}
                                            className="object-cover w-[70%] rounded-xl"
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                )}
                <div className="flex justify-between mt-10 text-background-secondary font-bold">
                    <div>
                        <p>Espécie: {PetQuery.data.speciesName}</p>
                        <p>Raça: {PetQuery.data.breedName}</p>
                        <p>
                            Idade:{' '}
                            {Math.floor(Math.abs(DateTime.fromISO(PetQuery.data.dateOfBirth).diffNow('years').years))}{' '}
                            anos
                        </p>
                        <p>Porte: N/A</p>
                        <p>Castrado: {PetQuery.data.castrated ? 'Sim' : 'Não'}</p>
                        <p>
                            Localidade: {PetQuery.data.address.city} - {PetQuery.data.address.uf}
                        </p>
                    </div>
                    <div>
                        <Link
                            className="bg-background-secondary text-white font-secondary text-6xl px-8 py-8 cursor-pointer rounded-xl"
                            to="/documentos-adocao"
                            state={{ petId: PetQuery.data.id, petName: PetQuery.data.formerName }}
                        >
                            ADOTAR {PetQuery.data.formerName}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
