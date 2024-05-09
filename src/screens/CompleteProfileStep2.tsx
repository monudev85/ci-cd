import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Platform,
} from "react-native";

import {
  ExistingKnobeeIdError,
  GenericKnobeeIdError,
  KnobeeIdCheckError,
  knobeeIdRequiredError,
  passwordLengthError,
  passwordMatchError,
} from "../data/ErrorMessages";
import RadioGroup from "react-native-radio-buttons-group";

export default function CompleteProfileStep2({ navigation, route }: any) {
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [reEnterPasswordError, setReEnterPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);
  const [knobeeId, setKnobeeId] = useState(route?.params?.knobeeId[0] || "");
  const [knobeeIdError, setKnobeeIdError] = useState("");
  const [selectedName, setSelectedName] = useState(
    route.params.knobeeId[0] || ""
  );

  const handleNameSelect = (name: string) => {
    setSelectedName(name);
    setKnobeeId(name); // Update knobeeId state with the selected name
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleReEnterPasswordChange = (text: string) => {
    setReEnterPassword(text);
  };

  const handleSeePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleReenterPassword = () => {
    setShowReenterPassword(!showReenterPassword);
  };

  const handleKnobeeIdChange = async (text: string) => {
    setKnobeeId(text);

    try {
      const response = await fetch("http://192.168.1.18/user/checkKnobeeId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: text.toString() }),
      });
      console.log(text.toString())
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.exists===0) {
          setKnobeeIdError(ExistingKnobeeIdError);
        } else {
          setKnobeeIdError("");
        }
      } else {
        setKnobeeIdError(KnobeeIdCheckError);
      }
    } catch (error) {
      setKnobeeIdError(GenericKnobeeIdError);
    }
  };

  const calculatePasswordStrength = (password: any) => {
    const strength = password.length;
    return strength;
  };

  const getPasswordStrengthColor = (strength: any) => {
    if (strength < 6) {
      return "red";
    } else if (strength < 10) {
      return "orange";
    } else {
      return "green";
    }
  };

  const getPasswordStrengthLabel = (strength: any) => {
    if (strength < 6) {
      return "Weak";
    } else if (strength < 10) {
      return "Medium";
    } else {
      return "Strong";
    }
  };

  const handleComplete = () => {
    // Password validation
    if (password.length < 8) {
      setPasswordError(passwordLengthError);
      return;
    } else {
      setPasswordError("");
    }

    // Re-enter password validation
    if (reEnterPassword !== password) {
      setReEnterPasswordError(passwordMatchError);
      return;
    } else {
      setReEnterPasswordError("");
    }

    // KnobeeId validation
    if (!knobeeId.trim()) {
      setKnobeeIdError(knobeeIdRequiredError);
      return;
    } else if (knobeeIdError !== "") {
      // If there was an error during KnobeeId API call
      return;
    } else {
      setKnobeeIdError("");
    }

    // Proceed to the next page
    navigation.navigate("Image", {
      FirstName: route.params.FirstName,
      LastName: route.params.LastName,
      MiddleName: route.params.MiddleName,
      CountryCode: route.params.countryCode,
      DOB: route.params.dob,
      Email: route.params.email,
      Gender: route.params.gender,
      MobileNo: route.params.mobileNumber,
      ReferralCode: route.params.referralCode,
      photo: route.params.photo,
      KnobeeId: knobeeId,
      Password: password,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              paddingHorizontal: 15,
              paddingVertical: 30,
              marginTop: 10,
            }}
          >
            <ScrollView>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "completeProfile" }],
                    })
                  }
                >
                  <Image
                    style={{ height: 25, width: 25 }}
                    source={require("../assets/images/ep_back.png")}
                  />
                </TouchableOpacity>
                <Text style={styles.title}>{"Knobee I’d"}</Text>
                <Text style={{ color: "white" }}>close</Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <TextInput
                  style={styles.textInput1}
                  placeholder="Choose your knobee I'd"
                  placeholderTextColor="gray"
                  onChangeText={handleKnobeeIdChange}
                  autoCapitalize="none"
                  value={knobeeId}
                  maxLength={25}
                />
                {knobeeIdError !== "" && (
                  <Text style={styles.errorText}>{knobeeIdError}</Text>
                )}
                <View style={{ flexDirection: "row", marginTop:10, marginBottom:10 }}>
                  <View style={{ flex: 1 }}>
                    {route.params.knobeeId.slice(0, 2).map((name: string) => (
                      <TouchableOpacity
                        key={name}
                        style={styles.radioButton}
                        onPress={() => handleNameSelect(name)}
                      >
                        <View style={styles.radioButtonCircle}>
                          {selectedName === name && (
                            <View style={styles.innerCircle} />
                          )}
                        </View>
                        <Text style={{color:'#005B9E', fontStyle:'italic',fontSize:13}}>{name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View >
                    {route.params.knobeeId.slice(2, 4).map((name: string) => (
                      <TouchableOpacity
                        key={name}
                        style={styles.radioButton}
                        onPress={() => handleNameSelect(name)}
                      >
                        <View style={styles.radioButtonCircle}>
                          {selectedName === name && (
                            <View style={styles.innerCircle} />
                          )}
                        </View>
                        <Text style={{color:'#005B9E', fontStyle:'italic',fontSize:13}}>{name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View style={styles.container2}>
                  <TextInput
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={handlePasswordChange}
                    style={styles.input}
                    placeholder="Enter Password"
                    placeholderTextColor="#aaa"
                    maxLength={15}
                  />
                  <TouchableOpacity onPress={handleSeePassword}>
                    <Image
                      source={
                        showPassword
                          ? require("../assets/icons/eyeopen.png")
                          : require("../assets/icons/eyeclose.png")
                      }
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      backgroundColor: getPasswordStrengthColor(
                        calculatePasswordStrength(password)
                      ),
                      height: 10,
                      flex: 1,
                      borderRadius: 5,
                      marginRight: 5,
                    }}
                  />
                  <Text style={{ fontSize: 12 }}>
                    {password.length > 0
                      ? `Strength: ${getPasswordStrengthLabel(
                          calculatePasswordStrength(password)
                        )}`
                      : ""}
                  </Text>
                </View>
                {passwordError !== "" && (
                  <Text style={styles.errorText}>{passwordError}</Text>
                )}

                <View style={styles.container3}>
                  <TextInput
                    // Set secureTextEntry prop to hide
                    //password when showPassword is false
                    secureTextEntry={!showReenterPassword}
                    value={reEnterPassword}
                    onChangeText={handleReEnterPasswordChange}
                    style={styles.input}
                    placeholder="Re-enter password"
                    placeholderTextColor="#aaa"
                    maxLength={15}
                  />
                  <TouchableOpacity onPress={handleReenterPassword}>
                    <Image
                      source={
                        showReenterPassword
                          ? require("../assets/icons/eyeopen.png")
                          : require("../assets/icons/eyeclose.png")
                      }
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>
                {reEnterPasswordError !== "" && (
                  <Text style={styles.errorText}>{reEnterPasswordError}</Text>
                )}

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleComplete}
                  >
                    <Text style={styles.buttonText}>Complete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  radioButtonCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#005B9E",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#005B9E",
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 8,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(69, 145, 247, 1)",
  },
  container3: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 8,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(69, 145, 247, 1)",
    marginTop: 20,
  },
  input: {
    flex: 1,
    color: "#333",
    backgroundColor: "white",
    paddingVertical: 10,
    fontSize: 16,
    paddingBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center", // Center items vertically
    alignItems: "flex-end", // Center items horizontally
    marginTop: 30,
    // Adjust marginTop for separation from the agreement text
  },
  button: {
    backgroundColor: "#005B9E",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    fontWeight: "400",
    // Set the width to half of the screen
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center", // Center the text within the button
  },
  // radioButton: {
  //   width: 20,
  //   height: 20,
  //   borderRadius: 10,
  //   borderWidth: 2,
  //   borderColor: "#4591F7",
  //   marginBottom: 2,
  //   marginTop: 3,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginRight: 10,
  // },
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
    backgroundColor: "#005B9E",
  },
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    marginTop: 110,
  },
  title: {
    color: "black",
    fontSize: 20,
    marginBottom: 30,
  },
  textInputContainer: {
    flexDirection: "column",
    marginTop: 10,
  },
  touchableContainer: {
    width: "20%",
    marginRight: 30,
    justifyContent: "center",
  },
  textInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#4591F7",
    marginRight: 30,
  },
  textInput1: {
    borderBottomWidth: 1,
    borderBottomColor: "#4591F7",
    fontSize: 15,
    marginBottom: 15,
    color: "gray",
    paddingBottom: 15,
  },
});
