import { Image, Pressable, Text,useWindowDimensions,View } from "react-native";
import Colors from "../../../styles/colors";
import { useNavigation } from "@react-navigation/native";

function Back(){
    const {width} = useWindowDimensions();
    const {goBack} = useNavigation();
    return(
        <Pressable style={{width,height : 60,paddingHorizontal : 10,flexDirection : "row",alignItems : "center",gap : 5,}} onPress={goBack}>
            <Image source={require('../../../assets/img/ic_back_arrow.png')} />
            <Text style={{fontSize  : 16, fontFamily : "Manrope-Bold"}}>Kembali</Text>
        </Pressable>
    )
}

export default Back;