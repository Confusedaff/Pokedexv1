import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon{
  name:string;
  image:string;
  imageBack:string;
  types:PokemonType[];
}

interface PokemonType{
  type:{
    name:string;
    url:string;
  }
}

const colorsByType = {
  normal: "#C8BFAE",   // oat / bread
  fire:   "#FF8C42",   // roasted orange
  water:  "#4FA3D1",   // fresh blueberry
  grass:  "#6DBE45",   // leafy green
  electric:"#FFD43B",  // lemon zest
  ice:    "#8FD3E8",   // mint ice
  fighting:"#D64545",  // red chili
  poison: "#9B5DE5",   // grape candy
  ground: "#D2A679",   // toasted wheat
  flying: "#A5C9F5",   // sky cream
  psychic:"#FF6FB1",   // strawberry milk
  bug:    "#8BCF6A",   // apple peel
  rock:   "#B89B7A",   // baked stone bread
  ghost:  "#7B6AAE",   // blueberry dusk
  dragon: "#5A6EFF",   // berry punch
  dark:   "#5A4B3B",   // dark chocolate
  steel:  "#9FB3C8",   // brushed silver
  fairy:  "#F7A9C4"    // cotton candy
};

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
          types:details.types
        };
      })
    );
    setPokemons(detailedPokemons);
    }catch(e){
      console.log(e);
    }
  }

  return (
   <ScrollView
   contentContainerStyle={{
    gap:16,
    padding:16,
   }}
   >
    {pokemons.map((pokemon)=>(
      <Link key = {pokemon.name}
      href = {"/details"}
      style = {{
        // @ts-ignore
        backgroundColor:colorsByType[pokemon.types[0].type.name] + 60,
        padding:20,
        borderRadius:20,
      }}
      >
      <View>
        <Text style = {styles.name}>{pokemon.name}</Text>
        <Text style = {styles.type}>{pokemon.types[0].type.name}</Text>
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
      </Link>
    ))}
   </ScrollView>
  );
}

const styles = StyleSheet.create({
  name:{
    fontSize: 28,
    fontWeight: 'bold',
    textAlign:'center',
  },
  type:{
    fontSize: 20,
    fontWeight: 'bold',
    color:'gray',
    textAlign:'center',
  }
})