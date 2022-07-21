import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WelcomeScreen = ({ navigation }) => {
  const [eid, setEid] = useState("");
  const [pass, setPass] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          setToken(value);
        }
      } catch (e) {
        setToken(null);
      }
    };

    getData();
  }, [token]);

  //Alert Function
  const showAlert = (title, msg) =>
    Alert.alert(
      title,
      msg,
      [
        {
          text: "Cancel",
          onPress: () => Alert.alert("Cancel Pressed"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );

    //Login Function
  const Login = () => {
    if (eid === "" || pass === "") {
      return showAlert("Error", "Please fill the required fields below");
    }

    fetch("https://cryptic-anchorage-12485.herokuapp.com/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: eid,
        password: pass,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if ('error' in result) {
          return showAlert("Error", result.error);
        }

        try {
          AsyncStorage.getItem('token').then(result => console.log(result)).catch(err => console.log(err))
          AsyncStorage.setItem("token", result.token);
          navigation.navigate("Home");
        } catch (e) {
          console.log(e);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <View style={styles.welcome}>
      {/* Background Image*/}
      <ImageBackground
        style={styles.bgimage}
        source={require("../assets/background1.jpg")}
      >
        {/* Whole Container outside image background*/}
        <KeyboardAvoidingView behavior="padding" style={styles.logoContainer}>
          {/* Logo*/}
          <Image
            source={require("../assets/logo-red.png")}
            style={styles.logoImage}
          />
          {/* Logo text */}
          <Text style={styles.tagLine}>Sell What you don't need{"\n\n"}</Text>

          {/* Input field for eid*/}
          <TextInput
            style={styles.input}
            value={eid}
            placeholder="example@domain.com"
            keyboardType="email-address"
            onChangeText={(text) => setEid(text)}
          />

          <Text>{"\n"}</Text>

          {/* Password input */}
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={pass}
            placeholder="password"
            keyboardType="default"
            onChangeText={(text) => setPass(text)}
          />

          <Text>{"\n"}</Text>

          {/* Login button */}
          <TouchableOpacity style={styles.loginButton} onPress={() => Login()}>
            <KeyboardAvoidingView style={styles.login}>
              <Text style={styles.loginText}>Login</Text>
            </KeyboardAvoidingView>
          </TouchableOpacity>

          <Text>{"\n"}</Text>

          {/* Register button */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("Register")}
          >
            <KeyboardAvoidingView style={styles.register}>
              <Text style={styles.registerText}>Register</Text>
            </KeyboardAvoidingView>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

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
  loginButton: {
    backgroundColor: "#fc5c65",
    width: 180,
    height: 40,
    justifyContent: "center",
    borderRadius: 10,
  },
  login: {
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: "#4ecdc4",
    width: 180,
    height: 40,
    justifyContent: "center",
    borderRadius: 10,
  },
  register: {
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
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
    paddingLeft: 16,
    borderWidth: 1.5,
    borderColor: "#4ecdc4",
  },
  loginText: {
    color: "#fff",
  },
  registerText: {
    color: "#fff",
  },
});

export default WelcomeScreen;
