import { ActivityIndicator, FlatList, Image, Text, View } from "react-native"
import { styles } from "../theme/appTheme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { usePokemonPaginated } from "../hooks/usePokemonPaginated"
import { PokemonCard } from "../components/PokemonCard"

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets()
  const { isLoading, pokemonList, fetchPokemon }= usePokemonPaginated()
  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={ styles.pokeballBG }
      />
      <View
        style={{
          alignItems: 'center'
        }}
      >  
        <FlatList
          data={ pokemonList}
          keyExtractor={( pokemon ) => pokemon.id}
          showsVerticalScrollIndicator={ false }
          numColumns={ 2 }
          renderItem={ ({ item }) => (
            <PokemonCard pokemon={ item }/>
          )}

          onEndReached={ fetchPokemon }
          onEndReachedThreshold={ 0.4 }
          ListHeaderComponent={(
            <Text style={{
              ...styles.title,
              ...styles.globalMargin,
              top: top + 20,
              marginBottom: top + 20,
              paddingBottom: 10,
            }}>Pokedex</Text>
          )}

          ListFooterComponent={(
            <ActivityIndicator
              style={{ height: 100 }}
              size={ 20 }
              color="grey"
            />
          )}
        />
      </View>
    </>
  )
}
