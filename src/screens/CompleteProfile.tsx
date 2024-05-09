import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import auth from '@react-native-firebase/auth';

import {
  DateOfBirthError,
  EmailError,
  InvalidEmailError,
} from "../data/ErrorMessages";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '527312752339-efihcgm6pn9o2tpl7m55ggi7jd0uok4g.apps.googleusercontent.com',
});


const CompleteProfile = ({ navigation, route }: any) => {
  const { width } = Dimensions.get("window");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [inputDate, setInputDate] = useState("");
  const [gender, setGender] = useState("female");
  const [mobileNumber, setMobileNumber] = useState(route?.params?.mobileNumber);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dateError, setDateError] = useState("");
  const [googleLogin, setGoogleLogin] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [photo, setPhoto]=useState('');
  const [isEmailRegistered, setEmailRegistered] = useState(false);

  const emailCheck=async()=>{
   // Email validation
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!email.trim()) {
     setEmailError(EmailError);
   } else if (!emailRegex.test(email)) {
     setEmailError(InvalidEmailError);
   } else{
    setEmailError('')
   }
    try {
      const requestBody = {
        email: email,
      };
      const response = await fetch(`http://192.168.1.18/user/checkEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
        const data = await response.json();
        if (data.exists === 1) {
          setEmailError('Email already registered');
          setEmailRegistered(true); // Set state if email is registered
        } else {
          setEmailRegistered(false); // Reset state if email is not registered
        }
    } catch (error) {
      Alert.alert("Error");
    }
  }


  const onEmailChange=(text:any)=>{
    setEmail(text)
    emailCheck()
  }

  useEffect(() => {
    handleValidation();
  }, [selectedDate, inputDate, FirstName, LastName, MiddleName, email]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user:any) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  const handleValidation = () => {
    emailCheck()
    // Full Name validation
    if (!FirstName.trim()) {
      setFirstNameError("First Name is required");
      return false;
    } else {
      setFirstNameError("");
    }

    // Date of Birth validation
    if (!selectedDate) {
      setDateError(DateOfBirthError);
      return false;
    } else {
      setDateError("");
    }
    return true;
  };

  const handleGenderChange = (selectedGender: any) => {
    setGender(selectedGender);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleChangeText = (text: any) => {
    handleValidation();
    setInputDate(text);
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice();
    return `${year}-${month}-${day}`;
  };


  const handleGoogleSignIn = async () => {
   
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log(googleCredential);
    try {
      let loginUser = await auth().signInWithCredential(googleCredential);
      console.log('Login user:', loginUser);
      setFirstName(loginUser.additionalUserInfo?.profile?.given_name)
      setLastName(loginUser.additionalUserInfo?.profile?.family_name)
      setEmail(loginUser.additionalUserInfo?.profile?.email)
      setPhoto(loginUser.additionalUserInfo?.profile?.picture)
      setGoogleLogin(true);
      console.log(loginUser);

    } catch (error) {
      console.log(error,"log in failed");
      setGoogleLogin(false);
    }
  };


  const handleComplete = async () => {
    if(!email){
      setEmailError('Email is Required')
    }
    if (handleValidation() && !isEmailRegistered && email) {
      // Prepare data for the API request
      const requestData = {
        FirstName: FirstName,
        DOB: selectedDate ? formatDate(selectedDate) : inputDate,
      };
      try {
        const response = await fetch(
          "http://192.168.1.18/user/generateKnobeeID",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          if (handleValidation()) {
            navigation.navigate("CompleteProfileStep2", {
              FirstName,
              LastName,
              MiddleName,
              email,
              gender,
              dob: selectedDate ? formatDate(selectedDate) : inputDate,
              countryCode: route?.params?.selectedCountry,
              mobileNumber,
              referralCode,
              knobeeId: responseData?.results,
              photo
            });
          }
        } else {
          Alert.alert("Failed to validate Knobee");
          // Handle error, show an error message, etc.
        }
      } catch (error) {
        Alert.alert("Failed to validate Knobee");
        // Handle error, show an error message, etc.
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.viewContainer}>
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
                <TouchableOpacity onPress={() => navigation.reset({
                      index: 0,
                      routes: [{ name: "SignUp" }],
                    })}>
                  <Image
                    style={{ height: 25, width: 25 }}
                    source={require("../assets/images/ep_back.png")}
                  />
                </TouchableOpacity>
                <Text style={styles.title}>{"Complete your profile"}</Text>
                <Text style={{ color: "white" }}>close</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                onPress={()=>handleGoogleSignIn()}
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#005B9E",
                    height: 50,
                    width:'100%',
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 15,
                  }}
                >
                  <Text style={{ color: "white" }}>Signup with google</Text>
                  <Image
                    style={{ height: 40, width: 40 }}
                    source={{
                      uri: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
                    }}
                  ></Image>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#005B9E",
                    height: 50,
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 15,
                  }}
                >
                  <Text style={{ color: "white" }}>Signup with Apple</Text>
                  <Image
                    style={{ height: 30, width: 30 }}
                    source={{
                      uri: "https://cdn.iconscout.com/icon/free/png-256/free-apple-1496035-1265529.png",
                    }}
                  ></Image>
                </TouchableOpacity> */}
              </View>
              <View style={styles.container}>
                <View style={styles.line} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line} />
              </View>
              <View style={{ marginTop: 15 }}>
                <TextInput
                  style={styles.fullname}
                  placeholder="Enter your First Name"
                  value={FirstName}
                  onChangeText={(text) => setFirstName(text)}
                  maxLength={30}
                />
                {firstNameError !== "" && (
                  <Text style={styles.errorText}>{firstNameError}</Text>
                )}
                <TextInput
                  style={styles.fullname}
                  placeholder="Enter your Middle Name"
                  value={MiddleName}
                  onChangeText={(text) => setMiddleName(text)}
                  maxLength={30}
                />
                <TextInput
                  style={styles.fullname}
                  placeholder="Enter your Last Name"
                  value={LastName}
                  onChangeText={(text) => setLastName(text)}
                  maxLength={30}
                />
                <Text
                  style={{ fontSize: 18, fontWeight: "500", marginTop: 15 }}
                >
                  Select Gender:{" "}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 30,
                    marginTop: 30,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleGenderChange("female")}
                    style={{
                      width: width * 0.25, // Use a percentage of the window width
                      height: width * 0.25, // Use a percentage of the window width
                      borderRadius: (width * 0.25) / 2, // Make it a circle
                      backgroundColor:
                        gender === "female" ? "#4591F7" : "#F0F0F0",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../assets/images/Female.png")}
                      style={{
                        marginTop: 8,
                        width: width * 0.24, // Use a percentage of the window width
                        height: width * 0.24, // Use a percentage of the window width
                        borderRadius: (width * 0.24) / 2, // Make it a circle
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleGenderChange("male")}
                    style={{
                      width: width * 0.25, // Use a percentage of the window width
                      height: width * 0.25, // Use a percentage of the window width
                      borderRadius: (width * 0.25) / 2, // Make it a circle
                      backgroundColor:
                        gender === "male" ? "#4591F7" : "#F0F0F0",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../assets/images/Male.png")}
                      style={{
                        marginTop: 8,
                        width: width * 0.24, // Use a percentage of the window width
                        height: width * 0.24, // Use a percentage of the window width
                        borderRadius: (width * 0.24) / 2, // Make it a circle
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleGenderChange("other")}
                    style={{
                      width: width * 0.25, // Use a percentage of the window width
                      height: width * 0.25, // Use a percentage of the window width
                      borderRadius: (width * 0.25) / 2, // Make it a circle
                      backgroundColor:
                        gender === "other" ? "#4591F7" : "#F0F0F0",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://www.voicesofyouth.org/sites/voy/files/images/2022-03/images_2.jpeg",
                      }}
                      style={{
                        marginLeft: 0.5,
                        width: width * 0.23, // Use a percentage of the window width
                        height: width * 0.23, // Use a percentage of the window width
                        borderRadius: (width * 0.23) / 2, // Make it a circle
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.dateInputContainer}>
                  <TextInput
                    style={styles.dateInput}
                    placeholder="Date of Birth (DD/MM/YY)"
                    value={selectedDate ? formatDate(selectedDate) : inputDate}
                    editable={true}
                    onChangeText={handleChangeText}
                  />
                  <TouchableOpacity
                    onPress={showDatePicker}
                    style={styles.dateIcon}
                  >
                    <Image source={require("../assets/images/Group.png")} />
                  </TouchableOpacity>
                </View>
                {dateError !== "" && (
                  <Text style={styles.errorText}>{dateError}</Text>
                )}
                <TextInput
                  value={email}
                  onChangeText={(text) => onEmailChange(text)}
                  style={styles.inputbox}
                  placeholder="Enter your email"
                />
                {emailError !== "" && (
                  <Text style={styles.errorText}>{emailError}</Text>
                )}
                <TextInput
                  style={styles.inputbox}
                  placeholder="Referral code (Optional)"
                  value={referralCode}
                  onChangeText={(text) => setReferralCode(text)}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, isEmailRegistered && { backgroundColor: 'gray' }]}
                  onPress={() => {
                    handleComplete();
                  }}
                  disabled={isEmailRegistered} 
                >
                  <Text style={styles.buttonText}> Complete</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  title: {
    color: "black",
    fontSize: 18,
    marginBottom: 20,
    fontFamily: "Inter",
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
  },
  errorText: {
    color: "red",
  },
  fullname: {
    fontSize: 16,
    fontWeight: "400",
    borderBottomWidth: 1,
    borderColor: "#4591F7",
    marginVertical: 10,
    paddingLeft: 0,
    paddingBottom: 15,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 28,
  },
  button: {
    backgroundColor: "#005B9E",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    fontWeight: "400",
  },
  viewContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#005B9E",
    paddingVertical: 20,
  },
  CompleteProfile: {
    marginTop: 60,
    fontSize: 26,
    fontWeight: "400",
    color: "#000000",
    marginBottom: 20,
  },
  inputbox: {
    borderColor: "#4591F7",
    borderBottomWidth: 1,
    fontSize: 16,
    marginTop: 20,
    paddingBottom: 15,
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateInput: {
    flex: 1,
    borderColor: "#4591F7",
    borderBottomWidth: 1,
    fontSize: 16,
    paddingBottom: 15,
  },
  dateIcon: {
    marginLeft: 10,
  },
});

export default CompleteProfile;
