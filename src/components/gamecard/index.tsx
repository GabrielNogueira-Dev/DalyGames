
import Link from "next/link"
import Image from "next/image"
import { BiRightArrowCircle } from "react-icons/bi"
import { GameProps } from "@/utils/types/games"

interface GameCardProps{
    data: GameProps
}

export function GameCard({data}: GameCardProps) {

    return(
      <Link href={`/game/${data.id}`}>
       <section className="w-full bg-slate-200 rounded-lg p-4 mb-5">  
        <div className="w-full relative h-56">
         <Image src={data.image_url} alt={data.title}
            className="object-cover rounded-lg hover:scale-105 hover:opacity-95 transition-all duration-300"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 44vw"
            fill={true}
            quality={100}
           />
        </div>
        
        <div className="flex items-center mt-4 justify-between">
            <p className="text-sm font-bold px-2 text-black line-clamp-1">{data.title}</p>
            <BiRightArrowCircle size={24} color='#2f2f2f'/>
        </div>

        </section>
      </Link>
    )
}