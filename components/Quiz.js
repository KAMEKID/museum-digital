import * as React from 'react';
import {View, Text} from 'react-native';

export default function Quiz({ navigation }) {
  return (
    <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
      <Text
        onPress={() => alert('This is the "Quiz Screen"')}
        style={{fontSize:26, fontWeight:'bold'}}>Quiz Screen</Text>
    </View>
  )
}