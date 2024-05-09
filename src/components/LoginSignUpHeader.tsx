import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignLoginHeader = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView  style={{marginTop:10}}>
      <View
        style={{ justifyContent: "space-between", flexDirection:'row' }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Image style={{height:35, width:35}} source={require("../assets/images/Back.png")}/>
        </TouchableOpacity>

        <View >
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 132, height: 34 }}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={{ fontSize: 17, color: "black", fontWeight: '500' }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignLoginHeader;