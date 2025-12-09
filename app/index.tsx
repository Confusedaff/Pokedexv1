import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

interface Pokemon{
  name:string;
  image:string;
  imageBack:string;
}

export default function Index() {
  const [pokemons,setPokemons] = useState<Pokemon[]>([]);
  useEffect(() => {
    fetchPokemon();
  },[]);

  async function fetchPokemon() {
    try{
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=100"
      );
      const data = await response.json();

      const detailedPokemons = await Promise.all(
      data.results.map(async (pokemon:any) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();
        return {
          name: pokemon.name,
          image: details.sprites.front_default,
          imageBack: details.sprites.back_default,
        };
      })
    );
    setPokemons(detailedPokemons);
    }catch(e){
      console.log(e);
    }
  }

  return (
   <ScrollView>
    {pokemons.map((pokemon)=>(
      <View key = {pokemon.name}>
        <Text>{pokemon.name}</Text>
        <View style = {{
          flexDirection:"row"
        }}>
          <Image
            source = {{uri:pokemon.image}}
            style = {{height:150,width:150}}
          />
          <Image
            source = {{uri:pokemon.imageBack}}
            style = {{height:150,width:150}}
          />
        </View>
      </View>
    ))}
   </ScrollView>
  );
}