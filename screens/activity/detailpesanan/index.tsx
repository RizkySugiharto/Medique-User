import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {Image, ImageProps, ScrollView, SectionList, StyleSheet, Text,View} from 'react-native';
import Colors from '../../../styles/colors';
import { PropsWithChildren, ReactElement } from 'react';
import Back from '../components/Back';

interface ParamsProp{
    nama : string,
    image : NodeRequire,
    spesialis  : string,
    transaksi : DetailTransaksi,
    tanggal : '17/6',
    jam : '7-30 PM'
}

interface DetailTransaksi{
    penyakit : string[],
    tindakan : string[],
    pasien : InterFacePasien,
    transaksi : {
        listJasa : {nama : string,harga : number}[], // object jasa
        bayar : string,
    }   
}

interface InterFacePasien{
    nama : string,
    umur : number,
    jenis_kelamin : number, // it's mean girl/female    
}

function DetailPesanan(){
    const {params} : RouteProp<{params : {data :ParamsProp }}> = useRoute();
    const data = params.data;
    console.log(data.transaksi.transaksi.listJasa);
    return(
        <ScrollView>
            <Back/>
            <Penyakit penyakit={data.transaksi.penyakit} tindakan={data.transaksi.tindakan} />
            <DetailPembayaran product={data.transaksi.transaksi.listJasa}/>
            <InformasiPasien pasien={data.transaksi.pasien}/>
            <Payment transaksi={data.transaksi.transaksi}/>
            <Footer data={data}/>
        </ScrollView>
    )
}

type Props = {
    title : string | null,
    children: string | JSX.Element | JSX.Element[] | any,
}

const Container = ({title = null,children} : Props) : ReactElement =>{
    return(
        <View style={{paddingHorizontal : 20,paddingVertical : 5,gap : 10}}>
            <Text style={{marginLeft : 4,fontFamily : "Manrope-Bold",fontSize : 16}}>{title}</Text>
            
            <View style={{width : "100%",borderWidth : 1,borderRadius : 10,borderColor : Colors.primary}}>
                {children}
            </View>
        </View>
    )
}

const Penyakit = ({penyakit,tindakan} :{penyakit : string[],tindakan : string[]}) : ReactElement =>  {
    return(
        <Container title="Penyakit & Tindakan Dokter">
            <View style={styles.containerBox}>
                <Text style={{marginBottom : 5,fontFamily : "Manrope-SemiBold",fontSize : 16}}>Penyakit : </Text>
               {penyakit.map((value,index) =>  <Text style={{fontFamily : "Manrope-Reguler",fontSize : 16}}>{value}</Text>)}
            </View>
            <LineBreak/>
            <View style={styles.containerBox}>
                <Text style={{marginBottom : 5,fontFamily : "Manrope-SemiBold",fontSize : 16}}>Tindakan : </Text>
                {tindakan.map((value,index) => <Text style={{fontFamily : "Manrope-Reguler",fontSize : 16}}>{value}</Text>)}
            </View>
        </Container>
    )
}

function DetailPembayaran({product} : {product : {nama : string,harga : number}[]}) {
    const totalPrice : number = product.reduce((accumulator,{harga}) => accumulator + Number(harga),0);
    return(
        <Container title="Detail Pembayaran">
            <View style={styles.containerBox}>
                {product.map((value,index) =>
                    <View style={{flexDirection : "row"}} key={index}>
                        <Text  style={{width : "50%",fontFamily : "Manrope-Reguler",fontSize : 16}}>{value.nama}</Text>
                        <Text style={{width:"50%",fontFamily : "Manrope-Reguler",fontSize : 16,textAlign:"right"}}>{numberToCurrency.format(value.harga)}</Text>
                    </View>
                )}
            </View>
            <LineBreak/>
            <View style={{...styles.containerBox,flexDirection :"row"}}>
                <Text  style={{width : "50%",fontFamily : "Manrope-SemiBold",fontSize : 16}}>Total : </Text>
                <Text style={{width:"50%",fontFamily : "Manrope-SemiBold",fontSize : 16,textAlign:"right"}}>{numberToCurrency.format(totalPrice)}</Text>
            </View>
        </Container>
    )
}

const LineBreak = () => <View style={{borderWidth : .6,borderColor : Colors.primary}}/>

function InformasiPasien({pasien} : {pasien : InterFacePasien}){
    console.log(pasien);
    return(
        <Container title='Informasi Pasien'>
            <View style={styles.containerBox}>
                <Text style={{fontFamily : "Manrope-Reguler",fontSize : 16}}>{pasien.nama}, {pasien.jenis_kelamin? 'Laki-Laki' : 'Perempuan'}, {pasien.umur} Tahun</Text>
            </View>
        </Container>
    )
}

function Payment({transaksi} :{transaksi : {listJasa : any,bayar : string}}){
    return(
        <Container title='Bayar Menggunakan'>
            <View style={{...styles.containerBox,flexDirection : "row",alignItems : "center",gap :18,}}>
                <Image source={require('../../../assets/img/ic_cash.png')}/>
                <Text style={{fontFamily : "Manrope-Reguler",fontSize : 16}}>{transaksi.bayar}</Text>
            </View>
        </Container>
    )
}

function Footer({data} : {data : ParamsProp}){
    return(
        <View style={{...styles.containerBox,}}>
            <Text style={{fontFamily : "Manrope-SemiBold",fontSize : 16}}>Dokter yang di pilih</Text>
            <View style={{marginTop : 10,flexDirection : "row",justifyContent : "space-between",alignItems : "center"}}>
                <View>
                    <Text style={{fontFamily : "Manrope-SemiBold",fontSize : 16}}>Dr. Abdul</Text>
                    <Text style={{fontFamily : "Manrope-Reguler",fontSize : 16}}>Dokter umum</Text>
                </View>
                <Image style={{width : 70, height : 70, borderRadius : 999}} source={data.image as ImageProps}/>
            </View>
            <View style={{height :20}} />
        </View>
    )
}

const numberToCurrency = new Intl.NumberFormat('id-ID',{
    style : "currency",
    currency : "IDR"
})

const styles = StyleSheet.create({
    containerBox : {
        padding : 20,
        paddingVertical : 10
    }
})


export default DetailPesanan;