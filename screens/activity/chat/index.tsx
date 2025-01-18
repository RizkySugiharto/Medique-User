import {Alert, Image, ImageProps, ImageSourcePropType, Pressable, ScrollView, SectionList, SectionListScrollParams, StyleSheet, Text,TextInput,useWindowDimensions,View} from 'react-native';
import Colors, { primary } from '../../../styles/colors';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RNFS from 'react-native-fs';
import { createRef, ReactElement, useEffect, useRef, useState } from 'react';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import Button from '../../../components/Button';

interface InterfaceMessages{
    title : string,
    data  : InterfaceMessage[],
}

interface InterfaceDataDoctor{
    name : string,
    latestMessage : string,
    latestDate : string,
    totalMessages : number,
    unReadMessages :  number,
    message : InterfaceMessage[],
    image: NodeRequire,
}

function Chat(){
    const {params} : RouteProp<{params : {data : InterfaceDataDoctor}},'params'> = useRoute();
    const data = params.data;
    const [messages,setMessages] = useState(data.message);
    const layout = useWindowDimensions();
    const crRef = createRef<SectionList>();

    return(
        <View style={{flex : 1}}>
            
            <Header profile={data}/>
            <SectionList
                ref={crRef}
                sections={[{title : "messages",data : messages}]}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item,index) => index + 'asw'}
                renderItem={({item}) => <LoadMessage message={item}/>}
                ListFooterComponent={() => <View style={{height : 100}}></View>}
            />
           <SendMessageBar setMessages={setMessages}/>
           {/* <Button label="Click Me!" onPress={async() => await downloadUrl("https://media2.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png","logoUrl","png")}/> */}
        </View>
    )

    async function downloadUrl(url : string,name : string,format : string){
        const toFile = `${RNFS.DocumentDirectoryPath}/${name + "2s"}.jpg`;
        console.log(toFile);
        const dest = "/storage/emulated/0/download/asw";
        RNFS.downloadFile({
            fromUrl : url,
            toFile,
            background : true, // ios only,
            discretionary : true, //ios only,
            progress : (res) => {
                console.log("Res By Written : " + res.bytesWritten);
                console.log("Res By Content Of Length : " + res.contentLength);
                console.log('Progres => ' + res.bytesWritten / res.contentLength * 100)
            }
        }).promise
        .then((response) => {
            console.log('Succesfully Download\nResponse => ' + JSON.stringify(response));
        })
        .catch((error) => {
            console.log("Failed Download File\nError => " + error);
        })

    };

}

function PickSingleFile({isImage,component,setMessages} : {isImage : boolean,component : ReactElement, setMessages : React.Dispatch<any>}) : ReactElement{
        const maxFileSize = 2000000; // it's mean 2Mb
        const {pdf,doc,docx,images} = DocumentPicker.types;
        const supportedFile = [pdf,doc,docx,images];
        const pickFile = async() => {
       try{
            const res = await DocumentPicker.pick({
                type : DocumentPicker.types.allFiles
            });
            
            const file = res[0];
            if(file.size as number > maxFileSize) {Alert.alert(`Warning!`,`File Size Is ${Math.ceil(file.size as number /1000000)}Mb\nMaximum Size Is 2 MB!`); return <View></View>};
            console.log(file)
            // if(isImage && file.type?.startsWith('image/')){
            //     console.log('File is Image');
            //     console.log('Link Source : ' + file.uri);
            //     setMessages((prev : any) => [...prev,createNewMessage(file.uri,true)])
            // }else if(!isImage && isSupportedFile(file)){
            //     console.log('File is Document or Images');
            //     console.log(file.type);
            // }else{
            //     console.log(file.type)
            //     Alert.alert('Warning', 'Sorry file format is not supported!')
            // }
       }catch (err){
            if(DocumentPicker.isCancel(err)){
                Alert.alert('Cancelled','The File Was Cancelled!');
            }else{
                console.log('Error : ' + err);
            }
       }
    }

    function isSupportedFile(file : DocumentPickerResponse){
        const {pdf,doc,docx,images} = DocumentPicker.types;
        const supportedFile = [pdf,doc,docx,images];

        for(let i =0; i < supportedFile.length; i++){
            if(file.type === supportedFile[i] || file.type?.startsWith('image/')){
                return true;
            }
        }
        return false;
    }
    return <Pressable onPress={pickFile}>{component}</Pressable>
}

