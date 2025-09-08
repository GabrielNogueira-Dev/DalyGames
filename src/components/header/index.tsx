"use client"
import logoImg from '../../../public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'


import {LiaGamepadSolid} from 'react-icons/lia'

import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {

  const {data: session,status} = useSession()
  
return(
        <header className="w-full h-28  bg-slate-200 text-black px-2 ">
        <div className="max-w-screen-xl mx-auto flex justify-center items-center h-28 sm:justify-between">
            <nav className='flex justify-center items-center gap-4'>
                <Link href={'/'}>
                <Image src={logoImg}
                alt="Logo da Daly Games"  
                  quality={100}
                  priority={true}
                  className='max-w-full'
                />
                </Link>
                   
              <Link href={'/'}>
              Games
              </Link>

             {session && (
              <Link href={'/profile'}>
              Perfil
              </Link>
             )}
            </nav>

                <div className='font-bold gap-2 hidden sm:flex justify-center items-center'>
                {session ? (
                  < div className='flex gap-1 '> 
                  <span className='text-black'>Olá</span> <p className='text-orange-600 capitalize'>{session.user?.name}</p>
                  
                  <button className='cursor-pointer ml-2'
                  key={session.expires} onClick={ () => signOut() }> Sair </button>
                  </div>
                ): (
                  <button className='cursor-pointer'
                  onClick={ () => signIn("google") }> {status === "loading" ? (
 <span className="flex items-center gap-1">
                  
                     {"Aguarde".split("").map((letter, idx) => (
                      <span
                        key={idx}
                        className="inline-block animate-bounce"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        {letter}
                      </span>
                    ))}
                           
                  <span className="block w-1 h-1 bg-black rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                  <span className="block w-1 h-1 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="block w-1 h-1 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </span>
  ) : (
    'Entrar'
  )} </button>
                )}
                
                <LiaGamepadSolid className='ml-2' size={32} color="#475569"/>
                
                </div>
        </div>
    </header>
)
}