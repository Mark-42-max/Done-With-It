import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.welcome}>
        <ImageBackground source={require('../assets/background.jpg')} style={styles.bgimage} >
            <View style={styles.loginButton}></View>
            <View style={styles.registerButton}></View>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    welcome: {
        flex: 1,
    },
    bgimage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    loginButton: {
        backgroundColor: "green",
        width: "100%",
        height: 70
    },
    registerButton: {
        backgroundColor: "red",
        width: "100%",
        height: 70
    }
})

export default WelcomeScreen;