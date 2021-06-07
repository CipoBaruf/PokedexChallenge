import React from 'react'

export default function Home({pokemon}) {
    return (
        <div className="bg-green-200 hover:bg-green-50 rounded-full w-48 h-48 flex flex-col justify-center items-center border-gray-500 border-4">
            <img src={pokemon.image} alt="" className="w-32 h-32"/>
            <p className="text-lg">{pokemon.name}</p>
        </div>
    )
}
