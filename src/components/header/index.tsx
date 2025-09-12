'use client'

import logoImg from '../../../public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { LiaGamepadSolid } from 'react-icons/lia'
import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from 'react'

export default function Header() {
  const { data: session, status } = useSession()
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignIn = async () => {
    setIsSigningIn(true)
    await signIn("google")
    setIsSigningIn(false)
  }

  return (
    <header className="w-full bg-slate-200 text-black px-4 py-2">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center h-20">
        {/* Logo + Links */}
        <nav className="flex items-center gap-4">
          <Link href="/">
            <Image
              src={logoImg}
              alt="Logo da Daly Games"
              quality={100}
              priority={true}
              className="max-w-full w-32"
            />
          </Link>

          <div className="hidden sm:flex gap-4 items-center">
            <Link href="/">Games</Link>
            {session && <Link href="/profile">Perfil</Link>}
          </div>
        </nav>

        {/* Botão hambúrguer */}
        <button
          className="sm:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menu"
        >
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Área de login/deslogar */}
        <div className="hidden sm:flex font-bold gap-2 items-center">
          {session ? (
            <div className="flex gap-1 items-center">
              <span>Olá</span>
              <p className="text-orange-600 capitalize">{session.user?.name}</p>
              <button className="ml-2" onClick={() => signOut()}>Sair</button>
            </div>
          ) : (
            <button onClick={handleSignIn}>
              {status === "loading" ? (
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
              )}
            </button>
          )}
          <LiaGamepadSolid className="ml-2" size={32} color="#475569" />
        </div>
      </div>

      {/* Menu mobile */}
        {session && (
        <div className="sm:hidden text-center font-bold text-orange-600 mt-1 mb-2 capitalize">
          Olá {session.user?.name}
        </div>
      )}
{isMenuOpen && (
  <div className="sm:hidden flex flex-col items-center mt-2 bg-slate-100 p-4 rounded shadow">
    {/* Links */}
    <div className="flex flex-col items-center gap-2 mb-2">
      {!session && <Link href="/">Games</Link>} {/* Só aparece se não estiver logado */}
      {session && <Link href="/profile">Perfil</Link>}
    </div>

    {/* Linha divisória */}
    <hr className="w-full border-t border-slate-300 my-2" />

    {/* Autenticação */}
    <div className="flex flex-col items-center gap-2">
      {session ? (
        <button onClick={() => signOut()}>Sair</button>
      ) : (
        <button onClick={handleSignIn}>Entrar</button>
      )}
    </div>
  </div>
)}

    </header>
  )
}
