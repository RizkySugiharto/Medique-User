import {Alert, Image, ImageProps, ImageSourcePropType, PermissionsAndroid, Platform, Pressable, ScrollView, SectionList, SectionListScrollParams, StyleSheet, Text,TextInput,useWindowDimensions,View} from 'react-native';
import Colors, { primary } from '../styles/colors';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import RNFS, { DownloadFileOptions } from 'react-native-fs';
import React, { createRef, ReactElement, useEffect, useRef, useState } from 'react';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import TakeImage from '../utils/TakeImage';
interface InterfaceDataDoctor{
    name : string,
    latestMessage : string,
    latestDate : string,
    totalMessages : number,
    unReadMessages :  number,
    message : InterfaceMessage[],
    image: NodeRequire,
}

interface InterfaceDocterProfile{
    name : string,
    lastOnline : string,
    statusOnline : string,
    imagePath : ImageSourcePropType,
    acceptCall : boolean
}

interface InterfaceMessage{
    _id : number,
    message : string | {uri : string},
    hour : string,
    date : string,
    type : string,
    statusRead : boolean
}


function Chat(){
    const {params} : RouteProp<{params : {data : InterfaceDataDoctor}},'params'> = useRoute();
    const data = params.data;
    const [messages,setMessages] = useState(data.message);
    const [document,setDocument] = useState<any>(null);
    const [image,setImage] = useState({uri : ''});
    const layout = useWindowDimensions();
    const crRef = createRef<SectionList>();

    useEffect(() => {
        if(!image.uri) return;
        createNewMessage(image.uri,"image",setMessages);
    },[image])

    useEffect(() => {
        if(!document) return;
        const size = document.size / 1000000;
        createNewMessage(document.uri,document.type,setMessages);
    },[document])


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
           <SendMessageBar setMessages={setMessages} setImage={setImage} image={image} setDocument={setDocument}/>
        </View>
    )
}

function SendMessageBar({setMessages,setImage,image,setDocument}: { setDocument : React.Dispatch<any>,setMessages : React.Dispatch<any>,setImage : React.Dispatch<any>, image : any}){
    const [isFocus,setFocus] = useState(false);
    const [text,setText] = useState("");
    return( 
    <View style={{width:"100%",height: 80,display : "flex",flexDirection : "row",justifyContent : "space-between", alignItems : "center",gap:5,paddingTop : 10,paddingHorizontal : 15,borderTopWidth : .4,position : 'absolute',bottom : 0,left : 0,backgroundColor: Colors.secondary}}>
        <View style={{ flexBasis: 30, alignItems: 'center' }}>
            <Pressable onPress={() => TakeImage.TakeDocumentFromLibrary(setDocument)}>
                <Image style={{width : 29, height :29}} source={require('../assets/img/ic_attach.png')}/>
            </Pressable>
        </View>
        <View style={{position : 'relative',paddingHorizontal : 10, flex: 1}}>
            <TextInput style={{paddingHorizontal : 10,paddingRight : 60,borderWidth : .4,borderRadius : 20}} placeholder='Message' value={text} onChangeText={text => {setText(text); return text.length > 0? setFocus(previus => true) : setFocus(previus => false)}}/>
            <Pressable onPress={() => TakeImage.TakePicture(setImage,true)}>
                <Image style={{width : 24, height :24,position : 'absolute',right : 15,bottom : 7}} source={require('../assets/img/ic_camera.png')}/>
            </Pressable>
        </View>
        <View style={{ flexBasis: 30, alignItems: 'center' }}>
            {text.length === 0  ?
            <Image style={{width : 18, height :24}} source={require('../assets/img/ic_record_audio.png')}/>
            : 
            <Pressable onPress={() => {setText(''); setFocus(false); createNewMessage(text,"text",setMessages)}}>
                <Image style={{width : 28, height :28,}} source={require('../assets/img/ic_send_message.png')}/>
            </Pressable>
            }
        </View>
    </View>)
}

function Header({profile} : {profile : InterfaceDataDoctor}){
    return(
        <View style={{width : "100%",display : "flex",flexDirection : "row",justifyContent : "space-between",alignItems : "center",paddingHorizontal : 10,paddingVertical : 20}}>
           <BackTab/>
           <ProfileDoctor profile={profile}/>
           <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/img/ic_baseline-phone.png')}/>
           </View>
        </View>
    )
}

function BackTab(){
    const navigation = useNavigation();
    return (
        <Pressable style={{flex: 0.2, display : "flex",flexDirection : "row",alignItems:"center",gap : 10}} onPress={() => navigation.goBack()}>
             <Image
                source={require('../assets/img/ic_back_arrow_blue.png')}
                style={{width: 12, height : 21}}
            />
            <Text style={Styles.primaryText}>Chats</Text>
        </Pressable>
    )
}


const docterProfile = {
    name : "Drs. Athalia Putri",
    lastOnline : '19:30 PM',
    statusOnline : 'last seen just now',
    imagePath : require('../assets/img/drs_athalia_putri.png'),
    acceptCall : true
}

