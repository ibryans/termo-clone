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
  const [completed, setCompleted] = useState(false)
  const [inputOnFocus, setInputOnFocus] = useState(0)


  const apiUrl = 'https://random-word-api.herokuapp.com/word?length=5'

  async function getWord() {
    // const response = await fetch(apiUrl)
    // const word = await response.json()
    // setWord(word[0])
    setWord('braia')
  }

  function changeInput(att: number, input: number, inputText: any) {
    const nextInput = (inputText == '')
      ? (input == 0)
        ? 0 
        : input-1 
      : (input == 4)
        ? 4
        : input+1

    // Foca no próximo input
    if (nextInput < 5)
      document.getElementById(
        `attempt-${attempt}-input-${nextInput}`
      )?.focus();

    // Atualiza a palavra tentada
    setAttemptWord((prev) => {
      prev[input] = inputText
      return prev;
    })

    // Atualiza o input que está em foco
    setInputOnFocus(nextInput)
  }

  function verifyLetter(letter: string, idx: number) {
    if (!word.includes(letter))
      return WRONG_LETTER;

    if (word[idx] == letter)
      return RIGHT_LETTER_RIGHT_POSITION;
    else
      return RIGHT_LETTER_WRONG_POSITION;
  }

  function submit() {
    if (attemptWord.includes('')) {
      console.log('opa, ainda não')
      return;
    }

    var correctLetters = 0;

    attemptWord.forEach((letter,idx) => {
      const color = verifyLetter(letter.toLowerCase(), idx)

      // Conta quantas estarão corretas
      if (color == RIGHT_LETTER_RIGHT_POSITION) 
        correctLetters++;

      // Muda a cor dos inputs baseado na palavra-objetivo
      document.getElementById(
        `attempt-${attempt}-input-${idx}`
      )?.classList.add(color)
    })

    // Se acabou as tentativas ou acertou a palavra, completou o desafio
    // Se não, pula para a próxima tentativa
    if (attempt == 5 || correctLetters == 5) {
      setCompleted(true)
      setAttempt(99)
    } else {
      setAttempt(attempt + 1)
      setAttemptWord(Array(5).fill(''))
      setInputOnFocus(0)
      setTimeout(() => {
        document.getElementById(
          `attempt-${attempt+1}-input-0`
        )?.focus();  
      }, 500);
    }

  }

  function keyPressed(key: any) {
    switch (key) {

      case 'ArrowRight':
        if (inputOnFocus < 4)
          document.getElementById(
            `attempt-${attempt}-input-${inputOnFocus+1}`
          )?.focus();
          setInputOnFocus(inputOnFocus+1)
        break;

      case 'ArrowLeft':
        if (inputOnFocus > 0)
          document.getElementById(
            `attempt-${attempt}-input-${inputOnFocus-1}`
          )?.focus();
          setInputOnFocus(inputOnFocus-1)
        break;

      case 'Enter':
        submit();
        break;
    }
  }

  function selectKey(key: any) {
    const letter = typeof(key) == 'string' ? key : ''

    const input = document.getElementById(
      `attempt-${attempt}-input-${inputOnFocus}`
    ) as HTMLInputElement

    input.value = letter;
    changeInput(attempt, inputOnFocus, letter)  
  }

  useEffect(() => {
    document.getElementById(
      `attempt-0-input-0`
    )?.focus();
    getWord();
  }, [])

  return (
    <div className="container mx-auto flex flex-col justify-between items-center h-[100vh]">
      <Navbar/>

      { completed 
        ? <h1 className="bg-white font-xl p-3 text-black text-center w-100 rounded mt-5 uppercase">
            Palavra do dia: <strong>{ word }</strong>
          </h1>
        : null 
      }

      {/* Tentativas */}
      <main className="flex flex-col items-center p-24">
        { Array.from(Array(6).keys()).map((att) => 
          <form key={att} className="flex flex-row gap-x-2 mb-4">
            { Array.from(Array(5).keys()).map((input) =>
              <input
                onSubmit={() => submit()}
                onChange={(e) => changeInput(att, input, e.target.value)}
                onKeyUp={(e) => keyPressed(e.key)}
                id={`attempt-${att}-input-${input}`} 
                key={`attempt-${att}-input-${input}`}
                disabled={att != attempt} 
                type="text" 
                className="rounded border-2 w-12 h-12 uppercase text-black text-center transition-color duration-500 caret-transparent"  
                maxLength={1}
              />
            )}
          </form>
        )}
      </main>


      <Keyboard 
        submit={submit} 
        selectKey={selectKey} />

    </div>
  );
}
