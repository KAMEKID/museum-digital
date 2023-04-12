import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";
import Axios from "axios";
import { ListItem, SearchBar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { color } from "react-native-elements/dist/helpers";

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const arrayholder = [];

  useEffect(() => {
    Axios.get("http://10.0.2.2:5000/api/categorys/")
      .then(({ data }) => {
        console.log("defaultApp -> data", data.data);
        setData(data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    Axios.get("http://10.0.2.2:5000/api/categorys/")
      .then(({ data }) => {
        console.log("defaultApp -> data", data.data);
        setData(data.data);
        setFilterData(data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false));
  };

  const navigation = useNavigation();
  const onPress = (id) => {
    navigation.replace("DetailQuiz", {
      answer: {},
      categoryId: id,
      currentPage: 0,
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50, paddingHorizontal: 17 }}></View>
      <FlatList
        data={data}
        keyExtractor={(item) => [item.id]}
        renderItem={({ item }) => {
          console.log("item", item);
          return (
            <View
              style={{
                height: 180,
                alignItems: "center",
                marginTop: 85,
              }}
            >
              <TouchableHighlight
                style={{
                  borderRadius: 17,
                  width: 343,
                  height: 170,
                }}
                onPress={() => onPress(item.id)}
              >
                <View style={{ flex: 1, backgroundColor: "white" }}>
                  <View
                    style={{
                      shadowColor: "#171717",
                      shadowOffset: { width: 0, height: 5 },
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                      elevation: 5,
                      backgroundColor: item.color,
                      alignItems: "baseline",
                      borderRadius: 20,
                      paddingBottom: 10,
                      width: 343,
                      height: 170,
                    }}
                  >
                    <View style={styles.textBox}>
                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          marginTop: 55,
                          marginStart: 5,
                        }}
                        source={require("../assets/play.png")}
                      />
                      <Text style={styles.practice}>Practice</Text>
                      <Text style={styles.heading}>{item.nama}</Text>
                    </View>
                  </View>
                  <Image
                    style={styles.imagestyle}
                    source={require("../assets/quiz.png")}
                  />
                </View>
              </TouchableHighlight>
            </View>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imagestyle: {
    alignSelf: "flex-end",
    marginTop: -240,
    marginEnd: 40,
    width: 132,
    height: 133,
  },
  separato: {
    height: 15,
  },
  practice: {
    color: "white",
    marginTop: 5,
    marginStart: 5,
    fontSize: 20,
  },
  heading: {
    fontWeight: "bold",
    color: "white",
    marginStart: 5,
    fontSize: 24,
  },
  textBox: {
    paddingStart: 15,
    paddingEnd: 8,
  },
});
