import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
  } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState } from 'react';

function ViewImageScreen({navigation}) {

  const [eid, setEid] = useState("");
  const [pass, setPass] = useState("");

  const Register = async() => {
    console.log(eid, pass);
    if(eid === "" || pass === ""){return;}
    fetch('https://cryptic-anchorage-12485.herokuapp.com/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": eid,
        "password": pass
      }),
    }).then(response => response.json())
    .then(result => {
      console.log(result);
      try {
        AsyncStorage.setItem('token', result.token);
      } catch (e) {
        console.log(e);
      }
    })
    .catch(error => console.log(error));
  }

    return (
        <View style={styles.welcome}>

      {/* Background Image*/}
      <ImageBackground
        style={styles.bgimage}
        source={require('../assets/register.jpg')}
      />

      {/* Whole Container outside image background*/}
      <KeyboardAvoidingView behavior="padding" style={styles.logoContainer}>

        {/* Logo*/}
        <Image
          source={require("../assets/logo-red.png")}
          style={styles.logoImage}
        />

        <Text>{"\n"}</Text>

        {/* Input field for eid*/}
        <TextInput
          style={styles.input}
          value={eid}
          placeholder="example@domain.com"
          keyboardType="email-address"
          onChangeText={text => setEid(text)}
        />

        <Text>{"\n"}</Text>

        {/* Password input */}
        <TextInput
          style={styles.input}
          value={pass}
          secureTextEntry={true}
          placeholder="password"
          keyboardType="default"
          onChangeText={text => setPass(text)}
        />

        <Text>{"\n"}</Text>

        {/* Sign up button */}
        
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => Register()}
        >
          <KeyboardAvoidingView style={styles.signup}>
            <Text style={styles.signupText}>Sign Up</Text>
          </KeyboardAvoidingView>
        </TouchableOpacity>

        <Text>{"\n"}</Text>

        {/* Go back button */}
        <TouchableOpacity
          style={styles.gobackButton}
          onPress={() => navigation.goBack(null)}
        >
          <KeyboardAvoidingView style={styles.goback}>
            <Text style={styles.backText}>Go Back</Text>
          </KeyboardAvoidingView>
        </TouchableOpacity>

        
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
    welcome: {
      flex: 1,
    },
    bgimage: {
      flex: 1,
      justifyContent: "flex-end",
      opacity: 1,
      alignItems: "center",
    },
    signupButton: {
      backgroundColor: "#fc5c65",
      width: 180,
      height: 40,
      justifyContent: "center",
      borderRadius: 10,
    },
    signup: {
      alignItems: "center",
    },
    gobackButton: {
      backgroundColor: "#4ecdc4",
      width: 180,
      height: 40,
      justifyContent: "center",
      borderRadius: 10,
    },
    goback: {
      alignItems: "center",
    },
    logoContainer: {
      position: "absolute",
      top: 100,
      alignItems: "center",
      left: 50,
    },
    logoImage: {
      width: 100,
      height: 100,
    },
    tagLine: {
      color: "#4ecdc4",
      fontWeight: "700",
      backgroundColor: "#fff",
    },
    input: {
      width: 250,
      height: 50,
      backgroundColor: "#fff",
      borderRadius: 32,
      paddingHorizontal: 16,
      borderWidth: 1.5,
      borderColor: "#4ecdc4",
      //paddingHorizontal: 1.5,
    },
    signupText: {
      color: "#fff",
    },
    backText: {
      color: "#fff",
    },
  });

export default ViewImageScreen;