function SendMessageBar({setMessages}: { setMessages : React.Dispatch<any>}){
    const [isFocus,setFocus] = useState(false);
    const [text,setText] = useState("");
    return( 
    <View style={{width:"100%",height: 80,display : "flex",flexDirection : "row",justifyContent : "space-between", alignItems : "center",gap:5,paddingTop : 10,paddingHorizontal : 15,borderTopWidth : .4,position : 'absolute',bottom : 0,left : 0,backgroundColor: Colors.secondary}}>
        <PickSingleFile isImage={false} setMessages={setMessages} component={<Image style={{width : 29, height :29}} source={require('../../../assets/img/ic_attach.png')}/>}/>
        <View style={{position : 'relative',paddingHorizontal : 10}}>
            <TextInput style={{width : 270,paddingHorizontal : 10,paddingRight : 60,borderWidth : .4,borderRadius : 20}} placeholder='Message' value={text} onChangeText={text => {setText(text); return text.length > 0? setFocus(previus => true) : setFocus(previus => false)}}/>
            <PickSingleFile isImage={true} setMessages={setMessages} component={<Image style={{width : 24, height :24,position : 'absolute',right : 15,bottom : 7}} source={require('../../../assets/img/ic_camera.png')}/>}/>
        </View>
        {text.length === 0?<Image style={{width : 18, height :24}} source={require('../../../assets/img/ic_record_audio.png')}/> : 
        <Pressable onPress={() => {setText(''); setFocus(false); setMessages((prev: any) => [...prev,createNewMessage(text)])}}><Image style={{width : 28, height :28,}} source={require('../../../assets/img/ic_send_message.png')}/></Pressable>}
    </View>)
}

function Header({profile} : {profile : InterfaceDataDoctor}){
    return(
        <View style={{width : "100%",display : "flex",flexDirection : "row",justifyContent : "space-between",alignItems : "center",paddingHorizontal : 18,paddingVertical : 20}}>
           <BackTab/>
           <ProfileDoctor profile={profile}/>
           <Image source={require('../../../assets/img/ic_baseline-phone.png')}/>
        </View>
    )
}

function BackTab(){
    const navigation = useNavigation();
    return (
        <Pressable style={{display : "flex",flexDirection : "row",alignItems:"center",gap : 10}} onPress={() => navigation.goBack()}>
             <Image
                source={require('../../../assets/img/ic_back_arrow_blue.png')}
                style={{width: 12, height : 21}}
            />
            <Text style={Styles.primaryText}>Chats</Text>
        </Pressable>
    )
}

interface InterfaceDocterProfile{
    name : string,
    lastOnline : string,
    statusOnline : string,
    imagePath : ImageSourcePropType,
    acceptCall : boolean

}

const docterProfile = {
    name : "Drs. Athalia Putri",
    lastOnline : '19:30 PM',
    statusOnline : 'last seen just now',
    imagePath : require('../../../assets/img/drs_athalia_putri.png'),
    acceptCall : true
}

function ProfileDoctor({profile} : {profile : InterfaceDataDoctor}){
    return (
        <View style={{width:200,display : "flex",flexDirection : "row",alignItems:"center",gap : 10}}>
            <Image
                source={profile.image as ImageProps}
                style={{width: 37, height : 37,borderRadius : 9999}}
            />
            <View>
                <Text style={{fontSize : 16,fontFamily : 'Manrope-SemiBold'}}>{profile.name}</Text>
                <Text style={{fontSize : 13,fontFamily : 'Manrope-Reguler'}}>Last see in a minute</Text>
            </View>
        </View>
    )
}

function LoadMessage({message} : {message : InterfaceMessage}){
    const userId = 2321;
    if(message._id === userId){
        return <UserText message={message} key={message._id}/>
    }else{
        return <DoctorText message={message} key={message._id}/>
    }
}

interface InterfaceMessage{
    _id : number,
    message : string | {uri : string},
    hour : string,
    date : string,
    isImage : boolean,
    statusRead : boolean
}

function DownloadFile(name : string,uri : string){
    const toFile = `${RNFS.DownloadDirectoryPath}/${name}`

    const options = {
        fromUrl : uri,
        toFile,
        begin : (res : any) => {
            console.log('Download Started!');
        }
        // prgores : (res) => 
    }
    RNFS.downloadFile(options).promise
    .then(res => {
        console.log('Download Was SuccesFully!')
    })
    .catch(err => {
        console.log('Something error : ' + err);
    })
}

