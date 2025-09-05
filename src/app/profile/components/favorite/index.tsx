"use client"

import { FiEdit, FiX } from "react-icons/fi";
import { useState } from "react";


export function Favorite(){
    const [input, setInput] = useState("")
    const [showInput, setShowInput] = useState(false)
    const [games, setGame] = useState<string[]> ([]) 

    function handleButton(){
        setShowInput(!showInput)

       
        setInput("")
    }

      function handleAddGame() {
        if (input.trim() !== "") {
            setGame(prev => [...prev, input]) // spread operator
            setInput("")
            
        }
    }

    return(
        
        <div className="w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex flex-col flex-justify-between ">
         
         {showInput ?(
            <div className="flex items-center justify-center gap-3">
                <input className="text-black bg-gray-200 rounded-md h-8 w-full px-2 outline-none"
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 type="text"
                  onKeyDown={e => {//com enter adiciona sem clicar no button
                 if (e.key === "Enter") {
                    handleAddGame();
                    }}}
                 />
                 <button onClick={handleButton}>
                    <FiX className="cursor-pointer" size={24} color="#fff"/>
                 </button>
            </div>
         ):(
              <button onClick={handleButton}
              className=" self-start hover:scale-110 transition-all duration-300"
              >
            <FiEdit className="cursor-pointer" size={24} color="#fff"/>
           </button>
         )}
            
          
              <div className="mt-5 flex items-center justify-between">
                <span>Jogos Favoritos:</span>
                <button onClick={handleAddGame} >
                    <p className="font-bold text-white cursor-pointer">Adicionar jogo</p>
                </button>
            </div >

           <div className=" flex flex-wrap gap-2 mt-2">
             {games.map((game, index) => (
                    <strong key={index} className="cursor-pointer hover:scale-105 duration-300 bg-gray-200  text-gray-900 p-1 rounded-md text-sm">{game}</strong>      
            ))}
           </div>
         

        </div>

    )
}