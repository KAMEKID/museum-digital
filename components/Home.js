import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Switch,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ListItem, SearchBar } from "react-native-elements";
import filter from "lodash.filter";

const Item = ({ nama, alamat, image, id }) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("DetailMuseum", { itemId : id });
  };
  return (
    <TouchableHighlight
      style={{ borderRadius: 17, width: 152, height: 209, marginVertical: 10 }}
      onPress={onPress}
    >
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={[styles.card, styles.shadowProp]}>
          <Image style={styles.imagestyle} source={{ uri: image }} />
          <View style={styles.textBox}>
            <Text style={styles.heading}>{nama}</Text>
            <Text style={styles.loc}>{alamat}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      searchValue: "",
    };
    this.arrayholder = this.getData();
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch("http://127.0.0.1:5000/api/museums/", {method: 'GET'})
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
        console.log(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {
      const item_data = `${item.nama.toUpperCase()} ${item.alamat.toUpperCase()}`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    this.setState({ data: updatedData, searchValue: text });
  };

  render() {
    const renderItem = ({ item }) => {
      return (
        <Item
          nama={item.nama}
          alamat={item.alamat}
          image={item.image}
          id={item.id}
          navigation={item.navigation}
        />
      );
    };
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 50, paddingHorizontal: 7 }}>
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
            <TouchableOpacity onPress>
              <Image
                style={{ height: 45, width: 45 }}
                source={require("../assets/darkmode.png")}
              />
            </TouchableOpacity>
          </View>
          <SearchBar
            placeholder="Search "
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
            value={this.state.searchValue}
            onChangeText={(text) => this.searchFunction(text)}
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
        <FlatList
          paddingHorizontal={15}
          data={this.state.data}
          renderItem={renderItem}
          horizontal={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          numColumns={2}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
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
