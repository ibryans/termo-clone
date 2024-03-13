"use client"

import { Keyboard } from "@/components/keyboard";
import { Navbar } from "@/components/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [attempt, setAttempt] = useState(0)
  const [word, setWord] = useState('')
  const apiUrl = 'https://random-word-api.herokuapp.com/word?length=5'

  async function getWord() {
    const response = await fetch(apiUrl)
    const word = await response.json()
    setWord(word[0])
  }

  useEffect(() => {
    getWord();
  }, [])

  return (
    <div className="container mx-auto flex flex-col justify-between items-center h-[100vh]">
      {/* Barra superior */}
      <Navbar/>

      <h1 className="bg-white font-xl p-5 text-black text-center w-100 rounded mt-5 uppercase">
        { word }
      </h1>

      {/* Tentativas */}
      <main className="flex flex-col items-center p-24">
        { Array.from(Array(6).keys()).map((option, idx) => 
          <div key={idx} className="flex flex-row gap-x-2 mb-4">
            <input disabled={idx != attempt} type="text" className="rounded border-2 w-10 h-10 uppercase text-black text-center" maxLength={1}/>
            <input disabled={idx != attempt} type="text" className="rounded border-2 w-10 h-10 uppercase text-black text-center" maxLength={1}/>
            <input disabled={idx != attempt} type="text" className="rounded border-2 w-10 h-10 uppercase text-black text-center" maxLength={1}/>
            <input disabled={idx != attempt} type="text" className="rounded border-2 w-10 h-10 uppercase text-black text-center" maxLength={1}/>
            <input disabled={idx != attempt} type="text" className="rounded border-2 w-10 h-10 uppercase text-black text-center" maxLength={1}/>
          </div>
        )}
      </main>

      {/* Teclado */}
      <Keyboard/>
    </div>
  );
}
