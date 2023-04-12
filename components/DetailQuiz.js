import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  FlatList,
  View,
  RefreshControl,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import Axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadioButton } from "react-native-paper";

export default function DetailQuiz() {
  const [isLoading, setLoading] = useState(true);
  const route = useRoute();
  const { categoryId, answer, currentPage} = route.params;
  const [soal, setSoal] = useState({});
  const [data, setData] = useState([]);
  const [dataa, setDataa] = useState({});
  const [checked, setChecked] = useState("");
  const [dataJumlahSoal, setDataJumlahSoal] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

 useEffect(() => {
   Axios.get(`http://10.0.2.2:5000/api/quizzes/category/${categoryId}`)
     .then((response) => {
       const { data } = response.data;
       setData(data);
       setSoal(data[currentPage]);
       //console.log(answer);
       //console.log(data.length);
     })
     .catch((error) => console.error(error))
     .finally(() => setLoading(false));

   Axios.get("http://10.0.2.2:5000/api/categorys/")
     .then((response) => {
       const { data } = response.data;
       console.log("defaultApp -> data", data);
       setDataa(data[categoryId - 1]);
     })
     .catch((error) => console.error(error))
     .finally(() => setLoading(false));
 },[]);

  const onRefresh = () => {
    setRefreshing(true);
    Axios.get(`http://10.0.2.2:5000/api/quizzes/category/${categoryId}`)
      .then((response) => {
        const { data } = response.data;
        setData(data);
        setSoal(data[currentPage]);
        //console.log(answer);
        //console.log(data.length);
      })
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false));

    Axios.get("http://10.0.2.2:5000/api/categorys/")
      .then((response) => {
        const { data } = response.data;
        console.log("defaultApp -> data", data);
        setDataa(data[categoryId - 1]);
      })
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false));
 }

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            alignSelf: "center",
            marginTop: 5,
            color: "black",
          }}
        >
          {dataa.nama}
        </Text>
        <View>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              marginBottom: 20,
              justifyContent: "flex-end",
              alignItems: "center",
              paddingEnd: 20,
              paddingStart: 20,
            }}
          >
            {currentPage == data.length - 1 ? (
              <TouchableOpacity
                onPress={() => {
                  answer[soal.id] = checked;
                  navigation.replace("hasil", {
                    answer: answer,
                    categoryId: categoryId,
                  });
                }}
                style={{
                  width: 80,
                  height: 40,
                  backgroundColor: "#3DB842",
                  borderRadius: 10,
                  justifyContent: "center",
                  marginEnd: 7,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: "center",
                    alignSelf: "center",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  FINISH
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ marginEnd: 10 }}
                onPress={() => {
                  answer[soal.id] = checked;
                  navigation.replace("DetailQuiz", {
                    categoryId: categoryId,
                    currentPage: currentPage + 1,
                    answer: answer,
                  });
                }}
              >
                <Image
                  style={{ height: 40, width: 40 }}
                  source={require("../assets/nextt.png")}
                />
              </TouchableOpacity>
            )}
          </View>
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
              {soal.quiz}
            </Text>
          </View>
          <View style={[styles.shadowProp, styles.number_head]}>
            <Text
              style={{ fontSize: 24, alignSelf: "center", fontWeight: "bold" }}
            >
              {currentPage + 1}/{data.length}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 340, marginStart: 20, paddingEnd: 20 }}>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <RadioButton
              value="a"
              status={checked === "a" ? "checked" : "unchecked"}
              onPress={() => setChecked("a")}
              color="black"
            />
            <Text style={styles.soal}>{soal.a}</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <RadioButton
              value="b"
              status={checked === "b" ? "checked" : "unchecked"}
              onPress={() => setChecked("b")}
              color="black"
            />
            <Text style={styles.soal}>{soal.b}</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <RadioButton
              value="c"
              status={checked === "c" ? "checked" : "unchecked"}
              onPress={() => setChecked("c")}
              color="black"
            />
            <Text style={styles.soal}>{soal.c}</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <RadioButton
              value="d"
              status={checked === "d" ? "checked" : "unchecked"}
              onPress={() => setChecked("d")}
              color="black"
            />
            <Text style={styles.soal}>{soal.d}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  soal: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
