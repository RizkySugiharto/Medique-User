
import { useEffect, useState } from "react";
import { Image, ImageProps, Pressable, SectionList, StyleSheet, Text,TextInput,useWindowDimensions,View } from "react-native";
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Colors from "../styles/colors";
import HistoryTransaksi from "./HistoryConsultationScreen";
import { useNavigation } from "@react-navigation/native";
import SearchBarW from "../components/SearchBarW";
import SessionStorage from "react-native-session-storage";



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
    unreadMessages : {name : string,unread : number}[],
}

const Hero = ({setMessages} : any) => {
    const [search,setSearch] = useState('');
    const [isFocus,setFocus] = useState(false);
    // const [messages,setMessages] = useState(JSON.parse(SessionStorage.getItem('dataMessages')))
    useEffect(() => {
        if(search.length == 0) return;
        setMessages(findTitleName(search))
        function findTitleName(name : string){
            const article = dataMessages.filter(value => {
                const hasArticle = value.data.filter(value2 => {
                    name = name.toLowerCase();
                    const nameDoctor = value2.name.toLowerCase();
                    if(
                        nameDoctor === name ||
                        nameDoctor.includes(name)
                    ){
                        return value2
                    }
                });
                if(hasArticle.length > 0) return value;
            });
            console.log(article.length);
            if(article.length > 0) return article;
            return dataMessages;
        }
    },[search])


    return(  
    <View style={{marginTop:20,paddingHorizontal : 24}}>
        <Text style={{marginLeft:5,fontSize: 20,fontFamily: 'Manrope-Bold'}}>Halaman Activity</Text>
       <SearchBarW  placeholder="Cari chat dengan dokter..." isFocus={isFocus} setFocus={setFocus} setSearch={setSearch}/>
    </View>
    )
}

function TabBarActivity({index,setIndex,unreadMessages} : InterfaceTabBarActivity){
    return(
        <View style={style.ViewRoot}>
            {routes.map((value,routeIndex) => {
                return <Pressable 
                    key={routeIndex + index}
                    style={isActive()? style.ActivePage : style.UnActivePage}
                    onPress={() => setIndex(routeIndex)}>
                    <Text style={isActive()? style.ActiveText : {}}>{unreadMessages[routeIndex].name}</Text>
                    <Text style={unreadMessages[routeIndex].unread > 0? style.HasNotif : {}}>{unreadMessages[routeIndex].unread > 0? unreadMessages[routeIndex].unread : '' }</Text>
                </Pressable>

                function isActive() : Boolean{
                    return routeIndex == index
                }

                

            })}
        </View>
    )
    
}

