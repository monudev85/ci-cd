import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import SvgComponent from "../assets/icons/LoginImage";
import { otpFailed, otpTechnicalError } from "../data/ErrorMessages";
import GetLocation from "react-native-get-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info";

interface Country {
  id: string;
  countrySortName: string;
  countryName: string;
  countryCode: string;
  pattern: string;
  flagUrl: string;
}

interface Country {
  id: string;
  sortname: string;
  name: string;
  phonecode: string;
  pattern: string;
  flagUrl: string;
}
export default function LoginScreen({ navigation }: any) {
  const [password, setPassword] = useState("");
  const [knobeeId, setKnobeeId] = useState("");
  const [selectedTab, setSelectedTab] = useState("phone");
  const [phone, setPhone] = useState("");
  const [knobeeIdEmail, setKnobeeIdEmail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("91");
  const [isModalVisible, setModalVisible] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [apiOtp, setApiOtp] = useState();
  const [showOtp, setShowOtp] = useState(false);
  const [apiGmailOtp, setApiGmailOtp] = useState();
  const otpBoxes = Array.from({ length: 4 }, () => useRef<TextInput>(null));
  const otpGmailBoxes = Array.from({ length: 4 }, () =>
    useRef<TextInput>(null)
  );
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", ""]);
  const [otpGmailValues, setOtpGmailValues] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);
  const [isError, setIsError] = useState(false);
  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [longitude, setLongitude] = useState<number | undefined>(undefined);
  const [emailError, setEmailError] = useState("");
  const [gmailOtp, setGmailOtp] = useState("");
  const [showOtpBoxes, setShowOtpboxes] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [deviceVersion, setDeviceVersion] = useState({});

  const deviceInfo = async () => {
    let device = await DeviceInfo.getDeviceName();
    let systemVersion= await DeviceInfo.getSystemVersion()
    setDeviceName(device)
    setDeviceVersion(systemVersion)
  };

  useEffect(() => {
    deviceInfo();
    GetLocation.getCurrentPosition()
      .then((location) => {
        setLatitude(location.latitude);
        setLongitude(location.longitude);
      })
      .catch((error) => {
        console.error(error,"log,let location not fatched");
        Alert.alert('Error','Something went wrong!! Please try after sometime!!')
      });
  }, []);

  const handlePhoneLogin = async () => {
    if (!mobileNumberError) {
      try {
        const requestBody = {
          mobile: phone,
          countryCode: selectedCountry,
          otpCheck: 2,
        };
        const response = await fetch(`http://192.168.1.18/user/checkOtp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        console.log(requestBody)
        if (response.ok) {
          const data = await response.json();
          const apiotp = data.otp;
          console.log(apiotp)
          if (data.exists === 1) {
            setShowOtp(true);
            setApiOtp(apiotp);
          } else if (data.exists === 0) {
            setMobileNumberError("Mobile Number is not registered");
          }
          // navigate to the OTP verification screen
        } else {
          Alert.alert("Error", otpFailed);
          // display an error message to the user
        }
      } catch (error) {
        Alert.alert("Error", otpTechnicalError);
      }
    }
  };

  const handleKnobeeIdEmailLogin = async () => {
    if (gmailOtp.length === 0) {
      const requestBody = {
        userId: knobeeIdEmail,
        password: password,
        latitude: latitude,
        longitude: longitude,
        location: "",
        osVersion: deviceVersion,
        deviceName: deviceName,
      };

      try {
        // Make POST request to the API
        const response = await fetch("http://192.168.1.18/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        setEmailError(data.message);
        const token = data.token;
        await AsyncStorage.setItem("token", token);
        // Continue with navigation or any other logic
        navigation.navigate("TabNavigatorScreen");
      } catch (error) {
        Alert.alert('Error',"Seems like technical issue!!")
      }
    } else if (gmailOtp.length !== 0) {
      setEmailError("");
      setShowOtpboxes(true);
      const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate email using the regex
      if (emailRegex.test(knobeeIdEmail)) {
        try {
          const requestBody = {
            email: knobeeIdEmail,
          };
          const response = await fetch(`http://192.168.1.18/user/gmailOtp`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
          console.log(response);
          setPhone("");
          if (response.ok) {
            const data = await response.json();
            const apiotp = data.OTP;
            if (data.message === "OTP has been sent on your email") {
              setApiGmailOtp(apiotp);
              setEmailError("");
            } else if (data.message === "Email Id not found") {
              setEmailError("Gmail Id is not registered");
            }
            // navigate to the OTP verification screen
          } else {
            Alert.alert("Error", otpFailed);
            // display an error message to the user
          }
        } catch (error) {
          Alert.alert("Error", otpTechnicalError);
        }
      } else {
        setEmailError("Email is not valid");
      }
    }
  };

  const handleTextInputPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const sendOtpInstead = () => {
    setGmailOtp("gmail otp");
  };
  const handleCountrySelection = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setModalVisible(false);
  };
  useEffect(() => {
    fetchCountryData();
  }, []);

  const fetchCountryData = async () => {
    try {
      const response = await fetch("http://192.168.1.18/country");
      if (response.ok) {
        const data = await response.json();
        setCountries(data.data);
      } else {
        Alert.alert("Failed to fetch country data");
      }
    } catch (error) {
      console.log(error, "Failed to fetch country data");
      Alert.alert(
        "ERROR",
        "Something went wrong please try again after sonetime!!!!"
      );
    }
  };

  const mobileNumberChange = (text: any) => {
    setPhone(text);
    const mobileNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const validateError = mobileNumberRegex.test(text);
    if (!validateError || !text.length) {
      setMobileNumberError("Mobile number is not valid");
    } else {
      setMobileNumberError("");
    }
  };
  const focusNextBox = (index: number) => {
    const nextBox = otpBoxes[index + 1]?.current;
    if (nextBox) {
      nextBox.focus();
    }
  };
  const focusNextGmailBox = (index: number) => {
    const nextBox = otpGmailBoxes[index + 1]?.current;
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
  const handleGmailOtpChange = (value: string, index: number) => {
    const newOtpValues = [...otpGmailValues];
    newOtpValues[index] = value;
    setOtpGmailValues(newOtpValues);
    focusNextGmailBox(index);
  };
  const handleKeyPress = (index: number, key: string) => {
    if (key === "Backspace" && index > 0) {
      const prevBox = otpBoxes[index - 1]?.current;
      if (prevBox) {
        prevBox.focus();
      }
    }
  };
  const handleGmailKeyPress = (index: number, key: string) => {
    if (key === "Backspace" && index > 0) {
      const prevBox = otpGmailBoxes[index - 1]?.current;
      if (prevBox) {
        prevBox.focus();
      }
    }
  };

  const handleGmailNext = async () => {
    if (otpGmailValues.every((val) => val !== "")) {
      const enteredOTP = parseInt(otpGmailValues.join(""), 10);
      if (enteredOTP === apiGmailOtp) {
        const requestBody = {
          email: knobeeIdEmail,
          latitude: latitude,
          longitude: longitude,
          location: "",
          osVersion: deviceVersion,
          deviceName: deviceName,
        };
        try {
          // Make POST request to the API
          const response = await fetch("http://192.168.1.18/user/loginEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });

          const data = await response.json();
          const token = data.token;
          await AsyncStorage.setItem("token", token);
          // Continue with navigation or any other logic
          navigation.navigate("TabNavigatorScreen");
        } catch (error) {
          console.error(error,"emailotp");
          Alert.alert("Error","Seems like a technical issue!! please try after sometime!!" );
        }
      }
    }
  };

  const handleNext = async () => {
    if (otpValues.every((val) => val !== "")) {
      const enteredOTP = parseInt(otpValues.join(""), 10);
      if (enteredOTP === apiOtp && !isError && !mobileNumberError) {
        const requestBody = {
          mobile: phone,
          countryCode: selectedCountry,
          latitude: latitude,
          longitude: longitude,
          location: "",
          osVersion: deviceVersion,
          deviceName: deviceName,
        };

        try {
          // Make POST request to the API
          const response = await fetch("http://192.168.1.18/user/loginOtp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
          console.log(requestBody,"log in");

          const data = await response.json();
          const token = data.token;
          await AsyncStorage.setItem("token", token);
          // Continue with navigation or any other logic
          navigation.navigate("TabNavigatorScreen");
        } catch (error) {
          console.log(error,"log in error");
          Alert.alert('Error', "Seems like a technical issue!! please try after sometime!!")
        }
      } else {
        setIsError(true);
      }
    } else {
      setIsError(false);
    }
  };

  const onEmailChange = (text: any) => {
    setKnobeeIdEmail(text);
    const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    // Validate email using the regex
    if (!emailRegex.test(knobeeIdEmail)) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ paddingHorizontal: 20, flex: 1, backgroundColor: "#005B9E" }}
      >
        {/* Include your SignLoginHeader component here */}
        {/* <SignLoginHeader /> */}
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <SvgComponent></SvgComponent>
        </View>

        {/* new ui design */}

        <View
          style={{
            backgroundColor: "white",
            height: "auto",
            paddingBottom: 20,
            padding: 20,
            borderRadius: 28,
          }}
        >
          <ScrollView>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#005B9E",
                  borderRadius: 20,
                  padding: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelectedTab("phone"), setGmailOtp("");
                  }}
                  style={{
                    padding: 10,
                    backgroundColor:
                      selectedTab === "phone" ? "white" : "transparent",
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50%",
                  }}
                >
                  <Text
                    style={{
                      color: selectedTab === "phone" ? "#005B9E" : "white",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Phone Number
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedTab("knobeeIdEmail"),
                      setGmailOtp(""),
                      setShowOtpboxes(false);
                  }}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      selectedTab === "knobeeIdEmail" ? "white" : "transparent",
                    borderRadius: 15,
                    width: "50%",
                  }}
                >
                  <Text
                    style={{
                      color:
                        selectedTab === "knobeeIdEmail" ? "#005B9E" : "white",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Knobee ID/Email
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginVertical: 20, alignItems: "center" }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "400", color: "black" }}
                >
                  Login With{" "}
                  {selectedTab === "phone" ? "Phone Number" : "Knobee ID/Email"}
                </Text>
              </View>

              {selectedTab === "phone" && (
                <View>
                  <View style={styles.textInputContainer}>
                    <TouchableOpacity
                      disabled={showOtp}
                      onPress={handleTextInputPress}
                    >
                      <View
                        style={[
                          styles.textInputWrapper,
                          apiOtp && { backgroundColor: "#c2c0c0" },
                        ]}
                      >
                        <Text style={styles.countryCodeText}>
                          {"+" + selectedCountry}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TextInput
                      style={[
                        styles.textInput1,
                        ,
                        apiOtp && { backgroundColor: "#c2c0c0" },
                      ]}
                      keyboardType="number-pad"
                      placeholder={"Enter phone number"}
                      placeholderTextColor="gray"
                      onChangeText={(text) => mobileNumberChange(text)}
                      maxLength={10}
                      editable={!apiOtp}
                    />
                  </View>
                  {mobileNumberError && (
                    <Text
                      style={{
                        color: "red",
                        textAlign: "center",
                        marginLeft: 30,
                        marginTop: 10,
                      }}
                    >
                      {mobileNumberError}
                    </Text>
                  )}
                  {apiOtp && (
                    <View style={styles.container1}>
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
                  )}
                  {isError && apiOtp && (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>
                        Please enter valid OTP
                      </Text>
                    </View>
                  )}
                  {apiOtp && (
                    <Text style={styles.nootp}>Didn't receive the code?</Text>
                  )}

                  {apiOtp && (
                    <TouchableOpacity
                      onPress={() => {
                        handlePhoneLogin();
                      }}
                    >
                      <Text style={styles.sendagain}>Send Again</Text>
                    </TouchableOpacity>
                  )}
                  {!apiOtp && (
                    <TouchableOpacity
                      style={styles.sendotp}
                      onPress={() => handlePhoneLogin()}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "700",
                          fontSize: 16,
                        }}
                      >
                        Send OTP
                      </Text>
                    </TouchableOpacity>
                  )}
                  {apiOtp && (
                    <TouchableOpacity
                      style={styles.sendotp}
                      onPress={() => handleNext()}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "700",
                          fontSize: 16,
                        }}
                      >
                        Submit
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {selectedTab === "knobeeIdEmail" && (
                <View>
                  <TextInput
                    placeholder={
                      gmailOtp.length !== 0
                        ? "Enter your Email"
                        : "Enter your Knobee ID or Email"
                    }
                    onChangeText={(text) => onEmailChange(text)}
                    value={knobeeIdEmail}
                    editable={!showOtpBoxes}
                    style={{
                      borderWidth: 1,
                      borderColor: "gray",
                      borderRadius: 5,
                      padding: 10,
                      marginBottom: 10,
                      height: 50,
                      backgroundColor: showOtpBoxes ? "#c2c0c0" : "white",
                    }}
                  />
                  {emailError && (
                    <View style={{ width: "100%", alignItems: "center" }}>
                      <Text style={{ color: "red" }}>{emailError}</Text>
                    </View>
                  )}
                  {gmailOtp.length === 0 && (
                    <TextInput
                      placeholder="Enter your password"
                      onChangeText={(text) => setPassword(text)}
                      value={password}
                      secureTextEntry
                      style={{
                        borderWidth: 1,
                        borderColor: "gray",
                        borderRadius: 5,
                        padding: 10,
                        marginBottom: 10,
                        height: 50,
                      }}
                    />
                  )}
                  {showOtpBoxes && (
                    <View style={styles.container1}>
                      {otpGmailBoxes.map((ref, index) => (
                        <TextInput
                          key={index}
                          ref={ref}
                          style={styles.input}
                          maxLength={1}
                          keyboardType="numeric"
                          onChangeText={(value) => {
                            handleGmailOtpChange(value, index);
                          }}
                          onKeyPress={({ nativeEvent }) =>
                            handleGmailKeyPress(index, nativeEvent.key)
                          }
                        />
                      ))}
                    </View>
                  )}
                  {isError && showOtpBoxes && (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>
                        Please enter valid OTP
                      </Text>
                    </View>
                  )}
                  {showOtpBoxes && (
                    <Text style={styles.nootp}>Didn't receive the code?</Text>
                  )}
                  {showOtpBoxes && (
                    <TouchableOpacity
                      onPress={() => {
                        handleKnobeeIdEmailLogin();
                      }}
                    >
                      <Text style={styles.sendagain}>Send Again</Text>
                    </TouchableOpacity>
                  )}
                  {gmailOtp.length === 0 && (
                    <TouchableOpacity
                      style={{ alignItems: "flex-end", marginBottom: 20 }}
                      onPress={() => sendOtpInstead()}
                    >
                      <Text style={{ color: "#005B9E", fontSize: 13 }}>
                        Send OTP instead
                      </Text>
                    </TouchableOpacity>
                  )}

                  {!showOtpBoxes && (
                    <TouchableOpacity
                      onPress={() => handleKnobeeIdEmailLogin()}
                      style={{
                        alignItems: "center",
                        backgroundColor: "#005B9E",
                        paddingVertical: 20,
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "700",
                          color: "white",
                        }}
                      >
                        Login
                      </Text>
                    </TouchableOpacity>
                  )}
                  {showOtpBoxes && (
                    <TouchableOpacity
                      onPress={() => handleGmailNext()}
                      style={{
                        alignItems: "center",
                        backgroundColor: "#005B9E",
                        paddingVertical: 20,
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "700",
                          color: "white",
                        }}
                      >
                        Submit
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>

            {(gmailOtp.length === 0 || apiOtp) && (
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{ color: "#4B4A4A", fontWeight: "400", fontSize: 14 }}
                >
                  Don’t have account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text
                    style={{
                      color: "#005B9E",
                      marginLeft: 5,
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    Create Account
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {gmailOtp.length !== 0 && (
              <TouchableOpacity
                onPress={() => setGmailOtp("")}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "rgba(0, 91, 158, 1)" }}>
                  Enter Password
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={countries}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryOption}
                  onPress={() => handleCountrySelection(item.phonecode)}
                >
                  <Image
                    source={{ uri: item.flagUrl }}
                    style={styles.flagImage}
                  />
                  <View style={{ width: 60, alignItems: "center" }}>
                    <Text
                      style={{ marginRight: 10, alignItems: "flex-end" }}
                    >{`+${item.phonecode}`}</Text>
                  </View>
                  <View style={{ width: 150, alignItems: "center" }}>
                    <Text style={{ alignItems: "flex-end" }}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  nootp: {
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 5,
    marginTop: 0,
  },
  sendagain: {
    alignSelf: "center",
    fontWeight: "500",
    color: "#4591F7",
    marginBottom: 9,
  },
  errorContainer: {
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: "red",
  },
  logincontainer: {
    backgroundColor: "white",
  },
  flagImage: {
    width: 50,
    height: 20,
    marginRight: 10,
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
  container1: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    width: 53,
    height: 58,
    marginHorizontal: 5,
    textAlign: "center",
    marginBottom: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  sendotp: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#005B9E",
    borderRadius: 8,
    marginTop: 20,
  },

  buttonContainer: {
    flex: 1,
    justifyContent: "center", // Center items vertically
    alignItems: "flex-end", // Center items horizontally
    // bottom: '20%' // Adjust marginTop for separation from the agreement text
  },
  button: {
    backgroundColor: "#4591F7",
    padding: 10,
    borderRadius: 24,
    width: "50%",
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
  },
  safeAreaView: {},
  contentContainer: {
    flex: 1,

    marginTop: 120,
  },

  countryCodeText: {
    fontSize: 16,
    paddingVertical: 8,
    color: "black",
    marginRight: 20,
    marginLeft: 20,
  },

  textInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  touchableContainer: {
    width: "20%",
    marginRight: 30,
    justifyContent: "center",
  },
  textInputWrapper: {
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    height: 53,
    marginRight: 10,
    ...Platform.select({
      ios: {
        flex: 0, // Apply flex only on iOS
      },
      android: {
        flex: 1, // Apply flex only on android
      },
    }),
  },
  textInput1: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    fontSize: 16,
    color: "black",
    paddingLeft: 10,
    borderRadius: 5,
  },
});
