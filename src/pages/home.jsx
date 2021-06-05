import React, { useEffect, useState } from 'react';

import { getPokemons } from '../API.js'

export default function Home() {

    const [pokemons, setPokemons] = useState([]);

    const [newCall, setNewCall] = useState('');

    const [prevNext, setPrevNext] = useState({prev: '', next: ''})

    const [loading, setLoading]= useState(false);

    useEffect(() => {
        setLoading(true);
        getPokemons(newCall).then((response) => {
            setPokemons(response.data.results);
            setPrevNext({
                prev: response.data.previous,
                next: response.data.next,
            })
            setLoading(false);
        })
    }, [newCall])

    return (
        <div className="">
            {!loading && pokemons ? pokemons.map((pokemon, index) =>
                <h1 key={index}>{pokemon.name}</h1>
            )
                :
                <p>Loading</p>
            }
            <div className="flex items-center justify-center space-x-5">
                <button disabled={prevNext.prev === null} onClick={() => setNewCall(prevNext.prev)} className="btn">Previous</button>
                <button disabled={prevNext.next === null} onClick={() => setNewCall(prevNext.next)} className="btn">Next</button>
            </div>
        </div>
    );
}
