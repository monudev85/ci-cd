import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import LoginSignUpHeader from "../components/LoginSignUpHeader";
import { MobileNumberError, otpFailed, otpTechnicalError } from "../data/ErrorMessages";

const OtpScreen = ({ navigation, route }: any) => {
  const otpBoxes = Array.from({ length: 4 }, () => useRef<TextInput>(null));
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", ""]);
  const [isError, setIsError] = useState(false);
  const [apiOtp, setApiOtp] = useState();
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(route.params.selectedCountry);
  const [mobileNumber, setMobileNumber] = useState(route.params.mobileNumber);

  const focusNextBox = (index: number) => {
    const nextBox = otpBoxes[index + 1]?.current;
    if (nextBox) {
      nextBox.focus();
    }
  };

  const handleChange = (value: string, index: number) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    focusNextBox(index);


  };



  const handleKeyPress = (index: number, key: string) => {
    if (key === "Backspace" && index > 0) {
      const prevBox = otpBoxes[index - 1]?.current;
      if (prevBox) {
        prevBox.focus();
      }
    }
  };

  //====================== otp code function====start===========================

  const fetchotp = async () => {
    if (!mobileNumberError) {
      try {
        const requestBody = {
          Mobile: mobileNumber,
          CountryID: selectedCountry,
        };
        const response = await fetch(`http://192.168.1.18/user/checkUserOtp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const data = await response.json();
          const apiotp = data.otp;
          setApiOtp(apiotp);
          // navigate to the OTP verification screen
        } else {
          Alert.alert("Error", otpFailed);
          // display an error message to the user
        }
      } catch (error) {
        Alert.alert(
          "Error",
          otpTechnicalError
        );
        // display an error message to the user
      }
    } else {
      setMobileNumberError(MobileNumberError);
    }
  };
  //====================== otp code function===end============================

  return (
    <View style={styles.viewContainer}>
      <SafeAreaView style={{ marginTop: 10 }}>
        <LoginSignUpHeader />

        <Text style={styles.otp}>Enter OTP</Text>

        <View style={styles.container}>
          {otpBoxes.map((ref, index) => (
            <TextInput
              key={index}
              ref={ref}
              style={styles.input}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={(value) => {
                handleChange(value, index);
              }}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(index, nativeEvent.key)
              }
            />
          ))}
        </View>

        {isError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Please enter valid OTP</Text>
          </View>
        )}

        <Text style={styles.nootp}>Didn't receive the code?</Text>

        <TouchableOpacity
          onPress={() => {
            fetchotp();
          }}
        >
          <Text style={styles.sendagain}>Send Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  otp: {
    color: "#000000",
    fontWeight: "400",
    fontSize: 26,
    alignSelf: "center",
    marginTop: 100,
  },
  inputgroup: {
    marginVertical: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  viewContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  input: {
    backgroundColor: "#DBEAFF",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    width: 43,
    height: 58,
    marginHorizontal: 5,
    textAlign: "center",
  },
  nootp: {
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 50,
  },
  sendagain: {
    alignSelf: "center",
    fontWeight: "500",
    color: "#4591F7",
  },
  errorContainer: {
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: "red",
  },
});

export default OtpScreen;