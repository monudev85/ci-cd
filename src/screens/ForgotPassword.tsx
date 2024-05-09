import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    Image,
    FlatList,
    Linking,
} from "react-native";
import SignLoginHeader from "../components/LoginSignUpHeader";

export default function ForgotPassword({navigation}: any) {
 
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                {/* Include your SignLoginHeader component here */}
                <SignLoginHeader  />

<View style={styles.contentContainer}>
<View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.title}>Forgot your password</Text>
                    </View>

    <View style={styles.textInputContainer}>
        <TextInput
            style={styles.textInput1}
            placeholder="Enter Your Knobee I’d, Mobile No."
            placeholderTextColor="gray"
        />
    </View>


    {/* Button Section */}
    <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('otp')
            }}
        >
            <Text style={styles.buttonText}>Fetch accounts</Text>
        </TouchableOpacity>
    </View>

</View>

              
            </SafeAreaView>
        </View>
    );

}


const styles = StyleSheet.create({
    agreementContainer: {
        flexDirection: "row",
        marginTop: 20,
        alignSelf: "flex-start", // Align to the left
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center", // Center items vertically
alignItems:'flex-end',// Center items horizontally
        bottom: '30%' // Adjust marginTop for separation from the agreement text
    },
    button: {
        backgroundColor: "#4591F7",
        padding: 10,
        borderRadius: 24,
        width:'50%'
 // Set the width to half of the screen
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        textAlign: "center", // Center the text within the button
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#4591F7",
        marginBottom: 2,
        marginTop: 3,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    linkText: {
        color: "#4591F7",
    },
    radioInnerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#4591F7",
    },
    agreementText: {
        fontSize: 14,
        color: "black",
    },

    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    safeAreaView: {
        flex: 1,
        justifyContent: "center",
    },
    contentContainer: {
        flex: 1,
 
        marginTop: 120,
    },
    title: {
        color: "black",
        fontSize: 20,
        marginBottom: 20,
    },
    textInputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    touchableContainer: {
        width: "20%",
        marginRight: 30,
        justifyContent: 'center',
    },
    textInputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: '#4591F7',
        marginRight: 30
    },
    flagImage: {
        width: 30,
        height: 20,
        marginRight: 10,
    },
    countryCodeText: {
        fontSize: 16,
        paddingVertical: 8,
        color: "black",
        marginRight: 20,
        marginLeft: 20,
marginTop:7//Add this marginRight to separate the flag from text
    },
    textInput1: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#4591F7',
        fontSize: 16,
        paddingVertical: 8,
        marginBottom: 10,
        color: "black",
    },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        maxHeight: "80%",
    },
    countryOption: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#3498db",
        borderRadius: 5,
        alignItems: "center",
    },
    closeButtonText: {
        color: "white",
        fontSize: 16,
    },
});
