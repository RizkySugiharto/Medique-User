import React, { useState } from "react";
import { Alert, useWindowDimensions } from "react-native";
import { launchImageLibrary,launchCamera, ImagePickerResponse, Asset } from "react-native-image-picker";
import RFNS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';

const TakeImageFromLibrary  = (setImage : React.Dispatch<any>) => {
    const pickFile = async() => {
        try{
            await launchImageLibrary({
                mediaType : "photo",
                maxWidth : 120,
                maxHeight  : 120,
                includeBase64 : true,
            }).then((res) => {
                if(!res.didCancel){
                    const assests = res.assets[0];
                    setImage({uri : `data:image/jpeg;base64,${assests.base64}`})
                    console.log('Got Data!');
                    return true;
                }
            })
        }catch(err){
            console.log('error => '+ err);
        }
    }
    pickFile();
    return require('../assets/img/placeholder_user.png');
}
const TakePicture  = (setImage : React.Dispatch<any>,isFront : boolean = true) => {
    const pickFile = async() => {
        try{
            await launchCamera({
                mediaType : "photo",
                maxWidth : 120,
                maxHeight  : 120,
                includeBase64 : true,
                cameraType : isFront? "front" : "back"
            }).then((res) => {
                if(!res.didCancel){
                    const assests = res.assets[0];
                    setImage({uri : `data:image/jpeg;base64,${assests.base64}`,name : assests.fileName, type : assests.type?.split('/')[1],})
                    return true;
                }
            })
        }catch(err){
            Alert.alert('Warning','Make sure your phone support camera and giving permission to application')
            console.log('error => '+ err);
        }
    }
    pickFile();
    return require('../assets/img/placeholder_user.png');
}

const TakeDocumentFromLibrary = (setDocument : React.Dispatch<any>) => {
    const pickFile = async() => {
        try{
            const resFile = await DocumentPicker.pickSingle({
                type : DocumentPicker.types.allFiles,
            });
            setDocument(resFile);
        }catch(err){
            console.log("err => " + err);
        }
    }
    pickFile();
}



const TakeImage ={
    TakeImageFromLibrary,
    TakePicture,
    TakeDocumentFromLibrary,
}

export default TakeImage;