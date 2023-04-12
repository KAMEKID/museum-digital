import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet, Image, TouchableOpacity, Linking } from "react-native";
import Axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

export default function DetailMuseum({ route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const { itemId } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    Axios.get(`http://10.0.2.2:5000/api/museums/${itemId}`)
      .then(({ data }) => {
        console.log("DetailMuseum -> data", data);
        setData(data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading || !data) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={{ height: 40, width: 40 }}
            source={require("../assets/back.png")}
          />
        </TouchableOpacity>
        <Text style={styles.nama}>{data.nama}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(data.map)}>
          <Image
            style={{ height: 35, width: 35 }}
            source={require("../assets/map.png")}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.detailContainer}>
        <Image
          style={[styles.image, styles.shadowProp]}
          source={{ uri: data.image }}
        />
        <Text style={styles.deskripsi}>{data.deskripsi}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingTop: 60,
    width: "100%",
    height: 124,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "white",
  },
  image: {
    width: 345,
    height: 472,
    borderRadius: 17,
    alignSelf: "center",
  },
  detailContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  nama: {
    width: 236,
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
  },
  deskripsi: {
    marginTop: 15,
    marginBottom: 10,
    paddingBottom:20,
    fontSize: 16,
    lineHeight: 20,
    textAlign: "justify",
  },
});