function CreateCardChat({title,name,latestMessage,latestDate,totalUnreadMessages,image,indexData} : propCardChat) : React.JSX.Element{
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

const methodData = {
    latestMessage : (arrMessage : InterfaceMessageDoctor[]) => arrMessage.filter((value,index) => index === (arrMessage.length - 1)),
    latestDate : (arrMessage : InterfaceMessageDoctor[]) => arrMessage[arrMessage.length - 1].date.replace('/','jk').split('/')[0].replace('jk','/'),
    totalUnreadMessages :  (arrMessage : InterfaceMessageDoctor[][]) => {
        let unReadMessages = 0;
        arrMessage.forEach((value,index) => {
          value.forEach((value2) => {
            unReadMessages += value2.statusRead? 0 : 1;
          })
        })
        return unReadMessages;
    }
}



const renderScene = SceneMap({
    first : DashboardActivity,
    second : HistoryTransaksi
})


const messageDoctor1 = [
    {
        _id : 2321,
        message : "it's morning in Tokyo 😎",
        hour : '11:43',
        date : '16/01/2025',
        type : "text",
        statusRead : true,
    },
    {
        _id : 2323,
        message : "What is the most populer meal in Japan",
        hour : '11:45',
        date : '16/01/2025',
        type : "text",
        statusRead : true,
    },
    {
        _id : 2323,
        message : "Do You Like it?",
        hour : '11:45',
        date : '16/01/2025',
        type : "text",
        statusRead : true,
    },
    {
        _id : 2321,
        message : "I think top two are:",
        hour : '11:50',
        date : '16/01/2025',
        type : "text",
        statusRead : false,
    },
]
const messageDoctor2 = [
    {
        _id : 2321,
        message : "Haloo Doctor?",
        hour : '14:32',
        date : '13/01/2025',
        type : "text",
        statusRead : true,
    },
    {
        _id : 2323,
        message : "Haloo",
        hour : '14:35',
        date : '13/01/2025',
        type : "text",
        statusRead : true,
    },
    {
        _id : 2323,
        message : "What's your problem?",
        hour : '14:35',
        date : '16/01/2025',
        type : "text",
        statusRead : true,
    },
    {
        _id : 2321,
        message : "Why I should read antibiotic?",
        hour : '14:35',
        date : '13/01/2025',
        type : "text",
        statusRead : true,
    },
    {
        _id : 2323,
        message : {uri : "https://tse2.mm.bing.net/th?id=OIP.qtUTd3JeZ5G-mJ0qI5-FOAHaE3&pid=Api&P=0&h=220"},
        hour : '14:38',
        date : '13/01/2025',
        type : "image",
        statusRead : true,
    },
]
const messageDoctor3 = [
    {
        _id : 2321,
        message : "Dok Besok Saya consult ya",
        hour : '11:43',
        date : '10/01/2025',
        type : "text",
        statusRead : true,
    },
    {
        _id : 2323,
        message : "Baik Dicatat!",
        hour : '11:43',
        date : '10/01/2025',
        type : "text",
        statusRead : true,
    },
    {
        _id : 2323,
        message : "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        hour : '11:43',
        date : '10/01/2025',
        type : "document",
        statusRead : true,
    },
]


const routes = [
    {key : 'first', title:'Chat',unreadMessages : [{name : "Chat",unread : methodData.totalUnreadMessages([messageDoctor1,messageDoctor2,messageDoctor3])},{name : "Histori Pemesanan",unread : 0}]},
    {key : 'second', title:'Histori Pemesanan',unreadMessages :  [{name : "Chat",unread : methodData.totalUnreadMessages([messageDoctor1,messageDoctor2,messageDoctor3])},{name : "Histori Pemesanan",unread : 0}]}
]

export const style = StyleSheet.create({
    ViewRoot : {
        marginTop : 20,
        width : "105%",
        height : 40,
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




interface InterfaceMessageDoctor{
    _id : number,
    message : {uri : string} | string,
    hour : string,
    date : string,
    type : string,
    statusRead : boolean,
}

const dataMessages = [
    {
        title : "Hari ini",
        data : [
            {
                name : "Drs. Athalia Putri",
                latestMessage : typeof methodData.latestMessage(messageDoctor1)[0].message === "object"? "((image))" : methodData.latestMessage(messageDoctor1)[0].message ,
                latestDate : methodData.latestDate(methodData.latestMessage(messageDoctor1)),
                totalMessages : messageDoctor1.length,
                unReadMessages :  messageDoctor1.filter(value => !value.statusRead).length,
                message : messageDoctor1,
                image: require("../assets/img/drs_athalia_putri.png"),
            }
        ]
    },
    {
        title : "1 minggu",
        data : [
            {
                name : "Dr Raki Devon",
                latestMessage : typeof methodData.latestMessage(messageDoctor2)[0].message === "object"? "((image))" : methodData.latestMessage(messageDoctor2)[0].message,
                latestDate : methodData.latestDate(methodData.latestMessage(messageDoctor2)),
                totalMessages : messageDoctor2.length,
                unReadMessages :  messageDoctor2.filter(value => !value.statusRead).length,
                message : messageDoctor2,
                image: require("../assets/img/dr_rd.png"),
            }
        ]
    },
    {
        title : "3 minggu",
        data : [
            {
                name : "Dr. Evan",
                latestMessage :typeof methodData.latestMessage(messageDoctor3)[0].message === "object"? "((image))" : methodData.latestMessage(messageDoctor3)[0].message,
                latestDate : methodData.latestDate(methodData.latestMessage(messageDoctor3)),
                totalMessages : messageDoctor3.length,
                unReadMessages :  messageDoctor3.filter(value => !value.statusRead).length,
                message : messageDoctor3,
                image: require("../assets/img/dr_evan.png"),
            }
        ]
    },
]

SessionStorage.setItem('dataMessages',JSON.stringify(dataMessages));




function Activity(){
    let index3 = 0;
    const layout = useWindowDimensions();
    const [index,setIndex] = useState(0);
    const [messages,setMessages] = useState(dataMessages);
    const [currentIndex,setCurrentIndex] = useState(0);
    return(
    <View style={{flex :1}}>
        <Hero setMessages={setMessages}/>
        <View style={style.ViewRoot}>
            {routes.map((value,index) => {
                return<Pressable 
                    key={index}
                    style={isActive()? style.ActivePage : style.UnActivePage}
                    onPress={() => setCurrentIndex(index)}>
                    <Text style={isActive()? style.ActiveText : {}}>{value.unreadMessages[index].name}</Text>
                    <Text style={value.unreadMessages[index].unread > 0? style.HasNotif : {}}>{value.unreadMessages[index].unread > 0? value.unreadMessages[index].unread : '' }</Text>
                </Pressable>
                function isActive(){
                    if(currentIndex === index) return true;
                    return false;
                }
            })}
        </View>
        {currentIndex? <HistoryTransaksi/> : 
            <View style={{flex : 1}}>
                <SectionList
                sections={messages}
                keyExtractor={(item,index) => item.name + index}
                renderItem={({section : {title},item}) => (
                    <CreateCardChat name={item.name} latestMessage={item.latestMessage as string} latestDate={item.latestDate} totalUnreadMessages={item.unReadMessages} image={item.image} title={title} indexData={index3++}/>)
                }
                ListFooterComponent={() => <View style={{ height: 140 }} />}/>
            </View>
        }
   </View>
    )
}

function DashboardActivity(){
    let index = 0;
    return <View/>;
}

function NotFoundHistory(){
    return(
        <View
            style={style.container}
        >
            <Image
                source={require('../assets/img/not_found.png')}
                style={style.image}
            />
            <Text style={style.text}>Wah! Kamu belum pernah memesan dokter ya!</Text>
        </View>
    )
}






export default Activity;