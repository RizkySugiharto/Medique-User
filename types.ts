import { ImageRequireSource, ImageURISource } from "react-native"

export type Category =
    'Dokter Spesialis Anak'
    | 'Dokter Umum'
    | 'Dokter Spesialis Gizi'
    | 'Psikiater'
    | 'Dokter Spesialis THT'
    | 'Dokter Rehabilitasi'
    | 'Dokter Alergi & Imunologi'
    | 'Dokter Spesialis Penyakit Dalam'

export type Gender = 'Laki-Laki' | 'Perempuan'

export type DoctorLocationStatus = 'on-the-way' | 'finished'

export type MethodPayment = 
    'Gopay'
    | 'Shopee Pay'
    | 'Dana'
    | 'BCA'
    | 'BRI'
    | 'BNI'

export interface CategoryData {
    name: Category,
    icon: any,
}

export interface DoctorData {
    id: number,
    profile: ImageRequireSource | ImageURISource,
    name: string,
    category: Category,
    favorite: boolean,
    rating: number,
    experience: number,
    details: {
        patients: number,
        address: string,
        description: string,
        workingTime: string,
        price: {
            from: number,
            to: number,
        },
        reviewCount: number,
    },
}

export interface Location {
    lat: number,
    lng: number,
}

export interface PlaceData {
    id: string,
    name: string,
    address: string,
    bookmark: boolean,
    location: Location,
    distance: number,
}

export interface UserData {
    profile: ImageRequireSource | ImageURISource,
    name: string,
    gender: Gender,
    birthDate: Date,
    email: string,
    numberPhone: string,
}

export interface AmbulanceData {
    id: number,
    name: string,
    price: number,
    address: string,
    location: Location,
}

export interface ReviewData {
    userProfile: any,
    userName: string,
    rating: number,
    message: string
}

export interface DoctorLocation {
    status: DoctorLocationStatus,
    time: number,
    distance: number,
    location: Location,
}