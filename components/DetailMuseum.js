import * as React from 'react';
import {View, Text} from 'react-native';

const data = [
  {
    id: "1",
    title: "Museum\nBank Rakyat Indonesia",
    loc: "Purwokerto, Banyumas",
    image: "https://www.museumindonesia.com/img_editor/BRI_museum.jpg",
  },
  {
    id: "2",
    title: "Museum\nPanglima Besar TNI Jenderal Soedirman",
    loc: "Purwokerto, Banyumas",
    image:
      "https://visitjawatengah.jatengprov.go.id/assets/images/540833da-23fd-44db-86c3-d12ca2b6b9d4.jpg",
  },
  {
    id: "3",
    title: "Museum\nWayang Banyumas",
    loc: "Sudagaran, Banyumas",
    image:
      "https://dmm0a91a1r04e.cloudfront.net/dOVASH2DoexpjHW4z9gKKUm4WG8=/1024x683/https%3A%2F%2Fkompas.id%2Fwp-content%2Fuploads%2F2021%2F05%2F90af9453-6308-476a-a9f9-bdbb3ae99e09_jpg.jpg",
  },
  {
    id: "4",
    title: "Museum\nProf. Dr. R. Soegarda Poerbakawatja",
    loc: "Purbalingga, Banyumas",
    image:
      "https://visitjawatengah.jatengprov.go.id/assets/images/e759f10a-bb35-42ec-aaf8-59d9a4abaf04.jpg",
  },
];

export default function DetailMuseum({ route }) {

  const navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    const showBottomBar = params ? !params.hideBottomBar : true;
    return {
      tabBarVisible: showBottomBar,
    };
  };

  const itemId = route.params.itemId;

  const itemData = data.find((item) => item.id === itemId);

  return (
    <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
      <Text
        onPress={() => alert('This is the "Detail Screen"')}
        style={{fontSize:26, fontWeight:'bold'}}>{itemData.title}</Text>
    </View>
  )
}