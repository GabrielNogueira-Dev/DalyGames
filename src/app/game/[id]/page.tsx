import Container from "@/components/container"
import { GameProps } from "@/utils/types/games"
import { redirect } from "next/navigation"
import Image from "next/image"
import { Label } from "./components/label"


async function GetData(id:string){
     try{
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`)
        return res.json()
    }catch(err){
        throw Error('Failed to Fetch data')
    } 
}

export default async function Game({
params : {id}
}:{
    params: {id:string}
}){
    
const data : GameProps = await GetData(id)

if(!data){
    redirect('/')
}

    return(
        <main className="w-full mt-2 text-black">
        <div className="bg-black w-full h-80 sm:h-96 relative">
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
        </Container>
        </main>
    )
}