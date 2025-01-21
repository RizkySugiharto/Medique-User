import {Alert, Image, ImageProps, ImageSourcePropType, PermissionsAndroid, Platform, Pressable, ScrollView, SectionList, SectionListScrollParams, StyleSheet, Text,TextInput,useWindowDimensions,View} from 'react-native';
import Colors, { primary } from '../styles/colors';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import RNFS, { DownloadFileOptions } from 'react-native-fs';
import React, { createRef, ReactElement, useEffect, useRef, useState } from 'react';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import TakeImage from '../utils/TakeImage';
import RNFetchBlob from 'react-native-blob-util';
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
    message : string | {uri : string,name : string},
    hour : string,
    date : string,
    type : string,
    statusRead : boolean
}
interface InterfaceMessage{
    _id : number,
    message : string | {uri : string,name : string},
    hour : string,
    date : string,
    type : string,
    statusRead : boolean
}


function Chat(){
    const {params} : RouteProp<{params : {data : InterfaceDataDoctor}},'params'> = useRoute();
    const data = params.data;
    const [messages,setMessages] = useState(data.message);
    const [document,setDocument] = useState<DocumentPickerResponse>({uri : "",name : "",fileCopyUri : "",type : "",size : 25000});
    const [image,setImage] = useState<{uri : string,name : string,type : string}>();
    const layout = useWindowDimensions();
    const crRef = createRef<SectionList>();

    useEffect(() => {
        if(image?.uri.length == 0 || !image) return;
        createNewMessageImage(image as {uri : string,name : string,type : string},setMessages);
    },[image]);

    useEffect(() => {
        if(!document || document.uri.length == 0) return;
        if((document.size as number / 1000000) > 2.5) return Alert.alert("Warning!","Maximum File is 2.5MB");
        const {name,type,status} = makeName(document) as {name : string,type : string,status : boolean};
        if(!status) return;
        checkIsImage(document)? createNewMessageImage({uri : document.uri,type,name},setMessages) :  createNewMessageFile({uri : document.uri,type,name},setMessages);
    },[document]);

    function makeName(document : DocumentPickerResponse){
        if(document.uri.length === 0) return;
        let arrName = document.name?.split(".") as string[];
        let nama = "";
        arrName.forEach((value,index) => {
            if(index < (arrName?.length - 1)){
                nama += value;
            }else{
                nama += `.${value}`
            }
       })
       return nama.length > 0? {name : nama,type : arrName[arrName.length -1] ,status : true} : {name : nama,status : false} ;
    }

    function checkIsImage(document : DocumentPickerResponse) : boolean{
        const listFormatImage = ["png","jpeg","jpg",];
        let arrName = document.name?.split(".") as string[];
        const result = listFormatImage.filter((value) => arrName[arrName.length -1].toLocaleLowerCase() === value)
        return result.length > 0? true: false;
    }


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
            <Pressable onPress={() => {setText(''); setFocus(false); createNewMessage(text,setMessages)}}>
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

    async function downloadFile(fromUrl : string,isImage = true){

        const randomNumber = Math.ceil(new Date().getTime() * Math.random() * 100 / 92);

        // const toFile = `${RNFS.DownloadDirectoryPath}/${isImage? 'document' : 'image' }${randomNumber}${isImage? '.jpg' : '.pdf' }`;
        const toFile = `${RNFS.DownloadDirectoryPath}/${isImage? 'document' : 'image' }${randomNumber}.${message.type}`;
        console.log(message.type === "jpg");
        console.log(message.type);
        if(fromUrl.startsWith('data:image')) return base64ToFile(fromUrl,toFile);
        if(fromUrl.startsWith('content:') && message.type === "jpg") return await baseContentFileJPG(fromUrl,toFile);
        if(fromUrl.startsWith('content:') && isDocument(message)) return await baseContentDocument(fromUrl,toFile);
        if(fromUrl.startsWith('content:')) return await baseContentFile(fromUrl,toFile);
        console.log("masuk sini");
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
        async function baseContentFile(contetUrl : string, path :string) {
            try{
                const fileContents = await RNFS.readFile(contetUrl,'utf8');
                RNFS.writeFile(path, fileContents , 'base64')
                setDownloaded(true);
                console.log('File berhasil disimpan di:', path);
            }catch(err){
                console.log("error when download file from contentFile =>" + err);
            }
        }

        async function baseContentFileJPG(contetUrl : string, path :string){
            try{
                await RNFetchBlob.fs
                .cp(contetUrl,path)
                .then(() => {console.log('File berhasil disimpan di:', path); setDownloaded(true);})
                .catch((err: Error) => console.log("error when download file from contentFile (JPG) =>" + err))
            }catch(error){
                console.log("error when download file from contentFile (JPG) =>" + error);
            }
        }
        async function baseContentDocument(contetUrl : string, path :string){
            try{
                await RNFetchBlob.fs
                .cp(contetUrl,path)
                .then(() => {console.log('File berhasil disimpan di:', path); setDownloaded(true)})
                .catch((err: Error) => console.log("error when download file from contentFile (Document) =>" + err))
            }catch(error){
                console.log("error when download file from contentFile (Document) =>" + error);
            }
        }
        function isDocument(message : InterfaceMessage)  :boolean{
            const documentType = ["docs","docx","pdf","csv"];
            const result = documentType.filter(value => message.type.toLowerCase() === value);
            return result.length > 0? true : false;
        }
    }

    function checkIsImage(message : InterfaceMessage) : boolean{
        console.log(message);
        const listFormatImage = ["png","jpeg","jpg",];
        const result = listFormatImage.filter((value) => message.type.toLowerCase() === value);
        return result.length > 0? true: false;
    }

    return(
        checkIsImage(message)? <View style={{display:"flex",flexDirection : "row",justifyContent : isDoctor? "flex-start" : "flex-end",marginTop : 20,paddingHorizontal : 20}}>
        <Pressable style={{position : 'relative',maxWidth : 280, display : "flex",flexDirection : "row",gap:6}} onPress={() => {
            downloadFile(message.message instanceof String && message.message.uri);
        }}>
            <Image source={message.message as ImageProps} style={{width : 120,height : 120,borderRadius : 8}} />
            <Text style={{display: downloaded? "flex" : "none", position : 'absolute',bottom : 45, left : 5,color : Colors.textColorWhite,fontSize : 18,fontFamily:'Manrope-Bold'}}>Downloaded</Text>
            <Text style={{position : 'absolute',bottom : 0, right : 5,color : Colors.textColorWhite}}>{message.hour}</Text>
        </Pressable>
    </View> : 
    <View style={{flexDirection : "row",justifyContent : isDoctor? "flex-start" : "flex-end",marginTop : 20,paddingHorizontal : 20}}>
        <Pressable style={{position : 'relative',gap:6,backgroundColor :Colors.primary,borderRadius:5}} onPress={() => {
            downloadFile(message.message.uri,false);
        }}>
            <View style={{
                padding : 5,
                alignItems : "center",
                justifyContent : "center"
            }}>
                <Image source={require('../assets/img/ic_document.png')} style={{marginTop : 10,width : 40,height : 40,borderRadius : 8}} />
                <Text style={{marginTop : 3,color : Colors.textColorWhite,textAlign : "center",maxWidth : 120}}>{message.message.name}</Text>
            </View>
            <Text style={{display: downloaded? "flex" : "none", position : 'absolute',bottom : 45, left : 5,color : Colors.textColorWhite,fontSize : 18,fontFamily:'Manrope-Bold'}}>Downloaded</Text>
            <Text style={{position : 'absolute',bottom : 0, right : 5,color : Colors.textColorWhite}}>{message.hour}</Text>
            <View style={{height : 15}} />
        </Pressable>
    </View>
    )
}
function createNewMessage(message: string,setMessages : React.Dispatch<any>){
    const _id = 2321;
    const date = new Date().toLocaleDateString('id-ID');
    const hour = new Date().toLocaleTimeString('id-ID').replace('.',':').split('.')[0];
    const newMessage = {
        _id,
        message,
        date : date,
        hour : hour,
        type : "text",
        statusRead : false
    }
    return setMessages((prev : any) => [...prev,newMessage]);
}

function createNewMessageImage(message : {uri : string,type :string,name : string},setMessages : React.Dispatch<any>){
    const _id = 2321;
    const date = new Date().toLocaleDateString('id-ID');
    const hour = new Date().toLocaleTimeString('id-ID').replace('.',':').split('.')[0];
    const newMessage = {
        _id,
        message,
        date : date,
        hour : hour,
        type : message.type,
        statusRead : false
    }
    return setMessages((prev : any) => [...prev,newMessage]);
}
function createNewMessageFile(message : {uri : string,type :string,name : string},setMessages : React.Dispatch<any>){
    const _id = 2321;
    const date = new Date().toLocaleDateString('id-ID');
    const hour = new Date().toLocaleTimeString('id-ID').replace('.',':').split('.')[0];
    const newMessage = {
        _id,
        message,
        date : date,
        hour : hour,
        type : message.type,
        statusRead : false
    }
    return setMessages((prev : any) => [...prev,newMessage]);
}




const Styles = StyleSheet.create({
    primaryText : {color : "#037EE5",fontSize : 17,fontFamily : "Manrope-Reguler"}
})

export default Chat;