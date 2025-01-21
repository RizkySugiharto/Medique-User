import {StyleSheet, Text,TextInput,TouchableOpacity,useWindowDimensions,View} from 'react-native';
import Back from '../components/Back';
import  Colors from '../styles/colors';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useState } from 'react';

interface InterfaceUser {
    profile: NodeRequire,
    name: string,
    email : string,
    notelp : string | number,
    alamat : string,
    birthDate : Date
  }

function EditAlamatScreen(){
    const {params} : RouteProp<{params : {user : InterfaceUser}}> =  useRoute();
    const user = params.user;

    const [alamat,seAlamat] = useState(params.user.alamat);

    const layout = useWindowDimensions();
    return(
        <View style={{width : layout.width,flex : 1}}>
            <Back/>
            <Text style={{width : layout.width,marginVertical : 10,paddingLeft : 30,fontFamily: "Manrope-SemiBold",fontSize : 20}}>Edit Alamat</Text>
            <View style={{marginTop : 20,alignItems :"center"}}>
                <Text style={{width : layout.width,marginLeft : 40,fontFamily: "Manrope-Reguler",fontSize : 16,color:Colors.primary}}>Alamat : </Text>
                <TextInput
                    placeholder='Alamat Anda..'
                    style={styles.textInput}
                    value={alamat}
                    placeholderTextColor={Colors.textColorSecondary}
                    maxLength={85}
                />
            </View>
            <View style={{flex : .9, justifyContent : "flex-end",alignItems : "center"}}>
                <TouchableOpacity>
                    <Text style={{width : 327,padding : 18,borderRadius : 41,fontSize : 20,fontFamily : "Manrope-SemiBold",textAlign : "center",color : Colors.textColorWhite,backgroundColor : Colors.primary}}>Simpan</Text>
                </TouchableOpacity>
            </View>
           
        </View>
    )
}

const styles = StyleSheet.create({
    textInput : {
        width : "90%",marginVertical : 10 ,paddingVertical : 15,paddingHorizontal : 15,fontFamily : "Manrope-Reguler",fontSize : 16,borderColor : Colors.primary,borderWidth : 1,borderRadius : 10
    }
})

export default EditAlamatScreen;