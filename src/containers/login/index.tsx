import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/app'
import * as styles from './styles'

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

function Login({ navigation }: Props): JSX.Element {
    const handlePress = () => navigation.navigate("Home", { userId: '1', sort: 'latest' })

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
