import Container from "@/components/container"
import { GameProps } from "@/utils/types/games"
import { redirect } from "next/navigation"
import Image from "next/image"
import { Label } from "./components/label"
import { GameCard } from "@/components/gamecard"
import { Metadata } from "next"

interface PropsParams {
  params: {id:string;}
}

export async function generateMetadata({params}:PropsParams):Promise<Metadata>{
   const resolvedParams =  params
     try{
        const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${resolvedParams.id}`,{next: {revalidate: 20}})
        const data : GameProps = await response.json()
        return{title:`${data.title} ` ,
                description: `${data.description.slice(0,100)}...`,
            openGraph:{
                title: data.title,
                images : [data.image_url],
            } }

    }catch(err){
        return{title:'Daly Games', description: 'Encontrei seus jogos aqui!'}
    } 
}

async function GetData(id:string){
     try{
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`)
        return res.json()
    }catch(err){
        throw Error('Failed to Fetch data')
    } 
}

async function GetGamesSorted(){
         try{
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, {cache: "no-store"})
        return res.json()
    }catch(err){
        throw Error('Failed to Fetch data')
    } 
}

export default async function Game( props: { params:  {id:string}}){
    const {id} =  props.params

const data : GameProps = await GetData(id)
const sortedgame : GameProps = await GetGamesSorted()

if(!data){
    redirect('/')
}

    return(
        <main className="w-full mt-2 text-black">
        <div className="bg-black h-80 sm:h-96 relative">
            <Image
            className="object-cover w-full h-80 sm:h-96 opacity-70 hover:opacity-60"
            src={data.image_url}
            alt={data.title}
            priority={true}
            fill={true}
            sizes="(max-width:768px) 100vw, (max-width:1200px) 44vw"
            quality={100}
            />
        </div>
        <Container>
            <h1 className="font-bold text-xl my-4">{data.title}</h1>
            <p>{data.description}</p>

              <h2 className="font-bold text-lg mt-7 mb-2">Onde encontrar</h2>
            <div className="flex flex-wrap gap-3">
             {data.platforms.map((item)=> (
                <Label data={item} key={item} />// data é para puxar o nome que foi feito na interface do componens/Label
             ))}
            </div>

            <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
            <div className="flex flex-wrap gap-3">
             {data.categories.map((item)=> (
                <Label data={item} key={item} />// data é para puxar o nome que foi feito na interface do componens/Label
             ))}
            </div>

               <p className="mt-7 mb-2"> <strong>Data de lançamento: {data.release}</strong></p>

                <h2 className="font-bold text-lg mt-7 mb-5">Jogo recomendado</h2>
                <div>
                    <GameCard data={sortedgame}/>

                 
                </div>
        </Container>
        </main>
    )
}