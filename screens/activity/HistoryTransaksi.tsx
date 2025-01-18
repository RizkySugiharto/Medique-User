import { useNavigation } from '@react-navigation/native';
import {Image, ImageProps, Pressable, SectionList, StyleSheet, Text,useWindowDimensions,View} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface InterfaceTransaksi {
    nama : String,
    image : String,
    spesialis  : String,
    tanggal : String
    jam : String
}

const detailDokter1 = {
    penyakit : ["Demam","Sakit Kepala"],
    tindakan : ["Beri Obat","Consultation - 1"],
   
    pasien : {
        nama : "Frendi Anton",
        umur : 44,
        jenis_kelamin : 1, // it's mean boy/male/sigma boy,
    },
    transaksi : {
        listJasa :  [{nama : "consult", harga : "30000"},{nama : "Obat herbal", harga:"250000"}],
        bayar : 'Tunai',
    }
}
const detailDokter2 = {
    penyakit : ["Demam","Pusing"],
    tindakan : ["Beri Obat","Consultation - 2"],
   
    pasien : {
        nama : "Rizky Sugiharto",
        umur : 16,
        jenis_kelamin : 1, // it's mean boy/male/sigma boy,
    },
    transaksi : {
        listJasa :  [{nama : "consult", harga : "30000"},{nama : "minyak", harga:"120000"}],
        bayar : 'Tunai',
    }
}

const detailDokter3 = {
    penyakit : ["Demam","Pusing 7 Keliling"],
    tindakan : ["Beri Obat","Consultation - 3"],
   
    pasien : {
        nama : "Saudaranya Rizky",
        umur : 12,
        jenis_kelamin : 0, // it's mean girl/female
    },
    transaksi : {
        listJasa : [{nama : "consult", harga : "30000"},{nama : "Obat", harga:"120000"}],
        bayar : 'Tunai',
    }
}

const riwayatOrderDoctor  = [
    {
        title : "Riwayat Pemesanan",
        data : [
        {
            nama : 'Drs. Athalia Putri',
            image : require("../../assets/img/drs_athalia_putri.png"),
            spesialis  : 'Dokter Gigi',
            transaksi : detailDokter1,
            tanggal : '17/6',
            jam : '7-30 PM'
        }, 
        {
            nama : "Drs. Raki Devon",
            spesialis  : 'Dokter Gigi',
            image: require("../../assets/img/dr_rd.png"),
            transaksi : detailDokter2,
            tanggal : '17/6',
            jam : '7-30PM'
        },
        {
            nama : "Drs. Evan",
            spesialis  : 'Dokter spesialis anak',
            image: require("../../assets/img/dr_evan.png"),
            transaksi : detailDokter3,
            tanggal : '17/6',
            jam : '7-30PM'
        }]
    }
]


function HistoryTransaksi(){
   return riwayatOrderDoctor.length? <HistoryDoctor/> : <NotFoundHistory/>;
}

function HistoryDoctor(){
    let indexDoctor = 0;
    return(
       <View style={{width:"99%",padding:24}}>
        <SectionList
            sections={riwayatOrderDoctor}
            keyExtractor={(item,index) => item.nama + index }
            renderItem={({section : {title},item}) => createCardHistory(item,indexDoctor++)}
            ListFooterComponent={() => <View style={{ height: 140 }} />}
       />
       </View>
    )
}

const createCardHistory = ({nama : name,image,spesialis,tanggal,jam} : InterfaceTransaksi,index : number) => {
    console.log(index)
    const navigation = useNavigation();
    return(
        <Pressable style={{marginTop : 20,display : "flex",flexDirection : "row",alignItems : "center",gap : 20,}} onPress={() => navigation.navigate(...['DetailPesanan',{data : riwayatOrderDoctor[0].data[index]}] as never)}>
            <Image source={image as ImageProps} style={{borderRadius : 16, width : 50,height : 50,}}/>
            <View style={{display:'flex',flexDirection:'column'}}>
                <View style={{width : "90%", display : "flex",flexDirection:"row",justifyContent : "space-between",alignItems:"center"}}>
                    <Text style={{fontSize: 16, fontFamily:'Manrope-SemiBold'}}>{name}</Text>
                    <Text style={{fontSize : 12,color : Colors.textColorSecondary,fontFamily : 'Manrope-Reguler',paddingRight : 10,}}>{tanggal} - {jam} </Text>
                </View>
                <Text style={{fontSize : 12,color : Colors.textColorSecondary,fontFamily : 'Manrope-Reguler',paddingRight : 10,}}>{spesialis}</Text>
            </View>
        </Pressable>
    )
}


function NotFoundHistory(){
    return(
        <View
            style={style.container}
        >
            <Image
                source={require('../../assets/img/not_found.png')}
                style={style.image}
            />
            <Text style={style.text}>Wah! Kamu belum pernah memesan dokter ya!</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container : {flex : 1, display : "flex", flexDirection : "column", alignItems: "center"},
    image : {marginTop : 60 ,width:259,height:194},
    text : {width : "100%" ,textAlign : "center",fontSize : 16, fontFamily : "Manrope-Reguler" }
}
    
)

export default HistoryTransaksi;