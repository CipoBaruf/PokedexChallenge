/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import { getPokemon, getPokemonStats, getPokemonData } from '../API.js'

import ImageCarrousel from '../components/ImagesCarousel.jsx';

export default function Pokemon(props) {

    const [loading, setLoading] = useState(false);

    const [languageOption, setLanguageOption] = useState(localStorage.getItem('language') ? localStorage.getItem('language') : 'es');

    const [pokemonImages, setPokemonImages] = useState()

    const [pokemonData, setPokemonData] = useState({
        pokeName: '',
        color: '',
        generation: '',
        weight: 0,
        height: 0,

    })

    const { idPokemon } = useParams();

    useEffect(() => {
        setLoading(true);
        getPokemonStats(idPokemon).then((response) => {
            response.data.names.forEach((names) => {
                if (names.language.name === languageOption) {
                    setPokemonData(prevState => ({
                        ...prevState,
                        pokeName: names.name.charAt(0).toUpperCase() + names.name.slice(1),
                    }))
                }
            })
            getPokemon(response.data.color.url).then((color) => {
                setPokemonData(prevState => ({
                    ...prevState,
                    color: `bg-${color.data.names[5].name.toLowerCase()}-400`,
                }));
            })
            getPokemon(response.data.generation.url).then((generation) => {
                generation.data.names.forEach((generationName) => {
                    if (generationName.language.name === languageOption) {
                        setPokemonData(prevState => ({
                            ...prevState,
                            generation: generationName.name
                        }));
                    }
                })
            })
        })
        getPokemonData(idPokemon).then((info) => {
            setPokemonImages(info.data.sprites);
            setPokemonData(prevState => ({
                ...prevState,
                height: info.data.height,
                weight: info.data.weight,
            }));
        })
        setLoading(false);

    }, [languageOption, idPokemon]);

    return (
        <>
            {!loading ?
                <div className={`p-8 ${pokemonData.color} bg-opacity-25 h-screen w-screen`}>
                    <div className="absolute">
                        <select className={`${pokemonData.color} md:text-xl`} value={languageOption} onChange={(e) => { setLanguageOption(e.target.value); localStorage.setItem('language', e.target.value) }}>
                            <option value="es">Spanish</option>
                            <option value="en">English</option>
                            <option value="fr">French</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center justify-center h-full -mt-20">
                        <div className="bg-white absolute z-0 h-40 w-80 md:h-64 md:w-3/12 mt-40 md:mt-44 rounded-xl border-gray-200 border-4"></div>
                        <ImageCarrousel images={pokemonImages} color={pokemonData.color} />
                        <p className="z-50 md:mt-6 text-xl md:text-4xl text-center font-semibold tracking-wider text-gray-700">{pokemonData.pokeName}</p>
                        <div className="flex justify-center space-x-8 items-center z-50 mt-2 md:mt-4">
                            <div className="flex flex-col justify-cener items-center">
                                <h3 className="text-md md:text-xl tracking-wider font-semibold text-gray-800">Height</h3>
                                <p className="text-sm md:text-lg text-gray-700">{pokemonData.height}</p>
                            </div>
                            <div className="flex flex-col justify-cener items-center">
                                <h3 className="text-md md:text-xl tracking-wider font-semibold text-gray-800">Weight</h3>
                                <p className="text-sm md:text-lg text-gray-700">{pokemonData.weight}</p>
                            </div>
                            <div className="flex flex-col justify-cener items-center">
                                <h3 className="text-md md:text-xl tracking-wider font-semibold text-gray-800">Generation</h3>
                                <p className="text-sm md:text-lg text-gray-700">{pokemonData.generation}</p>
                            </div>
                        </div>
                    </div>
                    <Link to={'/'} className="absolute bottom-6">
                        Back
                    </Link>
                </div>
                :
                <p>Loading</p>
            }
        </>
    );
}
