import { useEffect, useState } from "react"

import { PokemonData } from "../interfaces/pokemonInterfaces";
import { pokemonApi } from "../api/pokemonApi";

export const usePokemon = (id: string) => {

    const [isLoading, setIsLoading] = useState(true);
    const [pokemon, setPokemon] = useState<PokemonData>({} as PokemonData);

    const loadPokemon = async () => {
        const resp = await pokemonApi.get<PokemonData>(`https://pokeapi.co/api/v2/pokemon/${ id }`);
        setPokemon( resp.data );
        setIsLoading( false );
    };

    useEffect(() => {
        loadPokemon();
    }, []);

  return {
    isLoading,
    pokemon
  }
}
