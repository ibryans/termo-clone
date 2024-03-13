import { FaQuestion } from 'react-icons/fa';
import { IoIosSettings } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";

export function Navbar() {
    return (
        <header className="p-5 w-[100%] max-w-[700px] mx-auto">
            <div className="flex flex-row justify-between items-center">

                <button className="outline outline-1 rounded-lg hover:bg-slate-500 p-2 transition">
                    <FaQuestion />
                </button>

                <h1 className="text-3xl font-bold pl-8">
                    TERMO
                </h1>

                <div className="flex flex-row gap-x-2">
                    <button className="outline outline-1 rounded-lg hover:bg-slate-500 p-2 transition">
                        <IoStatsChart/>
                    </button>
                    <button className="outline outline-1 rounded-lg hover:bg-slate-500 p-2 transition">
                        <IoIosSettings/>
                    </button>
                </div>

            </div>
        </header>
    );
}