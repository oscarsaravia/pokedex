import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { PokemonData } from '../interfaces/pokemonInterfaces'
import { StyleSheet } from 'react-native'
import { FadeInImage } from './FadeInImage'
import ProgressCircle from 'react-native-progress-circle'

interface Props {
    pokemon: PokemonData
}

export const PokemonDetails = ({ pokemon }: Props) => {

    const getColorForStat = (statName: string) => {
        switch(statName) {
            case "hp":
                return "#FF0000"; // Rojo
            case "attack":
                return "#FF4500"; // Naranja
            case "defense":
                return "#008000"; // Verde
            case "special-attack":
                return "#0000FF"; // Azul
            case "special-defense":
                return "#9400D3"; // Violeta
            case "speed":
                return "#FFD700"; // Amarillo
            default:
                return "#000000"; // Negro por defecto
        }
    };

    return (
        <ScrollView
        showsVerticalScrollIndicator={ false }
        style={{
            ...StyleSheet.absoluteFillObject,
        }}>
            {/* Types */}
            <View style={{
                ...styles.container,
                marginTop: 370,
            }}>
                <Text style={{...styles.title}}>Types</Text>
                <View style={{ flexDirection: 'row'}}>
                    {
                        pokemon.types.map( (type, index) => (
                            <Text
                                key={ type.type.name }
                                style={{...styles.regularText, marginRight: 10 }}
                            >
                                { type.type.name }
                                { index !== pokemon.types.length - 1 && ', ' }
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* Peso */}
            <View style={{
                ...styles.container,
                marginTop: 20,
            }}>
                <Text style={{...styles.title}}>Weight</Text>
                <Text style={{...styles.regularText}}>{ pokemon.weight }kg</Text>
            </View>

            {/* Sprites */}
            <View style={{
                ...styles.container,
                marginTop: 20,
            }}>
                <Text style={{...styles.title}}>Sprites</Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={ false }
            >
                <FadeInImage
                    uri={ pokemon.sprites.front_default }
                    style={ styles.basicSprite }
                />
                <FadeInImage
                    uri={ pokemon.sprites.back_default }
                    style={ styles.basicSprite }
                />
                <FadeInImage
                    uri={ pokemon.sprites.front_shiny }
                    style={ styles.basicSprite }
                />
                <FadeInImage
                    uri={ pokemon.sprites.back_shiny }
                    style={ styles.basicSprite }
                />
            </ScrollView>

            {/* Abilities */}
            <View style={{
                ...styles.container,
                marginTop: 20,
            }}>
                <Text style={{...styles.title}}>Base Abilities</Text>
                <View style={{ flexDirection: 'row'}}>
                    {
                        pokemon.abilities.map( (ability, index) => (
                            <Text
                                key={ ability.ability.name }
                                style={{...styles.regularText, marginRight: 10 }}
                            >
                                { ability.ability.name }
                                { index !== pokemon.abilities.length - 1 && ', ' }
                            </Text>
                        ))
                    }
                </View>
            </View>
        
            {/* Moves */}
            <View style={{
                ...styles.container,
                marginTop: 20,
            }}>
                <Text style={{...styles.title}}>Moves</Text>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row'}}>
                    {
                        pokemon.moves.map( ({ move }, index) => (
                            <Text
                                key={ move.name }
                                style={{...styles.regularText, marginRight: 10 }}
                            >
                                { move.name }
                                { index !== pokemon.moves.length - 1 && ', ' }
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* Stats */}
            <View style={{
                ...styles.container,
                marginTop: 20,
            }}>
                <Text style={{...styles.title, marginBottom: 20 }}>Stats</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={ false }
                >
                    {
                        pokemon.stats.map( ({ stat, base_stat }) => (
                            <ProgressCircle
                                percent={base_stat}
                                radius={50}
                                borderWidth={8}
                                color = { getColorForStat(stat.name) }
                                shadowColor="#deddd9"
                                bgColor="#fff"
                                outerCircleStyle={{ marginRight: 10 }}
                            >
                                <Text style={{ fontSize: 14 }}>{ stat.name }</Text>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{ base_stat }</Text>
                            </ProgressCircle>
                        ))
                    }
                </ScrollView>
            </View>

            {/* Final Sprite */}
            <View style={{
                ...styles.container,
                marginTop: 20,
                alignItems: 'center',
            }}>
                <FadeInImage
                    uri={ pokemon.sprites.front_default }
                    style={ styles.basicSprite }
                />
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
    },
    regularText: {
        fontSize: 19,
    },
    basicSprite: {
        width: 100,
        height: 100,
    },
});
