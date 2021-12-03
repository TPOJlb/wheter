import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, StatusBar, Platform,ScrollView} from 'react-native';
import axios from "axios";
import {LinearGradient} from 'expo-linear-gradient';
import { AntDesign,Entypo,SimpleLineIcons,FontAwesome5   } from '@expo/vector-icons';
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
        const mg = indexUi(items.current.uv)

        return (
            <LinearGradient colors={['#6f5fef', '#749af5', '#96d1fb']} style = {styles.gradient}>
            <View style={styles.container}>

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
                        <Text style={{ color:"white" ,fontSize:100 }}>{items.current.temp_c | 0}</Text>
                        <Entypo name="circle" size={13} color="white" style={{marginBottom: 55,}} />
                    </View>
                    <View style={ styles.feel}>
                        <View style={{flex: 1,justifyContent: 'center',alignItems:'center',flexDirection:'row'}}>
                            <Text style={{color:'white'}}>{er[0] |0}</Text>
                            <Entypo name="circle" size={5} color="black" style={{color:'white',marginBottom: 8}}/>
                            <Text style={{color:'white'}}>/{er[1]|0}</Text>
                            <Entypo name="circle" size={5} color="black" style={{color:'white',marginBottom: 8}}/>
                            <Text style={{color:'white'}}> Feels like {items.current.feelslike_c|0}</Text>
                            <Entypo name="circle" size={5} color="black" style={{color:'white',marginBottom: 8}}/>
                        </View>
                        <View style={{flex: 1,justifyContent: 'center',alignItems:'center',flexDirection:'row'}}>
                            <Text style={{color:'white'}}>{items.current.condition.text}</Text>
                        </View>
                    </View>
                    <View style={ styles.textCenter}>
                        <View style={{flex: 1,paddingLeft: 220,alignItems:'center',flexDirection:'row'}}>
                            <Text style={{color:'white'}}>Yesterday: {er[0] |0}</Text>
                            <Entypo name="circle" size={5} color="black" style={{color:'white',marginBottom: 8}}/>
                            <Text style={{color:'white'}}>/{er[1]|0}</Text>
                            <Entypo name="circle" size={5} color="black" style={{color:'white',marginBottom: 8}}/>
                        </View>
                    </View>
                    <View style={ styles.UV}>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:0.5,alignItems:'center',justifyContent:'center'}}>
                                <SimpleLineIcons name="drop" size={24} color="white" />
                            </View>
                            <View style={{flex:1}}>
                                <View style={{flex:1,justifyContent:'center'}}>
                                    <Text style={{color: 'white'}}>Precipitation</Text>
                                    <Text style={{color: 'white'}}>{items.current.humidity}%</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{width: 14,height: '100%',alignItems:'center',justifyContent:'center'}}>
                            <View style={{backgroundColor:'white',width: 2,height: 50,alignItems:'center',justifyContent:'center'}}>

                            </View>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{flex:0.5,alignItems:'center',justifyContent:'center'}}>
                                <FontAwesome5 name="sun" size={24} color="yellow" />
                            </View>
                            <View style={{flex:1}}>
                                <View style={{flex:1,justifyContent:'center'}}>
                                    <Text style={{color: 'white'}}>UV Index</Text>
                                    <Text style={{color: 'white'}}>{mg}</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={ styles.textBottom}>
                        <Text style={{color: 'white',paddingLeft:25,fontSize:12}}>Hourly</Text>
                    </View>
                <View style={ styles.hours}>
                    <ScrollView horizontal = {true} style={{width: 100,height: 200}}>

                        <View style = {{width:60,height:170,marginTop:25,marginLeft:10,marginRight:10,alignItems:'center', }}>
                            <View >
                            <Text style={{color:'white',fontSize:14}}>{Moment(formattedDate).format(' h:mm a')}</Text>
                            <Image style={{marginTop: 20,marginLeft:10,width: 30,height: 30}} source={{uri: photo}}/>
                            </View>
                            <View style = {{width: 50,height:90,alignItems:'center',
                                justifyContent:'center',}}>
                                <Text> </Text>
                                <Text> </Text>
                                <Text style ={{color:'white'}}>26</Text>
                                <View style = {{width: 5,height:26,backgroundColor:'white'}}>


                                </View>

                            </View>
                        </View>


                    </ScrollView>
                </View>
            <View style = {{flex:0.6}}>

            </View>

            </View>
            </LinearGradient>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 22,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingLeft:10,
        paddingRight:10,

    },
    tinyLogo: {
        width: '25%',
        height: '63%',
        marginTop: 35,
    },
    location:{
      flex:1,
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    country:{
        flex:2.6,
        alignItems:'center',
    },
    temp:{
        flex:4,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingBottom: 0
    },
    feel:{
        flex:2.5,
        flexDirection:'column',
    },
    textCenter:{
        flex:0.6,
    },
    UV:{
        flex:3.5,
        flexDirection:'row',
        borderRadius: 15,
        borderWidth:1,
        marginTop: 5,
        marginLeft:10,
        marginRight:10,
        paddingRight:20,
        paddingLeft:20,
        backgroundColor:'#9fc5f5',
        borderColor:'#9fc5f5',


    },
    textBottom:{
        marginTop:10,
        flex:0.7,
    },
    hours:{
        flex:7,
        flexDirection:'row',
        marginLeft:10,
        marginRight:10,
        backgroundColor:'#9fc5f5',
        borderRadius: 15,
    },
    gradient:{
        flex:1,
        backgroundColor:'black',
    },
});

function indexUi(item){
    let items = ""
    if(item<=2){
        items = 'Low'
        if(item>= 3 && item<=5){
            items = 'Mild'
            if(item>= 6 && item<=7){
                items = 'High'
                if(item>= 8 && item<=10){
                    items = 'Taunt'
                    if(item>= 11){
                        items = 'Excessive'
                    }
                }
            }
        }
    }
    return (items);
}

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
