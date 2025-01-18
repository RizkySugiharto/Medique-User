
import { ReactElement, useRef, useState } from "react";
import { Image, ImageProps, Pressable, SectionList, StyleSheet, Text,TextInput,useWindowDimensions,View } from "react-native";
import { SearchBar } from "react-native-screens";
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Colors from "../../styles/colors";
import HistoryTransaksi from "./HistoryTransaksi";
import { Props } from "react-native-confirmation-code-field/esm/CodeField";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Chat from "./chat";
import DetailPesanan from "./detailpesanan";



interface propCardChat {
    title : string,
    name : string,
    latestMessage : string,
    latestDate : string,
    totalUnreadMessages : number,
    image : NodeRequire,
    indexData : number,
}

interface InterfaceTabBarActivity{
    index : number,
    setIndex :React.Dispatch<React.SetStateAction<number>>,

}

function TabBarActivity({index,setIndex} : InterfaceTabBarActivity){
    return(
        <View style={style.ViewRoot}>
            {routes.map((value,routeIndex) => {
                return <Pressable 
                    key={routeIndex + index}
                    style={isActive()? style.ActivePage : style.UnActivePage}
                    onPress={() => setIndex(routeIndex)}>
                    <Text style={isActive()? style.ActiveText : {}}>{value.title}</Text>
                    <Text style={style.HasNotif}>1</Text>
                </Pressable>

                function isActive() : Boolean{
                    return routeIndex == index
                }
            })}
        </View>
    )
    
}

function CreateCardChat({title,name,latestMessage,latestDate,totalUnreadMessages,image,indexData} : propCardChat) : React.JSX.Element{
    console.log(indexData);
    const navigation = useNavigation();
    return (
    <Pressable style={{marginTop:20, paddingHorizontal : 20,}} onPress={() => navigation.navigate(...['Chat',{data : dataMessages[indexData].data[0]}] as never)}>
        <Text style={{fontSize : 18,color : Colors.textColorSecondary,fontFamily : 'Manrope-SemiBold'}}>{title}</Text>
        <View style={{marginTop : 20, display : "flex", flexDirection : "row", alignItems : "center", gap : 20}}>
            <Image source={image as ImageProps} style={{borderRadius : 16, width : 50,height : 50}}/>
            <View style={{display : "flex",width : "87%",height : 60,flexDirection : "column",justifyContent : "space-evenly",}}>
                <View style={{display : "flex",flexDirection:"row",justifyContent : "space-between",}}>
                    <Text style={{fontSize: 16, fontFamily:'Manrope-SemiBold'}}>{name}</Text>
                    <Text style={{fontSize : 12,color : Colors.textColorSecondary,fontFamily : 'Manrope-SemiBold',paddingRight : 10,}}>{latestDate}</Text>
                </View>
                <View style={{width : "94%",display : "flex",flexDirection:"row",justifyContent:'space-between',alignItems:"center",gap:15}}>
                    <Text style={{fontSize: 12, fontFamily:'Manrope-Light'}}>{latestMessage.length > 40 ? latestMessage.substring(0,41).concat('...') : latestMessage}</Text>
                    {totalUnreadMessages? <Text style={{fontSize:10,fontFamily:'Manrope-Bold',paddingHorizontal : 8,paddingVertical: 1,backgroundColor:Colors.primaryShadow,borderRadius : 999,}}>{totalUnreadMessages}</Text> : <></>}
                </View>
            </View>
        </View>
    </Pressable>)
}

