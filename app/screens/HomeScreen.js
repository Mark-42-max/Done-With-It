import {Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({navigation}) {


    const LogOut = async() => {

        await AsyncStorage.removeItem('token');
        AsyncStorage.getItem('token').then(result => {
            console.log(result);
        }).catch(err => {console.log(err)});
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