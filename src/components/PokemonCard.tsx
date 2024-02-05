import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SimplePokemon } from '../interfaces/pokemonInterfaces'
import { FadeInImage } from './FadeInImage'
import { getColors } from 'react-native-image-colors'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../navigator/Navigator'

interface Props {
    pokemon: SimplePokemon,
}

const windowWidth = Dimensions.get('window').width;

export const PokemonCard = ({ pokemon }: Props) => {
    const [colorBg, setColorBg] = useState('grey')
    const isMounted = useRef(true)
    const { navigate } = useNavigation<StackNavigationProp<RootStackParams>>()

    useEffect(() => {
        const fetchColors = async() => {
            const result = await getColors( pokemon.imageUrl, { fallback: '#808080' })
            switch (result.platform) {
                case 'android':
                    setColorBg( result.dominant || '#808080' )
                    break;
                case 'ios':
                    setColorBg( result.background || '#808080' )
                    break;
            }
        }
        isMounted.current ? fetchColors() : null

        return () => {
            isMounted.current = false
        }
    }, [])

    const { id, imageUrl, name, color} = pokemon;
    return (
        <TouchableOpacity
            activeOpacity={ 0.9 }
            onPress={ () => navigate('PokemonScreen', {
                simplePokemon: pokemon,
                color: color
            })}
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
        marginHorizontal: 10,
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
