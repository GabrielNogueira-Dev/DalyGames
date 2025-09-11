import Container from "@/components/container";
import { GameCard } from "@/components/gamecard";
import { Input } from "@/components/input";
import { GameProps } from "@/utils/types/games";

async function getData(title: string) {
  try {
    const decodedTitle = decodeURI(title);
    // PARA NÃO APARECER O CÓDIGO %20 QUANDO ESCREVE O NOME COM ESPAÇO
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api?api=games&title=${decodedTitle}`, {
      next: { revalidate: 20 },
    });
    return res.json();
  } catch (err) {
    return null;
  }
}

export default async function Search({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const resolvedParams = await params;
  const title = resolvedParams.title;

  const games: GameProps[] = (await getData(decodeURI(title))) || [];

  const filterGames = games?.filter((item) =>
    item.title.toLocaleLowerCase().includes(decodeURI(title).toLocaleLowerCase())
  );

  return (
    <main className="w-full text-black">
      <Container>
        <Input initialValue={decodeURI(title)} />

        <h1 className="font-bold text-xl mt-8 mb-5">Veja o que temos em nossa biblioteca:</h1>
        {!filterGames || filterGames.length === 0 ? (
          <p>Jogo não encontrado.</p>
        ) : (
          <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filterGames.map((item) => (
              <GameCard key={item.id} data={item} />
            ))}
          </section>
        )}
      </Container>
    </main>
  );
}
