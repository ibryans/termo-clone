"use client"

import { Keyboard } from "@/components/keyboard";
import { Navbar } from "@/components/navbar";
import { useEffect, useState } from "react";

export default function Home() {

  const RIGHT_LETTER_WRONG_POSITION = 'bg-yellow-500'
  const RIGHT_LETTER_RIGHT_POSITION = 'bg-emerald-500'
  const WRONG_LETTER = 'bg-stone-600'

  const [attempt, setAttempt] = useState(0)
  const [word, setWord] = useState('')
  const [attemptWord, setAttemptWord] = useState(Array(5).fill(''))
  const apiUrl = 'https://random-word-api.herokuapp.com/word?length=5'

  async function getWord() {
    const response = await fetch(apiUrl)
    const word = await response.json()
    setWord(word[0])
  }

  function changeInput(att: number, input: number, inputText: any) {
    const nextInput = inputText == '' ? input-1 : input+1
    document.getElementById(
      `attempt-${attempt}-input-${nextInput}`
    )?.focus();
    setAttemptWord((prev) => {
      prev[input] = inputText
      return prev;
    })
  }

  function verifyLetter(letter: string, idx: number) {
    if (!word.includes(letter))
      return WRONG_LETTER;

    if (word.indexOf(letter) == idx)
      return RIGHT_LETTER_RIGHT_POSITION;
    else
      return RIGHT_LETTER_WRONG_POSITION;
  }

  function submit() {
    attemptWord.forEach((letter,idx) => {
      const color = verifyLetter(letter,idx)
      console.log(color)
      document.getElementById(
        `attempt-${attempt}-input-${idx}`
      )?.classList.add(color)
    })
    setAttempt(attempt + 1)
  }

  useEffect(() => {
    getWord();
  }, [])

  return (
    <div className="container mx-auto flex flex-col justify-between items-center h-[100vh]">
      <Navbar/>

      <h1 className="bg-white font-xl p-5 text-black text-center w-100 rounded mt-5 uppercase">
        { word }
      </h1>

      {/* Tentativas */}
      <main className="flex flex-col items-center p-24">
        { Array.from(Array(6).keys()).map((att) => 
          <div key={att} className="flex flex-row gap-x-2 mb-4">
            { Array.from(Array(5).keys()).map((input) =>
              <input
                onChange={(e) => changeInput(att, input, e.target.value)}
                id={`attempt-${att}-input-${input}`} 
                key={`attempt-${att}-input-${input}`}
                disabled={att != attempt} 
                type="text" 
                className="rounded border-2 w-10 h-10 uppercase text-black text-center transition duration-500 delay-300"  
                maxLength={1}
              />
            )}
          </div>
        )}
      </main>

      <Keyboard submit={submit}/>
    </div>
  );
}
