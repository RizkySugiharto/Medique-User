import { View, Text, TextInput, Image } from "react-native";
import { style } from "../screens/ActivityScreen";
import React from "react";

interface SearcBarWProops {
    isFocus : boolean,
    setFocus : React.Dispatch<any>,
    setSearch : React.Dispatch<any>,
    placeholder : string, 
}

export default function SearchBarW({placeholder,isFocus,setFocus,setSearch} : SearcBarWProops ){
    return(
        <View>
            <View style={{width : '100%', marginTop : 20 ,display:"flex",flexDirection:"row",position : "relative"}}>
                <TextInput
                    style={{...style.searchDoctor, paddingRight : isFocus? 20: 50}}
                    placeholder={placeholder}
                    onChangeText={text => setSearch(text)}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />
                <Image
                    style={{position:"absolute", left : 10, bottom : 10}}
                    source={require('../assets/img/ic_search.png')}
                />
                <Image
                    style={isFocus? {display:"none"} : {position:"absolute", right : 15, bottom : 10}}
                    source={require('../assets/img/ic_filter_search.png')}
                />
            </View>
        </View>
    )
}