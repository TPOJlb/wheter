import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import axios from "axios";
import {LinearGradient} from 'expo-linear-gradient';

export default function App() {
    const [error, setError] = useState(null);
    // const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState('');

    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()
    useEffect(() => {
        axios.get("http://api.weatherapi.com/v1/forecast.json?key=526d4889d65b48cabba160455213011&q=London&days=1&aqi=no&alerts=no")
            .then(
                (result) => {

                    setItems(result.data);


                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <Text>Ошибка: {error.message}</Text>;
    } else if (!items) {
        return <Text>Загрузка...</Text>;
    } else {
        const photo = `http:` + items.current.condition.icon
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#6f5fef', '#749af5', '#96d1fb']}>
                    <Image style={styles.tinyLogo} source={{uri: photo}}/>
                </LinearGradient>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tinyLogo: {
        width: '30%',
        height: '30%'

    },
});
