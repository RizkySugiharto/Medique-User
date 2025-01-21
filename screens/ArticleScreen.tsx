import { Image, ImageProps, ScrollView, Text,View } from "react-native";
import Back from "../components/Back";
import { RouteProp, useRoute } from "@react-navigation/native";
import Colors from "../styles/colors";
interface InterfaceArticle{
    // image: require('../assets/img/placeholder_article.png'),
    image : NodeRequire,
    category: string,
    title: string,
    content : string[],
    publishDate : number | string | Date
}


const ArticleScreen = () =>{
    const {params} : RouteProp<{params : {article : InterfaceArticle}}> = useRoute();
    const article = params.article;
    console.log(article);
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <Back/>
            <View style={{padding : 20}}>
                <Image  
                    source={article.image as ImageProps}
                    style={{width : "100%",height : 204,borderRadius:16}}    
                />
                <Text 
                    style={{maxWidth:77,height : 30,marginTop :15,padding : 5,borderRadius : 4,verticalAlign : "middle",textAlign : "center",color : Colors.primary,fontFamily:"Manrope-Medium",fontSize :12,backgroundColor : Colors.primaryShadow}}
                >{article.category}</Text>
                <Text style={{fontFamily:"Manrope-Bold",fontSize :24}}>{article.title}</Text>
                {article.content.map((value,index) => <Text style={{marginVertical : 10,fontFamily : "Manrope-Reguler",fontSize : 16}} key={index}>{value}</Text>)}
            </View>
        </ScrollView>
    )
}

export default ArticleScreen;