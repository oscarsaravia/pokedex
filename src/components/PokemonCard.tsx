import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SimplePokemon } from '../interfaces/pokemonInterfaces'
import { FadeInImage } from './FadeInImage'
// import { getColors } from 'react-native-image-colors'

interface Props {
    pokemon: SimplePokemon
}

const windowWidth = Dimensions.get('window').width;

export const PokemonCard = ({ pokemon }: Props) => {
    const [colorBg, setColorBg] = useState('grey')

    // useEffect(() => {
    //     const fetchColors = async() => {
    //         const result = await getColors( pokemon.imageUrl, { fallback: 'grey' })
    //         console.log(`Result: ${ result }`)
    //     }
    //     fetchColors()
    // }, [])

    const { id, imageUrl, name, color} = pokemon;
    return (
        <TouchableOpacity
            activeOpacity={ 0.9 }
        >
            <View style={{
                    ...styles.cardContainer,
                    backgroundColor: colorBg 
            }}>
                <View>
                    <Text style={ styles.name }>{ `${ name }\n#${ id }` }</Text>
                </View>
                <View style={ styles.pokeballContainer }>
                    <Image
                        source={ require('../assets/pokebola-blanca.png')}
                        style={ styles.pokeball }
                    />
                </View>
                <FadeInImage
                    uri={ imageUrl }
                    style={ styles.pokemonImage }
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        height: 120,
        width: windowWidth * 0.4,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokeball: {
        width: 100,
        height: 100,
        opacity: 0.5,
        position: 'absolute',
        right: -20,
        bottom: -20
    },
    pokemonImage: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokeballContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: 0,
        bottom: 0,
        overflow: 'hidden',
    }
})
