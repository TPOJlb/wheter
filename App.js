import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, StatusBar, Platform} from 'react-native';
import axios from "axios";
import {LinearGradient} from 'expo-linear-gradient';
import { AntDesign,Entypo  } from '@expo/vector-icons';
import Moment from 'moment';

export default function App() {
    const [error, setError] = useState(null);
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
        const formattedDate = getParsedDate ( items.current.last_updated)
        const er = maxTemp(items)
        console.log(er)
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#6f5fef', '#749af5', '#96d1fb']} style = {styles.gradient}>
                    <View style={ styles.location}>
                        <Text style={{color:'white'}}>Locations</Text>
                        <AntDesign name="search1" size={30} color="white" />
                        <Entypo name="dots-three-vertical" size={30} color="white" />
                    </View>
                    <View style={styles.country}>
                        <View style={{flex:1,flexDirection: "row", paddingTop: 30,}}>
                            <Entypo name="location-pin" size={15} color="white" />
                            <Text style={{color:'white'}}>{items.location.name}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{color:'white'}}>{Moment(formattedDate).format(' ddd D MMMM h:mm a')}</Text>
                        </View>
                    </View>
                    <View style={ styles.temp}>
                        <Image style={styles.tinyLogo} source={{uri: photo}}/>
                        <Text style={{ color:"white" ,fontSize:110 }}>{items.current.temp_c | 0}</Text>
                        <Entypo name="circle" size={13} color="white" style={{marginBottom: 55,}} />
                    </View>
                    <View style={ styles.feel}>

                    </View>
                    <View style={ styles.textCenter}>

                    </View>
                    <View style={ styles.UV}>

                    </View>
                    <View style={ styles.textBottom}>

                    </View>
                    <View style={ styles.hours}>

                    </View>
                </LinearGradient>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 22,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    tinyLogo: {
        width: '25%',
        height: '63%',
        marginTop: 35,
    },
    location:{
      flex:1,
        backgroundColor:'black',
        flexDirection:'row',
    },
    country:{
        flex:2.6,
        backgroundColor:'blue',
        alignItems:'center',
    },
    temp:{
        flex:4,
        flexDirection:'row',
        backgroundColor:'gray',
        alignItems:'center',
        justifyContent:'center',
        paddingBottom: 0
    },
    feel:{
        flex:2.5,
        flexDirection:'row',
        backgroundColor:'yellow',
    },
    textCenter:{
        flex:0.5,
        backgroundColor:'white',
    },
    UV:{
        flex:3.5,
        backgroundColor:'purple',
    },
    textBottom:{
        flex:0.5,
        backgroundColor:'green',
    },
    hours:{
        flex:7,
        backgroundColor:'orange',
    },
    gradient:{
        flex:1,
        backgroundColor:'black',
    },
});

function maxTemp(Max){
   let MinMax = Max.forecast.forecastday[0].hour;
   let Minimum = MinMax[0].temp_c;
   let Maximum = 0;
    for (let i = 0; i < 24; i++) {
        if(Maximum<MinMax[i].temp_c){
            Maximum = MinMax[i].temp_c
            if(Minimum>MinMax[i].temp_c){
                Minimum=MinMax[i].temp_c
            }
        }
    }
    return ([Maximum,Minimum]);
}

function getParsedDate(strDate){

    return strDate.toString();
}
