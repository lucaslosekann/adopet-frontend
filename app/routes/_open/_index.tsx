import Header from '~/components/Header';
import { useAuthContext } from '~/contexts/AuthContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel';
import { constructPetImageUrl, getPets, getRecommendedPets } from '~/lib/api';
import { Button } from '~/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';

export default function Home() {
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    const RecommendedPetsQuery = useQuery({
        queryKey: ['recommended-pets'],
        queryFn: getRecommendedPets,
        enabled: isAuthenticated,
    });

    const RetrieveLimitedPets = useQuery({
        queryKey: ['limited-pets'],
        queryFn: () => getPets(10),
        enabled: !isAuthenticated,
    });

    return (
        <div className="min-h-screen max-w-full flex flex-col pb-10">
            <Header />
            <div className="flex flex-row my-5 mx-auto container text-left items-center gap-12">
                <div className="flex flex-col w-1/2">
                    <h1 className="font-secondary text-background-secondary text-6xl">Encontra a sua</h1>
                    <h1 className="font-secondary text-background-secondary text-6xl">nova felicidade!</h1>
                    <h3 className="text-lg font-medium mt-4 text-align">
                        Na <strong>ADOPET</strong>, tornamos o processo de adoção de pets mais fácil, seguro e
                        transparente, conectando adotantes a ONGs de confiança em todo o Brasil. Acreditamos que cada
                        animal merece um lar cheio de carinho, e que cada pessoa merece a chance de encontrar um
                        companheiro leal.
                    </h3>
                    <h3 className="text-lg font-medium mt-4 text-align">
                        Navegue, conheça histórias e encontre aquele pet que vai transformar o seu dia a dia.{' '}
                        <strong>
                            Adotar é um ato de amor, e estamos aqui para garantir que ele aconteça do jeito certo.
                        </strong>
                    </h3>
                    <Link to="/pesquisa">
                        <Button className="text-lg bg-background-secondary my-5 w-30 hover:to-background-terciary">
                            Adotar
                        </Button>
                    </Link>
                </div>

                <div className="w-1/2">
                    <img src="/homeImage.png" alt="pets_image" />
                </div>
            </div>
            {isAuthenticated ? (
                <div className=" w-full max-w-7xl mx-auto my-6">
                    <h2 className="font-secondary text-5xl text-background-secondary text-center mb-10">
                        Pets recomendados para você!
                    </h2>
                    <Carousel opts={{ loop: false }}>
                        <CarouselContent className="flex flex-nowrap">
                            {RecommendedPetsQuery.data?.map((pet, index) => (
                                <CarouselItem
                                    key={index}
                                    className="md:basis-1/2 lg:basis-1/5 px-2 flex justify-center"
                                >
                                    <Link to={`adocao/${pet.id}`}>
                                        <div className="bg-gray-25 shadow-md rounded-xl p-2 flex flex-col items-center">
                                            <img
                                                src={constructPetImageUrl(pet.id, pet.PetImage[0]?.id)}
                                                alt={pet.formerName}
                                                className="h-60 w-full object-cover rounded-lg"
                                                onError={(e) => {
                                                    const target = e.currentTarget;
                                                    target.onerror = null;
                                                    target.src = '/default-fallback-image.png'; //Não esta funcionando
                                                }}
                                            />
                                            <h3 className="mt-4 text-xl font-bold">{pet.formerName}</h3>
                                            <p className="text-gray-600">{pet.breed.name}</p>
                                        </div>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            ) : (
                <div className="w-full max-w-7xl mx-auto my-20">
                    <h2 className="font-secondary text-5xl text-background-secondary text-center mb-10">
                        Pets disponíveis para adoção!
                    </h2>
                    <Carousel opts={{ loop: false }}>
                        <CarouselContent className="flex flex-nowrap">
                            {RetrieveLimitedPets.data?.map((pet, index) => (
                                <CarouselItem
                                    key={index}
                                    className="md:basis-1/2 lg:basis-1/5 px-2 flex justify-center transition-transform duration-300 hover:-translate-y-2"
                                >
                                    <Link to={`adocao/${pet.id}`}>
                                        <div className="bg-gray-25 shadow-md rounded-xl p-2 flex flex-col items-center">
                                            <img
                                                src={constructPetImageUrl(pet.id, pet.PetImage[0]?.id)}
                                                alt={pet.formerName}
                                                className="h-60 w-full object-cover rounded-lg"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/default-fallback-image.png';
                                                }}
                                            />
                                            <h3 className="mt-4 text-xl font-bold">{pet.formerName}</h3>
                                            <p className="text-gray-600">{pet.breedName}</p>
                                        </div>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            )}
            <div className="flex mx-auto my-10">
                <h2 className="text-background-secondary font-secondary text-5xl">🤝 Apoie as ONGs parceiras</h2>
            </div>
            <div className="flex mx-auto my-5 w-200">
                <p className="text-lg text-center">
                    Sua doação vai diretamente para as ONGs cadastradas na ADOPET, ajudando a manter o resgate, cuidado
                    e adoção de animais em todo o Brasil. Contribua para que cada ONG continue salvando vidas e
                    proporcionando um lar cheio de amor para milhares de pets.
                </p>
            </div>
            <div className="flex mx-auto">
                <p className="text-lg text-center">
                    <strong>Seja parte dessa corrente do bem, doe e faça a diferença!</strong>
                </p>
            </div>
            {/* <div className="flex mx-auto my-5">
        <Button className="bg-background-secondary w-50 text-lg">Doar</Button>
      </div> */}
        </div>
    );
}