const Hero = () => {
    const [search,setSearch] = useState('');
    const [isFocus,setFocus] = useState(false);
    return(  
    <View style={{marginTop:20,paddingHorizontal : 24}}>
        <Text style={{marginLeft:5,fontSize: 20,fontFamily: 'Manrope-Bold'}}>Halaman Activity</Text>
        <View style={{width : '100%', marginTop : 20 ,display:"flex",flexDirection:"row",position : "relative"}}>
            <TextInput
                id="cari-dokter"
                style={{...style.searchDoctor, paddingRight : isFocus? 20: 50}}
                maxLength={30}
                placeholder="Cari chat dengan dokter..."
                onChangeText={text => setSearch(text)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
            <Image
                style={{position:"absolute", left : 10, bottom : 10}}
                source={require('../../assets/img/ic_search.png')}
            />
            <Image
                style={isFocus? {display:"none"} : {position:"absolute", right : 15, bottom : 10}}
                source={require('../../assets/img/ic_filter_search.png')}
            />
        </View>
    </View>)
}
const renderScene = SceneMap({
    first : DashboardActivity,
    second : HistoryTransaksi
})


const routes = [
    {key : 'first', title:'Chat'},
    {key : 'second', title:'Histori Pemesanan'}
]

const style = StyleSheet.create({
    ViewRoot : {
        marginTop : 20,
        width : "105%",
        height : 50,
        display : "flex",
        justifyContent  : "center",
        flexDirection : "row",
        gap : 30,
    },
    ActivePage : {
        display : "flex",
        justifyContent  : "center",
        alignItems : "center",
        flexDirection : "row",
        gap : 10,
        borderBottomColor : Colors.primary,
        borderBottomWidth : 1,
    },
    ActiveText : {fontFamily : "Manrope-Reguler",color : Colors.primary},
    HasNotif : {paddingHorizontal : 8,paddingVertical : 2,backgroundColor:Colors.primaryShadow,borderRadius : 999, fontSize: 14,color : Colors.primary},
    UnActivePage : {display : "flex",justifyContent  : "center",alignItems : "center",flexDirection : "row",gap : 10},
    container : {flex : 1, display : "flex", flexDirection : "column", alignItems: "center"},
    searchDoctor : { width :"100%",
        height : 45,
        paddingLeft : 50,
        borderRadius : 15,
        borderColor : Colors.primary,
        borderWidth : 1,
        fontSize : 16,
        color : Colors.textColor,
        fontFamily : 'Manrope-Regular'},
    image : {marginTop : 60 ,width:259,height:194},
    text : {width : "100%" ,textAlign : "center",fontSize : 16, fontFamily : "Manrope-Reguler" }
})


const messageDoctor1 = [
    {
        _id : 2321,
        message : "it's morning in Tokyo 😎",
        hour : '11:43',
        date : '16/01/2025',
        isImage : false,
        statusRead : true,
    },
    {
        _id : 2323,
        message : "What is the most populer meal in Japan",
        hour : '11:45',
        date : '16/01/2025',
        isImage : false,
        statusRead : true,
    },
    {
        _id : 2323,
        message : "Do You Like it?",
        hour : '11:45',
        date : '16/01/2025',
        isImage : false,
        statusRead : true,
    },
    {
        _id : 2321,
        message : "I think top two are:",
        hour : '11:50',
        date : '16/01/2025',
        isImage : false,
        statusRead : false,
    },
]
const messageDoctor2 = [
    {
        _id : 2321,
        message : "Haloo Doctor?",
        hour : '14:32',
        date : '13/01/2025',
        isImage : false,
        statusRead : true,
    },
    {
        _id : 2323,
        message : "Haloo",
        hour : '14:35',
        date : '13/01/2025',
        isImage : false,
        statusRead : true,
    },
    {
        _id : 2323,
        message : "What's your problem?",
        hour : '14:35',
        date : '16/01/2025',
        isImage : false,
        statusRead : false,
    },
    {
        _id : 2321,
        message : "Why I should read antibiotic?",
        hour : '14:35',
        date : '13/01/2025',
        isImage : false,
        statusRead : true,
    },
    {
        _id : 2323,
        message : {uri : "https://tse2.mm.bing.net/th?id=OIP.qtUTd3JeZ5G-mJ0qI5-FOAHaE3&pid=Api&P=0&h=220"},
        hour : '14:38',
        date : '13/01/2025',
        isImage : true,
        statusRead : true,
    },
]
const messageDoctor3 = [
    {
        _id : 2321,
        message : "Dok Besok Saya consult ya",
        hour : '11:43',
        date : '10/01/2025',
        isImage : false,
        statusRead : true,
    },
    {
        _id : 2323,
        message : "Baik Dicatat!",
        hour : '11:43',
        date : '10/01/2025',
        isImage : false,
        statusRead : true,
    },
]





const dataMessages = [
    {
        title : "Hari ini",
        data : [
            {
                name : "Drs. Athalia Putri",
                latestMessage : "Selamat pagi, apakah kamu tidur dengan nyenyak?",
                latestDate : 'Hari ini',
                totalMessages : 70,
                unReadMessages :  1,
                message : messageDoctor1,
                image: require("../../assets/img/drs_athalia_putri.png"),
            }
        ]
    },
    {
        title : "1 minggu",
        data : [
            {
                name : "Drs. Raki Devon",
                latestMessage : "Bagaimana Kabarnya?",
                latestDate : '17/6',
                totalMessages : 21,
                unReadMessages :  0,
                message : messageDoctor2,
                image: require("../../assets/img/dr_rd.png"),
            }
        ]
    },
    {
        title : "3 minggu",
        data : [
            {
                name : "Drs. Raki Devon",
                latestMessage : "Baik Dictatat.",
                latestDate : '17/6',
                totalMessages : 21,
                unReadMessages :  0,
                message : messageDoctor3,
                image: require("../../assets/img/dr_evan.png"),
            }
        ]
    },
]


function DashboardActivity(){
    let index = 0;
    return dataMessages.length == 0? 
    <NotFoundHistory/> :
     <View style={{flex : 1}}>
        <SectionList
        sections={dataMessages}
        keyExtractor={(item,index) => item.name + index}
        renderItem={({section : {title},item}) => (
            <CreateCardChat name={item.name} latestMessage={item.latestMessage} latestDate={item.latestDate} totalUnreadMessages={item.unReadMessages} image={item.image} title={title} indexData={index++}/>)
        }
        ListFooterComponent={() => <View style={{ height: 140 }} />}/>

    </View>
    }

function NotFoundHistory(){
    return(
        <View
            style={style.container}
        >
            <Image
                source={require('../../assets/img/not_found.png')}
                style={style.image}
            />
            <Text style={style.text}>Wah! Kamu belum pernah memesan dokter ya!</Text>
        </View>
    )
}

const Stack = createNativeStackNavigator();

function Activity(){
    const layout = useWindowDimensions();
    const [index,setIndex] = useState(0);
    return(
       <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="RootActivity" component={Header}/>
            <Stack.Screen name="Chat" component={Chat} options={{headerShown : false}}/>
            <Stack.Screen name="DetailPesanan" component={DetailPesanan} options={{headerShown : false}}/>
       </Stack.Navigator>
    )
}

function Header(){
    const layout = useWindowDimensions();
    const [index,setIndex] = useState(0);
    return(
    <View style={{flex :1}}>
        <Hero/>
        <TabView
            initialLayout={{width : layout.width}}
            navigationState={{index,routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={() => <TabBarActivity index={index} setIndex={setIndex}/>}/>
   </View>)
}

export default Activity;