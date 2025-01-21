import { useEffect, useState } from "react";

import { Image, ImageProps, Pressable, ScrollView, Text,View } from "react-native";
import Back from "../components/Back";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchBarW from "../components/SearchBarW";
import Colors from "../styles/colors";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

interface InterfaceArticle{
    // image: require('../assets/img/placeholder_article.png'),
    image : NodeRequire,
    category: string,
    title: string,
    content : string[],
    publishDate : number | string | Date
}

const AllArticleScreen = () => {
    const {params} : RouteProp<{params : {articles : InterfaceArticle[]}}> = useRoute();
    const articles = params.articles;
    const [allArticles,setAllArticles] = useState(articles);
    const [search,setSearch] = useState('');
    const [isFocus,setFocus] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        if(allArticles.length == 0) return;
        setAllArticles(findTitleArticle(search));

        function findTitleArticle(title : string){
            title = title.toLowerCase();
            const article = allArticles.filter(value => {
                const title2 = value.title.toLowerCase();
                if(
                    title === title2 || title2.includes(title)
                ){
                    return value;
                }
            });
            if(article.length > 0) return article;
            return articles;
        }
    },[search])

    return(
        <View>
            {/* <Back/> */}
           <View style={{paddingHorizontal : 20}}>
            <Text style={{marginTop : 20,marginLeft:5,fontSize: 20,fontFamily: 'Manrope-Bold'}}>Artikel</Text>
                <SearchBarW  placeholder="Search Article Here..."  isFocus={isFocus} setFocus={setFocus} setSearch={setSearch}/>
                <ScrollView style={{marginTop: 20, padding : 10}} showsVerticalScrollIndicator={false}>
                    {allArticles.map((value,index) => {
                        return (
                        <Pressable style={{marginVertical:10,padding: 5,borderRadius :15,borderWidth:.4}} key={index} onPress={() => navigation.navigate(...['Article',{article : value}] as never)}>
                            <Image style={{width:'100%',height : 120,borderRadius : 15}}source={value.image as ImageProps}/>
                            <View style={{paddingHorizontal : 10,gap : 10}}>
                                <Text 
                                    style={{maxWidth:77,height : 30,marginTop :15,padding : 5,borderRadius : 4,verticalAlign : "middle",textAlign : "center",color : Colors.primary,fontFamily:"Manrope-Medium",fontSize :12,backgroundColor : Colors.primaryShadow}}
                                >{value.category}</Text>
                                <Text style={{fontFamily:"Manrope-Bold",fontSize :14}}>{value.title}</Text>
                                <Text style={{marginBottom : 8,fontFamily:"Manrope-Reguler",fontSize :10}}>{value.publishDate.toLocaleString().split(' ')[0]}</Text>
                            </View>
                        </Pressable>
                        )
                    })}
                    <View style={{height:150}} />
                </ScrollView>
            </View>
        </View>
    )
}


export default AllArticleScreen;