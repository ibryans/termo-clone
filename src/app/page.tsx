import { Navbar } from "@/components/navbar";
import Image from "next/image";

export default function Home() {

  var tryNumber: number = 0;

  return (
    <div className="container mx-auto">
      {/* Barra superior */}
      <Navbar/>

      {/* Tentativas */}
      <main className="flex flex-col items-center p-24">
        { Array.from(Array(6).keys()).map((option, idx) => 
          <div className="flex flex-row gap-x-2 mb-4">
            <input disabled={idx != tryNumber} type="text" className="rounded border-2 w-10 h-10 uppercase text-black text-center" maxLength={1}/>
            <input disabled={idx != tryNumber} type="text" className="rounded border-2 w-10 h-10 uppercase text-black text-center" maxLength={1}/>
            <input disabled={idx != tryNumber} type="text" className="rounded border-2 w-10 h-10 uppercase text-black text-center" maxLength={1}/>
            <input disabled={idx != tryNumber} type="text" className="rounded border-2 w-10 h-10 uppercase text-black text-center" maxLength={1}/>
            <input disabled={idx != tryNumber} type="text" className="rounded border-2 w-10 h-10 uppercase text-black text-center" maxLength={1}/>
          </div>
        )}
      </main>

      {/* Teclado */}
      <footer>

      </footer>
    </div>
  );
}
