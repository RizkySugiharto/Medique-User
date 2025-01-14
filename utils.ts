import { Axios, AxiosHeaders } from "axios";

function formatToRating(n: number): string {
    const text: string = n.toFixed(2);
    return text.slice(0, text.length-1);
}

function shortNumber(value: number): string {
    return Intl.NumberFormat('id-ID', {
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(value);
}

const utils = {
    formatToRating,
    shortNumber,
};

export default utils;