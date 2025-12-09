import { Stack, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const colorsByType = {
  normal: "#C8BFAE",
  fire: "#FF8C42",
  water: "#4FA3D1",
  grass: "#6DBE45",
  electric: "#FFD43B",
  ice: "#8FD3E8",
  fighting: "#D64545",
  poison: "#9B5DE5",
  ground: "#D2A679",
  flying: "#A5C9F5",
  psychic: "#FF6FB1",
  bug: "#8BCF6A",
  rock: "#B89B7A",
  ghost: "#7B6AAE",
  dragon: "#5A6EFF",
  dark: "#5A4B3B",
  steel: "#9FB3C8",
  fairy: "#F7A9C4",
};

export default function Details() {
  const params = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          title: params.name as string,
        }}
      />

      <ScrollView>
        <View
          style={{
            width: "80%",
            height:"80%",
            padding:5,
            top:20,
            alignSelf:"center",
            alignItems: "center",
            paddingVertical: 10,
            backgroundColor:
              colorsByType[
                params.type as keyof typeof colorsByType
              ] + 60,
              borderRadius:50,
          }}
        >
          <Image
            source={{ uri: params.image as string }}
            style={{ height: 300, width: 300 }}
            resizeMode="contain"
          />
        </View>
        <Text style = {styles.details}>
            {params.details}
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  details:{
    fontSize: 13,
    top:20,
    padding:10,
    textAlign:'center',
  },
})