function ProfileDoctor({profile} : {profile : InterfaceDataDoctor}){
    return (
        <View style={{flex: 0.6, width:200,display : "flex",flexDirection : "row",alignItems:"center",justifyContent:'center',gap : 10}}>
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



function UserText({message} : {message : InterfaceMessage}){
    const elementMessage = message.type !== "text"? <FormatImage message={message} isDoctor={false}/> : 
    <View style={{display:"flex",flexDirection : "row",justifyContent : "flex-end",marginTop : 20,paddingHorizontal : 20}}>
    <View style={{maxWidth : 280, display : "flex",flexDirection : "row",gap:6,padding : 8,backgroundColor : Colors.primary,borderRadius : 15}}>
        <Text style={{maxWidth : 200,fontSize : 17,color : Colors.textColorWhite}}>{message.message as string}</Text>
        <View style={{display : "flex",flexDirection : "row",alignItems : "center",gap : 3,paddingRight : 5}}>
            <Text style={{height : "100%",fontSize : 11,fontFamily:"Manrope-Reguler",color : Colors.textColorWhite,verticalAlign : "bottom"}}>{message.hour}</Text>
            <Image style={{marginTop: 7, width:14,height : 9}} source={require('../assets/img/ic_read_chat.png')}/>
        </View>
    </View>
</View>
    return(elementMessage)
}
function DoctorText({message} : {message : InterfaceMessage}){
    const elementMessage = message.type !== "text"? <FormatImage message={message} isDoctor={true}/> : 
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
    const [downloaded,setDownloaded] = useState(false);

    const accessExternalDownload = async(url : string) => {
        if(Platform.OS ="android"){
            try{
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title : "Cool Photo Like Me!",
                        message : 
                        'cool photo need' + 
                        'access your camera!',
                        buttonNeutral : 'Ask me later',
                        buttonNegative : 'Cancel',
                        buttonPositive : 'OK',
                    },
                );

                if(granted === PermissionsAndroid.RESULTS.GRANTED){
                    downloadFile(url, true);
                }
            }catch(err){
            }
        }
        async function downloadFile(fromUrl : string, isImage: boolean){
            const randomNumber = Math.ceil(new Date().getTime() * Math.random() * 100 / 92);
            const toFile = `${RNFS.DownloadDirectoryPath}/images${randomNumber}${isImage? '.jpg' : '.pdf' }`;
            if(fromUrl.startsWith('data:image')) return base64ToFile(fromUrl,toFile);
            const options : DownloadFileOptions = {
                fromUrl,
                toFile,
                begin : (res : any) => {
                    console.log("Download Started => " + res)
                }
            } 

            try{
                const result = await RNFS.downloadFile(options).promise
                .then((res : any) => setDownloaded(true))
                .catch((err : any) => console.log("Error => " + err));
            }catch(err){
                console.log("Error => " + err);
            }

            function base64ToFile(base64String : string, path :string) {
                const base64Data = base64String.replace(/^data:.+;base64,/, '');
                
                RNFS.writeFile(path, base64Data, 'base64')
                  .then(() => {
                    console.log('File berhasil disimpan di:', path);
                    setDownloaded(true);
                  })
                  .catch(err => {
                    console.error('Gagal menyimpan file:', err);
                  });
              }
              

        }
    }
    return(
        message.type === "image"? <View style={{display:"flex",flexDirection : "row",justifyContent : isDoctor? "flex-start" : "flex-end",marginTop : 20,paddingHorizontal : 20}}>
        <Pressable style={{position : 'relative',maxWidth : 280, display : "flex",flexDirection : "row",gap:6}} onPress={() => {
            accessExternalDownload(message.message as string);
        }}>
            <Image source={message.message as ImageProps} style={{width : 120,height : 120,borderRadius : 8}} />
            <Text style={{display: downloaded? "flex" : "none", position : 'absolute',bottom : 45, left : 5,color : Colors.textColorWhite,fontSize : 18,fontFamily:'Manrope-Bold'}}>Downloaded</Text>
            <Text style={{position : 'absolute',bottom : 0, right : 5,color : Colors.textColorWhite}}>{message.hour}</Text>
        </Pressable>
    </View> : 
    <View style={{flexDirection : "row",justifyContent : isDoctor? "flex-start" : "flex-end",marginTop : 20,paddingHorizontal : 20}}>
        <Pressable style={{position : 'relative',width : 100,height : 100,gap:6,backgroundColor :Colors.primary,borderRadius:5}} onPress={() => {
            if(message.message.toString().startsWith('image/')){
                accessExternalDownload(message.message.toString());
            }
        }}>
            <View style={{
                padding : 5,
                alignItems : "center",
                justifyContent : "center"
            }}>
                <Image source={require('../assets/img/ic_document.png')} style={{marginTop : 10,width : 40,height : 40,borderRadius : 8}} />
                <Text style={{marginTop : 3,color : Colors.textColorWhite,textAlign : "center"}}>{message.type}</Text>
            </View>
            <Text style={{display: downloaded? "flex" : "none", position : 'absolute',bottom : 45, left : 5,color : Colors.textColorWhite,fontSize : 18,fontFamily:'Manrope-Bold'}}>Downloaded</Text>
            <Text style={{position : 'absolute',bottom : 0, right : 5,color : Colors.textColorWhite}}>{message.hour}</Text>
            <View style={{height : 15}} />
        </Pressable>
    </View>
    )
}

function createNewMessage(message : string,type : string,setMessages : React.Dispatch<any>){
    if(message.length ==0) return;
    const _id = 2321;
    const date = new Date().toLocaleDateString('id-ID');
    const hour = new Date().toLocaleTimeString('id-ID').replace('.',':').split('.')[0];
    const newMessage = {
        _id,
        message : type !=="image"? message : {uri : message},
        date : date,
        hour : hour,
        type,
        statusRead : false
    }
    return setMessages((prev : any) => [...prev,newMessage]);
}



const Styles = StyleSheet.create({
    primaryText : {color : "#037EE5",fontSize : 17,fontFamily : "Manrope-Reguler"}
})

export default Chat;