function checkImageFormat(typeImage : string){
    return typeImage.split('image/')
}

function UserText({message} : {message : InterfaceMessage}){
    const elementMessage = message.isImage? <FormatImage message={message} isDoctor={false}/> : 
    <View style={{display:"flex",flexDirection : "row",justifyContent : "flex-end",marginTop : 20,paddingHorizontal : 20}}>
    <View style={{maxWidth : 280, display : "flex",flexDirection : "row",gap:6,padding : 8,backgroundColor : Colors.primary,borderRadius : 15}}>
        <Text style={{maxWidth : 200,fontSize : 17,color : Colors.textColorWhite}}>{message.message as string}</Text>
        <View style={{display : "flex",flexDirection : "row",alignItems : "center",gap : 3,paddingRight : 5}}>
            <Text style={{height : "100%",fontSize : 11,fontFamily:"Manrope-Reguler",color : Colors.textColorWhite,verticalAlign : "bottom"}}>{message.hour}</Text>
            <Image style={{marginTop: 7, width:14,height : 9}} source={require('../../../assets/img/ic_read_chat.png')}/>
        </View>
    </View>
</View>
    return(elementMessage)
}
function DoctorText({message} : {message : InterfaceMessage}){
    const elementMessage = message.isImage? <FormatImage message={message} isDoctor={true}/> : 
    <View style={{display:"flex",flexDirection : "row",justifyContent : "flex-start",marginTop : 20,paddingHorizontal : 20}}>
        <View style={{maxWidth : 280, display : "flex",flexDirection : "row",gap:6,padding : 8 ,borderRadius : 15,borderWidth : .3}}>
            <Text style={{maxWidth : 200,fontSize : 17,}}>{message.message as string}</Text>
            <View style={{display : "flex",flexDirection : "row",alignItems : "center"}}>
                <Text style={{height : "100%",fontSize : 11,fontFamily:"Manrope-Reguler",verticalAlign : "bottom"}}>{message.hour}</Text>
            </View>
        </View>
    </View>
    return(elementMessage);
}

function FormatImage({message,isDoctor = false} : {message : InterfaceMessage,isDoctor : boolean}){
    const [onHover,setOnHover] = useState(false);
    return(
        <View style={{display:"flex",flexDirection : "row",justifyContent : isDoctor? "flex-start" : "flex-end",marginTop : 20,paddingHorizontal : 20}}>
        <Pressable style={{position : 'relative',maxWidth : 280, display : "flex",flexDirection : "row",gap:6}} onPress={() => {setOnHover(true)}}>
            <Image source={message.message as ImageProps} style={{width : 120,height : 120,borderRadius : 8}} />
            <Text style={{display: onHover? "flex" : "none", position : 'absolute',bottom : 45, left : 5,color : Colors.textColorWhite,fontSize : 18,fontFamily:'Manrope-Bold'}}>Downloaded</Text>
            <Text style={{position : 'absolute',bottom : 0, right : 5,color : Colors.textColorWhite}}>{message.hour}</Text>
        </Pressable>
    </View>
    )
}

function createNewMessage(message : string,isImage : boolean = false) : InterfaceMessage{
    const currentId = 2321;
    const date = new Date().toLocaleDateString('id-ID');
    const hour = new Date().toLocaleTimeString('id-ID').replace('.',':').split('.')[0];
    return {
        _id  : 2321,
        message : isImage ? {uri : message} : message,
        date : date,
        hour : hour,
        isImage : isImage,
        statusRead : false
    }
}
const messageData = [
    {
        _id : 2321,
        message : "it's morning in Tokyo 😎",
        hour : '11:43',
        date : '16/01/2025',
        statusRead : true,
    },
    {
        _id : 2323,
        message : "What is the most populer meal in Japan",
        hour : '11:45',
        date : '16/01/2025',
        statusRead : true,
    },
    {
        _id : 2323,
        message : "Do You Like it?",
        hour : '11:45',
        date : '16/01/2025',
        statusRead : true,
    },
    {
        _id : 2321,
        message : "I think top two are:",
        hour : '11:50',
        date : '16/01/2025',
        statusRead : false,
    },
]


const Styles = StyleSheet.create({
    primaryText : {color : "#037EE5",fontSize : 17,fontFamily : "Manrope-Reguler"}
})

export default Chat;