import Container from "@/components/container";
import { GameProps } from "@/utils/types/games";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Label } from "./components/label";
import { GameCard } from "@/components/gamecard";
import { Metadata } from "next";

// Metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`, { next: { revalidate: 20 } });
    const data: GameProps = await res.json();

    return {
      title: data.title,
      description: data.description.slice(0, 100) + "...",
      openGraph: {
        title: data.title,
        images: [data.image_url],
      },
    };
  } catch {
    return { title: "Daly Games", description: "Encontrei seus jogos aqui!" };
  }
}

// Funções auxiliares
async function GetData(id: string) {
  const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

async function GetGamesSorted() {
  const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

// Página principal
export default async function Game({ params }: { params: { id: string } }) {
  const { id } = params;

  const data: GameProps = await GetData(id);
  if (!data) redirect("/");

  const sortedGamesData = await GetGamesSorted();
  const sortedGames: GameProps[] = Array.isArray(sortedGamesData) ? sortedGamesData : sortedGamesData?.games || [];

  return (
    <main className="w-full mt-2 text-black">
      <div className="bg-black h-80 sm:h-96 relative">
        <Image
          className="object-cover w-full h-80 sm:h-96 opacity-70 hover:opacity-60"
          src={data.image_url}
          alt={data.title}
          priority
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 44vw"
          quality={100}
        />
      </div>

      <Container>
        <h1 className="font-bold text-xl my-4">{data.title}</h1>
        <p>{data.description}</p>

        <h2 className="font-bold text-lg mt-7 mb-2">Onde encontrar</h2>
        <div className="flex flex-wrap gap-3">
          {data.platforms.map((item) => (
            <Label data={item} key={item} />
          ))}
        </div>

        <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
        <div className="flex flex-wrap gap-3">
          {data.categories.map((item) => (
            <Label data={item} key={item} />
          ))}
        </div>

        <p className="mt-7 mb-2">
          <strong>Data de lançamento: {data.release}</strong>
        </p>

        <h2 className="font-bold text-lg mt-7 mb-5">Jogos recomendados</h2>
        <div className="flex flex-wrap gap-4">
          {sortedGames.map((game) => (
            <GameCard key={game.id} data={game} />
          ))}
        </div>
      </Container>
    </main>
  );
}
