import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";


const Score = ({ navigation, route }) => {
  const { answer, categoryId } = route.params;
  const [message, setMessage] = useState("");
  const quiz = () => {
    navigation.replace("Quiz");
  };
  const ulangi = () => {
    navigation.replace("DetailQuiz", { currentPage: 0, answer: {}, categoryId:categoryId });
  };

  useEffect(() => {
    axios
      .post("http://10.0.2.2:5000/api/jobsheet/many", {
        quizId: Object.keys(answer),
        answer: Object.values(answer),
      })
      .then((response) => {
        const { message } = response.data;
        setMessage(message);
        // console.log(message)
        // setData(data);
      })
      .catch((error) => {
        console.log(error);
        // console.log(answer)
      });
  });

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        paddingBottom: 400,
      }}
    >
      <View
        style={{
          backgroundColor: "#CF3939",
          width: 343,
          height: 343,
          borderRadius: 20,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            width: 234,
            flexWrap: "wrap",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 24,
            color: "white",
          }}
        >
          {message}
        </Text>
        <View style={{ justifyContent: "space-between", flexDirection:"row", width:270, position:"absolute", alignSelf:"auto" }}>
          <TouchableOpacity style={{ width: 100, height:50, backgroundColor:"#FF0000", justifyContent:"center", alignSelf:"flex-start", marginTop:220, borderRadius:10 }}
          onPress={ulangi}>
            <Text style={{ alignSelf: "center", textAlign: "center", fontWeight: "bold", color:"white", fontSize:16 }}>
              Ulangi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 100, height:50, backgroundColor:"#3DB842", justifyContent:"center", alignSelf:"flex-end", marginTop:220, borderRadius:10 }}
          onPress={quiz}>
            <Text style={{ alignSelf: "center", textAlign: "center", fontWeight: "bold", color:"white", fontSize:16 }}>
              Selesai
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.shadowProp, styles.number_head]}>
        <Text style={{ fontSize: 24, alignSelf: "center", fontWeight: "bold" }}>
          Hasil
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Score;

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
  card: {
    alignItems: "center",
    backgroundColor: "#A5A02D",
    borderRadius: 20,
    paddingBottom: 10,
    width: 343,
    height: 170,
  },
  number_head: {
    backgroundColor: "white",
    height: 77,
    width: 128,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: -380,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "white",
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
    paddingBottom: 20,
    fontSize: 16,
    lineHeight: 20,
    textAlign: "justify",
  },
});