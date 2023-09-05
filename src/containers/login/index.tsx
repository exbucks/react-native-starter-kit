import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as styles from './styles'

function Login({ navigation }): JSX.Element {
    const handlePress = () => navigation.navigate("Home")

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.container}
            >
                <Text style={styles.title}>Login</Text>
                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text>Press Here</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Login;