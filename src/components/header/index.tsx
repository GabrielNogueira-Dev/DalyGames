"use client"
import logoImg from '../../../public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'


import {LiaGamepadSolid} from 'react-icons/lia'

import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {

  const {data: session} = useSession()
  
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
                  onClick={ () => signIn("google") }> Entrar </button>
                )}
                <Link href={'/profile'}>
                <LiaGamepadSolid size={32} color="#475569"/>
                </Link>
                </div>
        </div>
    </header>
)
}