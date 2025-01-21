
import { Image, ImageProps, Pressable, ScrollView, StyleSheet, Text,TouchableOpacity,useWindowDimensions,View } from "react-native";
import Colors from "../styles/colors";
import { ReactElement } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";


const featureProfileScreens = [
    {
        title : "Edit informasi profil",
        routeTo : 'EditInformasiProfil',
        icon : require('../assets/img/ic_information_profile.png')
    },
    {
        title : "Edit alamat",
        routeTo : "EditAlamatProfil",
        icon : require('../assets/img/ic_address_profile.png')
    },
    {
        title : "Bantuan & Dukungan",
        routeTo : 'BantuanDukunganProfilScreen',
        icon : require('../assets/img/ic_helper_profile.png')
    },
    {
        title : "Kebijakan privasi",
        routeTo : 'KebijakanPrivasiProfilScreen',
        icon : require('../assets/img/ic_lock_profile.png')
    },
]


function ProfileScreen(){
    const Stack = createNativeStackNavigator();
    return <Dashboard/>
}

function Dashboard(){
    const layout = useWindowDimensions();
    return(
        <ScrollView style={{position : "relative"}} showsHorizontalScrollIndicator={false}>
            <Image style={{width : layout.width * 1,height : (layout.height) * .3,position : "absolute",top : 0,left : 0,objectFit : "fill"}} source={require('../assets/img/bg_blue_profile.png')}/>
            <Profile/>
            <View style={{marginTop :40,paddingHorizontal : 20,gap : 15}}>
                {featureProfileScreens.map(({title,icon,routeTo},index) => <FeatureProfile title={title} icon={icon} routeTo={routeTo} key={index * 90} />)}
            </View>
            <KeluarButton/>
        </ScrollView>
    )
}

const Profile = () => {
    const layout = useWindowDimensions();
    return(
    <View style={{height : (layout.height) * .45 ,justifyContent : "flex-end",alignItems : "center"}}>
        <Image style={{width : 120,height : 120,borderRadius: 999}} source={require('../assets/img/placeholder_user.png')} />
        <Text style={{fontFamily : "Manrope-SemiBold",fontSize : 24,textAlign : 'center'}}>Frendi Anton</Text>
        <Text style={{fontFamily : "Manrope-Reguler",fontSize : 14,textAlign : 'center'}}>frendianton@gmail.com</Text>
    </View>
    )
}

const FeatureProfile = ({title,icon,routeTo} : {title : string, icon : NodeRequire,routeTo :string}) : ReactElement => {
    const navigation = useNavigation();
    return(
        <Pressable style={{flexDirection : "row",alignItems : "center",gap : 10}} onPress={() => navigation.navigate(routeTo as never)}>
            <Image style={{width : 24,height : 24}} source={icon as ImageProps} />
            <Text style={{fontFamily : "Manrope-Reguler",fontSize : 16}}>{title}</Text>
        </Pressable>
    )
}

const KeluarButton = () => {
    const layout = useWindowDimensions();
    const navigation = useNavigation();
    return(
        <View style={{width : layout.width,alignItems : "center"}}>
            <TouchableOpacity style={{marginTop : 20}}onPress={() => navigation.navigate('Welcome' as never)}>
                <Text style={{width : 327,maxHeight:56,paddingVertical : 12,fontSize : 20,fontFamily : "Manrope-SemiBold",color : "red",borderWidth : 1,borderColor  : "red",borderRadius : 30,textAlign : "center"}}>Keluar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    containerImageFeature: {flexDirection : "row",alignItems : "center",gap : 10},
    iconFeature : {width : 24,height : 24},
    textFeature : {fontFamily : "Manrope-Reguler",fontSize : 16}
});

export default ProfileScreen;