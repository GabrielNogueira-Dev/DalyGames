import Container from "@/components/container";

import Image from "next/image";
import UserImg from '../../../public/user.png'
import Link from "next/link";
import { FaShareAlt } from "react-icons/fa";
import { Favorite } from "./components/favorite";


export default function Profile(){
    
    return(
        <main className="w-full text-black">
            <Container>
             <section className="mt-8 mb-6 flex flex-col items-center justify-between relative gap-3 sm:flex-row">
               
                <div className="w-full flex items-center gap-4 text-lg flex-col sm:flex-row sm:justify-normal">
                <Image src={UserImg}
                alt="User"
                className="rounded-full object-cover w-56 h-56"
                />
                <h1 className="font-bold text-2xl">Fulano da Silva</h1>
                </div>

                <div className= "absolute sm:absolute top-0 right-0 gap-3 flex justify-center items-center">
                <button className="bg-gray-700 px-4 py-3 rounded-lg text-white">
                    configurações
                </button>
                <button className="bg-gray-700 px-4 py-3 rounded-lg">
                    <FaShareAlt size={24} color="#fff"/>
                </button>
                </div>

             </section>

                <section className="flex flex-wrap gap-5 flex-col md:flex-row">
                    <div className="flex-grow flex-wrap"> 
                        <Favorite/>
                    </div>

                     <div className="flex-grow flex-wrap">
                        <Favorite/>
                    </div>

                     <div className="flex-grow flex-wrap">
                        <Favorite/>
                    </div>
                </section>

            </Container>
        </main>
    )
}