import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { constructPetImageUrl, getOng, getPet } from "../../lib/api";
import Header from "../../components/Header";
import { DateTime } from "luxon";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../components/ui/carousel";
import { cn } from "../../lib/utils";

export default function adoption_profile() {
    const { petId } = useParams();
    const PetQuery = useQuery({
        queryKey: ["pet", petId],
        queryFn: () => getPet(petId as string),
        enabled: !!petId,
    });

    const ongId = PetQuery.data?.ongId;
    const OngQuery = useQuery({
        queryKey: ["ong", ongId],
        queryFn: () => getOng(ongId as string),
        enabled: !!ongId,
    });

    console.log(PetQuery.data);

    if (!PetQuery.data) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div
                className={cn(
                    "container mx-auto flex-1 flex flex-col mt-10 pb-8",
                    !PetQuery.data.PetImage.length && "h-full justify-center",
                )}
            >
                <h1 className="font-secondary text-background-secondary text-6xl">{PetQuery.data.formerName}</h1>

                <div className="flex flex-col md:flex-row gap-10 mt-10 items-start">
                    <div className="flex flex-col justify-center w-full md:w-[40%] gap-20">
                        <div className="">
                            <Carousel
                                opts={{
                                    align: "center",
                                    loop: false,
                                }}
                            >
                                <CarouselContent>
                                    {PetQuery.data.PetImage.length > 0 ? (
                                        PetQuery.data.PetImage.map((image) => (
                                            <CarouselItem key={image.id} className="basis-1/1 flex justify-center">
                                                <img
                                                    src={constructPetImageUrl(PetQuery.data.id, image.id)}
                                                    alt={PetQuery.data.formerName}
                                                    className="object-cover w-full rounded-xl"
                                                />
                                            </CarouselItem>
                                        ))
                                    ) : (
                                        <CarouselItem className="basis-1/1 flex justify-center">
                                            <img
                                                src="/default-fallback-image.png"
                                                alt="Sem imagem disponível"
                                                className="object-contain w-full rounded-xl"
                                            />
                                        </CarouselItem>
                                    )}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                        <div className="transform transition-transform duration-300 hover:scale-103">
                            <Link
                                className="bg-background-secondary text-white font-secondary text-6xl px-8 py-8 cursor-pointer rounded-xl shadow-md hover:shadow-lg"
                                to="/documents-adoption"
                                state={{ petId: PetQuery.data.id, petName: PetQuery.data.formerName }}
                            >
                                ADOTAR {PetQuery.data.formerName}
                            </Link>
                        </div>
                    </div>
                    <div className="w-full h-[520px] md:w-[60%] bg-white shadow-xl mx-10 p-6 rounded-xl text-background-secondary font-bold space-y-2">
                        <div>
                            <p>Espécie</p>
                            <p className="text-black font-medium">
                                {PetQuery.data.specieName ? PetQuery.data.specieName : "N/A"}
                            </p>
                        </div>
                        <div>
                            <p>Raça</p>
                            <p className="text-black font-medium">{PetQuery.data.breedName}</p>
                        </div>
                        <div>
                            <p>Idade</p>
                            <p className="text-black font-medium">
                                {" "}
                                {Math.floor(
                                    Math.abs(DateTime.fromISO(PetQuery.data.dateOfBirth).diffNow("years").years),
                                )}{" "}
                                anos
                            </p>
                        </div>
                        <div>
                            <p>Porte</p>
                            <p className="text-black font-medium">
                                {(() => {
                                    switch (PetQuery.data.size) {
                                        case "small":
                                            return "Pequeno";
                                        case "medium":
                                            return "Médio";
                                        case "large":
                                            return "Grande";
                                        default:
                                            return PetQuery.data.size;
                                    }
                                })()}
                            </p>
                        </div>
                        <div>
                            <p>Peso</p>
                            <p className="text-black font-medium">
                                {PetQuery.data.weight ? PetQuery.data.weight + " kg" : "N/A"}
                            </p>
                        </div>
                        <div>
                            <p>Castrado</p>
                            <p className="text-black font-medium">{PetQuery.data.castrated ? "Sim" : "Não"}</p>
                        </div>
                        <div>
                            <p>Localidade</p>
                            <p className="text-black font-medium">
                                {PetQuery.data.address.city} - {PetQuery.data.address.uf}
                            </p>
                        </div>
                        <div>
                            <p>ONG Responsável</p>
                            <Link to={`/ong/${OngQuery.data?.id}`}>
                                <p className="text-black font-medium">
                                    <u>{OngQuery.data?.name}</u>
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
