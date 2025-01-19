import { Axios, AxiosHeaders } from "axios";
import { sub as subtractDate } from 'date-fns'

function timeToText(time: number): string {
    const labels = ['minggu', 'hari', 'jam', 'menit', 'detik']
    const tresholds = [604800, 86400, 3600, 60, 1]
    for (let i = 0; i < labels.length; i++) {
        if (time >= tresholds[i]) {
            return `${Math.floor(time / tresholds[i])} ${labels[i]}`
        }
    }
    return `${time} detik`
}

function distanceToText(distance: number): string {
    if (distance >= 1000) {
        return `${Intl.NumberFormat('id-ID', { maximumFractionDigits: 1 }).format(distance / 1000)} km`
    } else {
        return `${distance} m`
    }
}

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

function calculateAge(birthDate: Date): number {
    return subtractDate(
      new Date(Date.now()),
      {
        years: birthDate.getFullYear()
      }
    ).getFullYear()
  }

const utils = {
    formatToRating,
    shortNumber,
    timeToText,
    distanceToText,
    calculateAge
};

export default utils;