import React, { useState } from "react";
import { Alert, useWindowDimensions } from "react-native";
import { launchImageLibrary,launchCamera, ImagePickerResponse } from "react-native-image-picker";
import RFNS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import SessionStorage from "react-native-session-storage";

const TakeImageFromLibrary  = (setImage : React.Dispatch<any>) => {
    const pickFile = async() => {
        try{
            await launchImageLibrary({
                mediaType : "photo",
                maxWidth : 120,
                maxHeight  : 120,
                includeBase64 : true,
            }).then((res) => {
                if(!res.didCancel && res.assets){
                    const assests = res.assets[0];
                    setImage({uri : `data:image/jpeg;base64,${assests.base64}`})
                    return true;
                }
            })
        }catch(err){
        }
    }
    pickFile();
    return SessionStorage.getItem('@user_data').profile;
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
                if(!res.didCancel && res.assets){
                    const assests = res.assets[0];
                    setImage({uri : `data:image/jpeg;base64,${assests.base64}`})
                    return true;
                }
            })
        }catch(err){
            Alert.alert('Warning','Make sure your phone support camera and giving permission to application')
        }
    }
    pickFile();
    return SessionStorage.getItem('@user_data').profile;
}

const TakeDocumentFromLibrary = (setDocuemnt : React.Dispatch<any>) => {
    const pickFile = async() => {
        try{
            const resFile = await DocumentPicker.pickSingle({
                type : DocumentPicker.types.allFiles,
            });
            setDocuemnt(resFile);
        }catch(err){
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