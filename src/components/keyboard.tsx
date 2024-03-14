import { FaBackspace } from 'react-icons/fa'

export function Keyboard({ submit, selectKey }: any) {

    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', <FaBackspace key={'backspace'}/>],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER']
    ]

    return (
        <footer className=''>
            { keys.map((line, idx) => 
                <div key={idx} className="flex flex-row gap-x-2 mb-3 justify-center items-center">
                    { line.map((key,idx) =>
                        <button
                            onClick={() => key == 'ENTER' ? submit() : selectKey(key)}
                            key={idx} 
                            className="outline outline-1 p-2 text-center rounded hover:bg-slate-500 transition">
                            { key }
                        </button>
                    )}
                </div>
            )}
        </footer>
    );
}