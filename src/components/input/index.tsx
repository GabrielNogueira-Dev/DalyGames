"use client"

import { FormEvent, useState } from "react"
import { BsSearch } from "react-icons/bs"
import { useRouter } from "next/navigation"

export function Input({initialValue = ""}: {initialValue?: string}){
    const [input, setInput] = useState(initialValue)
    const router = useRouter()

function HandleSearch(e:FormEvent){
e.preventDefault()

if(input === "") return;

router.push(`/game/search/${input}`)

}

    return(
        <form onSubmit={HandleSearch}
        className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2"
        >
            <input
            className="bg-slate-200 outline-none w-11/12"
            type="text"
            placeholder="Procurar jogos..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
        <button type="submit">
            <BsSearch size={24} color="#ea580c"/>
        </button>
        </form>
    )
}