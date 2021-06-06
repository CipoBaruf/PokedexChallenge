import React, { useEffect, useState } from 'react';

import { getPokemons, getPokemon } from '../API.js'

export default function Home() {

    const [pokemons, setPokemons] = useState([]);

    const [newCall, setNewCall] = useState('');

    const [prevNext, setPrevNext] = useState({ prev: '', next: '' })

    const [loading, setLoading] = useState(false);

    const [languageOption, setLanguageOption] = useState('es');

    useEffect(() => {
        setLoading(true);
        setPokemons([])
        getPokemons(newCall).then((response) => {
            response.data.results.forEach((result) => {
                getPokemon(result.url).then((res)=>{
                    console.log(res);
                    res.data.names.forEach((names)=>{
                        if(names.language.name === languageOption){
                            setPokemons(old =>[...old, names.name ])
                        }
                    })
                })
            })
            setPrevNext({
                prev: response.data.previous,
                next: response.data.next,
            })
            setLoading(false);
        }
        )
    }, [languageOption, newCall])

    return (
        <div className="p-4">
            <div className="flex items-cener justify-end">
                <select value={languageOption} onChange={(e) => setLanguageOption(e.target.value)}>
                    <option value="es">Spanish</option>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </select>
            </div>
            <div className="h-48">
                {!loading && pokemons ? pokemons.map((pokemon, index) =>
                    <h1 key={index}>{pokemon}</h1>
                )
                    :
                    <p>Loading</p>
                }
            </div>
            <div className="flex items-center justify-center space-x-5">
                <button disabled={prevNext.prev === null} onClick={() => setNewCall(prevNext.prev)} className="btn">Previous</button>
                <button disabled={prevNext.next === null} onClick={() => setNewCall(prevNext.next)} className="btn">Next</button>
            </div>
        </div>
    );
}
