import { useEffect, useRef, useState } from "react";

import { pokemonApi } from "../api/pokemonApi";
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {

    const [pokemonList, setPokemonList] = useState<SimplePokemon[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const nextPageUrl = useRef("https://pokeapi.co/api/v2/pokemon?limit=40")

    useEffect(() => {
        fetchPokemon()
    }, [])

    const fetchPokemon = async() => {
        setIsLoading(true)
        const response = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
        nextPageUrl.current = response.data.next;
        mapPokemonList(response.data.results)
    }

    const mapPokemonList = (pokemons: Result[]) => {
        const newPokemonList: SimplePokemon[] = pokemons.map(({ name, url }) => {
            const urlParts = url.split('/')
            const id = urlParts[urlParts.length - 2]
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            return { id, name, imageUrl}
        })

        setPokemonList([ ...pokemonList, ...newPokemonList])
        setIsLoading(false)
    }

    return {
        isLoading,
        pokemonList,
        fetchPokemon
    }
}
