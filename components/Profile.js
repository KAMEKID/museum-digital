import * as React from 'react';
import {View, Text} from 'react-native';

export default function Profile({ navigation }) {
  return (
    <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
      <Text
        onPress={() => alert('This is the "Profile Screen"')}
        style={{fontSize:26, fontWeight:'bold'}}>Profile Screen</Text>
    </View>
  )
}