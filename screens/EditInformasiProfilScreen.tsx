import {Alert, Image, Pressable, ScrollView, StyleSheet, Text,TextInput,TouchableOpacity,useWindowDimensions,View} from 'react-native';
import Back from '../components/Back';
import Colors from '../styles/colors';
import RadioButtonsGroup, { RadioButton } from 'react-native-radio-buttons-group';
import { ReactElement, useMemo, useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import {ImagePickerResponse, launchCamera,launchImageLibrary} from 'react-native-image-picker';
import TakePicture from '../utils/TakeImage.tsx';
function EditInformasiProfile(){
    const [selectedId, setSelectedId] = useState('1');
    const [image, setImage] = useState();
    const layout = useWindowDimensions();
    const radioButtons = useMemo(() => ([
        {
            id : '1', // acts as primary key, should be unique and non-empty,
            label : 'Laki Laki',
            value : '1'
        },
        {
            id : '2',
            label : 'Perempuan',
            value : '0'
        }
    ]),[]);
    
    return(
        <ScrollView style={{flex : 1}} showsVerticalScrollIndicator={false}>
            <Back/>
            <Text style={{width : layout.width,marginVertical : 10,paddingLeft : 30,fontFamily: "Manrope-SemiBold",fontSize : 20}}>Edit informasi profil</Text>
            <SelectImage setImage={setImage}/>
            <View style={{width:layout.width,marginVertical : 20,alignItems : "center"}}>
                <Image style={{borderRadius : 999,width : 80,height : 80}} source={image?image:require('../assets/img/placeholder_user.png')}/>
            </View>
            <View style={{paddingHorizontal : 20,gap : 15}}>
                <View style={{width : layout.width}}>
                    <Text style={{width : layout.width,fontFamily: "Manrope-Reguler",fontSize : 16,color:Colors.primary}}>Nama : </Text>
                    <TextInput
                        placeholder='Nama Anda..'
                        style={styles.textInput}
                        placeholderTextColor={Colors.textColorSecondary}
                        maxLength={85}
                    />
                </View>
                <View style={{width : layout.width}}>
                    <Text style={{width : layout.width,fontFamily: "Manrope-Reguler",fontSize : 16,color:Colors.primary}}>Email : </Text>
                    <TextInput
                        placeholder='Email Anda..'
                        style={styles.textInput}
                        placeholderTextColor={Colors.textColorSecondary}
                        keyboardType='email-address'
                    />
                </View>
                <View style={{width : layout.width}}>
                    <Text style={{width : layout.width,fontFamily: "Manrope-Reguler",fontSize : 16,color:Colors.primary}}>No Telp : </Text>
                    <TextInput
                        placeholder='0812345678'
                        style={styles.textInput}
                        placeholderTextColor={Colors.textColorSecondary}
                        keyboardType='numeric'
                        maxLength={16}
                    />
                </View>
                <View style={{width : layout.width,paddingHorizontal : 15}}>
                    <Text style={{width : layout.width,marginVertical : 10,marginBottom : 25,fontFamily: "Manrope-Reguler",fontSize : 16,color:Colors.primary}}>Jenis kelamin: </Text>
                    <RadioButtonsGroup
                        radioButtons={radioButtons}
                        onPress={(id) => setSelectedId(id)}
                        selectedId={selectedId}
                        containerStyle={{flexDirection : "row"}
                    }
                    />
                    <Pressable><Text style={{marginTop: 20,color : Colors.primary,fontFamily : "Manrope-Reguler",fontSize : 16}}>Lupa Password?</Text></Pressable>
                </View>
                <TouchableOpacity style={{justifyContent : "flex-end",alignItems : "center"}}>
                    <Text style={{width : 327,padding : 18,borderRadius : 41,fontSize : 20,fontFamily : "Manrope-SemiBold",textAlign : "center",color : Colors.textColorWhite,backgroundColor : Colors.primary}}>Simpan</Text>
                </TouchableOpacity>
                <View style={{height : 154}} />
            </View>
        </ScrollView>
    )
}

const SelectImage = ({setImage} : {setImage : React.Dispatch<any>}) => {
    const layout = useWindowDimensions();
    return (
        <Pressable onPress={() => setImage(TakePicture.TakeImageFromLibrary(setImage))}>
            <Text style={{width : layout.width,marginVertical : 10,paddingRight : 20,textAlign : "right",fontFamily: "Manrope-Reguler",fontSize : 16,color:Colors.primary}}>Edit Avatar</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    textInput : {
        width : "90%",marginVertical : 10 ,paddingVertical : 15,paddingHorizontal : 15,fontFamily : "Manrope-Reguler",fontSize : 16,borderColor : Colors.primary,borderWidth : 1,borderRadius : 10
    }
})

export default EditInformasiProfile;