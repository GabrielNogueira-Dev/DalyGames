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
    if (sessionStatus === "unauthenticated" || !session?.user?.email!) {
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
                        {session && <Favorite/>}
                    </div>
                </section>

            </Container>
        </main>
    )
}