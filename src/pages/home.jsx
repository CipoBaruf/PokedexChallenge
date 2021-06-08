import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { getPokemons, getPokemon, getPokemonData } from '../API.js'

import PokemonItem from '../components/PokemonItem'

export default function Home() {

    const [pokemons, setPokemons] = useState([{ id: 0, name: '', image: '' }]);

    const [newCall, setNewCall] = useState('');

    const [prevNext, setPrevNext] = useState({ prev: '', next: '' })

    const [loading, setLoading] = useState(false);

    const [languageOption, setLanguageOption] = useState(localStorage.getItem('language') ?  localStorage.getItem('language') : 'es');

    useEffect(() => {
        setLoading(true);
        setPokemons([])
        getPokemons(newCall).then((response) => {
            response.data.results.forEach((result) => {
                getPokemon(result.url).then((res) => {
                    res.data.names.forEach((names) => {
                        if (names.language.name === languageOption) {
                            getPokemonData(res.data.id).then((poke) => {
                                setPokemons(old => [...old, { id: res.data.id, name: names.name, image: poke.data.sprites.front_default }])
                            })
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
        <div className="p-8 h-screen w-screen bg-gray-100">
            <div className="absolute">
                <select value={languageOption} onChange={(e) => {setLanguageOption(e.target.value); localStorage.setItem('language', e.target.value)}}>
                    <option value="es">Spanish</option>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </select>
            </div>
            <div className="flex justify-center items-center flex-col h-full">
                <h1 className="text-lg md:text-4xl mb-4 md:mb-20 font-bold tracking-widest text-gray-700">Pokedex Challenge</h1>
                <div className="flex flex-wrap md:flex-row items-center justify-center">
                    {!loading && pokemons ? pokemons.map((pokemon, index) =>
                        <Link to={`/pokemon/${pokemon.id}`} key={index}>
                            <PokemonItem pokemon={pokemon} />
                        </Link>
                    )
                        :
                        <p>Loading</p>
                    }
                </div>
                <div className="flex items-center justify-center space-x-5 mt-8 md:mt-24">
                    <button disabled={prevNext.prev === null} onClick={() => setNewCall(prevNext.prev)} className="btn">Previous</button>
                    <button disabled={prevNext.next === null} onClick={() => setNewCall(prevNext.next)} className="btn">Next</button>
                </div>
            </div>
        </div>
    );
}
