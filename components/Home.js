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

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const arrayholder = [];

  useEffect(() => {
    Axios.get("http://10.0.2.2:5000/api/museums/")
      .then(({ data }) => {
        console.log("defaultApp -> data", data.data);
        setData(data.data);
        setFilterData(data.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    Axios.get("http://10.0.2.2:5000/api/museums/")
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
    navigation.navigate("DetailMuseum", { itemId: id });
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = `${item.nama.toUpperCase()} ${item.alamat.toUpperCase()}`;
        const searchTextData = text.toUpperCase();

        return itemData.indexOf(searchTextData) > -1;
      });

      setFilterData(newData);
      setSearchText(text);
    } else {
      setFilterData(data);
      setSearchText(text);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50, paddingHorizontal: 17 }}>
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            marginBottom: 20,
            justifyContent: "space-between",
            alignItems: "center",
            paddingEnd: 10,
          }}
        >
          <Text style={{ fontSize: 36, marginStart: 10 }}>Find a tour</Text>
          {/* <TouchableOpacity onPress>
            <Image
              style={{ height: 45, width: 45 }}
              source={require("../assets/darkmode.png")}
            />
          </TouchableOpacity> */}
        </View>
        <SearchBar
          placeholder="Search"
          value={searchText}
          inputStyle={{ backgroundColor: "white" }}
          containerStyle={{
            backgroundColor: "white",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
          }}
          inputContainerStyle={{
            backgroundColor: "white",
            borderWidth: 1,
            borderBottomWidth: 1,
          }}
          round
          onChangeText={(text) => searchFilterFunction(text)}
          autoCorrect={false}
        />
        <Text
          style={{
            fontSize: 24,
            marginStart: 10,
            marginBottom: 15,
            marginTop: 5,
          }}
        >
          Popular tours
        </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={filterData}
          keyExtractor={(item, index) => {
            // console.log("index", index)
            return index.toString();
          }}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginHorizontal: 30,
          }}
          renderItem={({ item }) => {
            console.log("item", item);
            return (
              <TouchableHighlight
                style={{
                  borderRadius: 17,
                  width: 152,
                  marginVertical: 10,
                }}
                onPress={() => onPress(item.id)}
              >
                <View style={{ flex: 1, backgroundColor: "white" }}>
                  <View style={[styles.card, styles.shadowProp]}>
                    <Image
                      style={styles.imagestyle}
                      source={{ uri: item.image }}
                    />
                    <View style={styles.textBox}>
                      <Text style={styles.heading}>{item.nama}</Text>
                      <Text style={styles.loc}>{item.alamat}</Text>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imagestyle: {
    width: 152,
    height: 121,
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    marginBottom: 10,
  },
  heading: {
    fontSize: 11,
    marginBottom: 5,
  },
  loc: {
    fontSize: 10,
    color: "#696969",
  },
  card: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 17,
    paddingBottom: 10,
    width: 152,
    height: 209,
  },
  textBox: {
    paddingStart: 10,
    paddingEnd: 8,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "white",
  },
});
