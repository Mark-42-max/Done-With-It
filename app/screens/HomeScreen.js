import {Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({navigation}) {

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('token', value)
        } catch (e) {
          console.log(e);
        }
      }

    const LogOut = () => {

        storeData(null);
        navigation.navigate('Login')
    }
    return (
        <View>
            <TouchableOpacity
            style={styles.signupButton}
            onPress={() => LogOut()}
            >
            <KeyboardAvoidingView style={styles.logout}>
                <Text style={styles.logoutText}>LogOut</Text>
            </KeyboardAvoidingView>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    logout: {
        backgroundColor: "red",
        marginHorizontal: 100,
        marginTop: 50,
    },
    logoutText: {
        textAlign: "center"
    }
})

export default HomeScreen;