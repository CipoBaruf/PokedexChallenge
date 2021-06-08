import React from 'react'

export default function Home({pokemon}) {
    return (
        <div className="bg-gray-200 hover:bg-green-50 rounded-full m-1 w-32 h-32 md:w-48 md:h-48 flex flex-col justify-center items-center border-gray-500 border-4">
            <img src={pokemon.image} alt="" className="h-24 w-24 md:w-32 md:h-32"/>
            <p className="text-sm md:text-lg mb-4">{pokemon.name}</p>
        </div>
    )
}
