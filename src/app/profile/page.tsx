"use client"

import Container from "@/components/container";

import Image from "next/image";
import UserImg from '../../../public/user.png'
import { FaShareAlt } from "react-icons/fa";
import { Favorite } from "./components/favorite";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile(){
    const {data:session, status:sessionStatus} = useSession()
    const router = useRouter()

    useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/"); // redireciona para home
    }
  }, [session, router]);

    if(sessionStatus == "loading"){
        return(
            <div className="w-full h-screen flex justify-center items-center text-black">
                <span className="text-lg">Carregando...</span>
            </div>
        )

    }  

    return(
        <main className="w-full text-black">
            <Container>
             <section className="bg-orange-300 p-4 rounded-md mt-8 mb-6 flex flex-col items-center justify-between relative gap-3 sm:flex-row">
               
                <div className="w-full flex items-center gap-4 text-lg flex-col sm:flex-row sm:justify-normal">
                <Image 
                    src={session?.user?.image || UserImg}
                    alt="User"
                    width={180}
                    height={180}
                    sizes="(max-width: 768px) 100px, 150px"
                    blurDataURL="/user-placeholder.png"
                    className="hover:rotate-y-180 duration-1000 rounded-full object-cover"
                    priority={true}
                    quality={100}
                />
                <h1 className="bg-white p-2 rounded-xl font-bold text-2xl capitalize">{session?.user?.name}</h1>
                
                </div>

                <div className= "absolute sm:absolute top-1 right-1 gap-3 flex justify-center items-center">
                <button className="cursor-pointer bg-white px-3 py-2 rounded-lg text-black font-bold">
                    configurações
                </button>
                <button className="cursor-pointer bg-white px-3 py-2 rounded-lg">
                    <FaShareAlt size={24} color="black"/>
                </button>
                </div>

             </section>

                <section className="flex flex-wrap gap-5 flex-col md:flex-row">
                    <div className="flex-grow flex-wrap"> 
                        {session && <Favorite/>}
                    </div>
                </section>

            </Container>
        </main>
    )
}