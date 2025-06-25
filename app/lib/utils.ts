import { clsx, type ClassValue } from 'clsx';
import { DateTime } from 'luxon';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getDataFormatada(data: string): string {
    return DateTime.fromISO(data).toFormat('dd/MM/yyyy');
}

export function getCpfFormatado(cpf: string): string {
    return cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9, 11);
}

export function getCpnjFormatted(cpnj: string): string {
    return (
        cpnj.substring(0, 2) + '.' +
        cpnj.substring(2, 5) + '.' +
        cpnj.substring(5, 8) + '/' +
        cpnj.substring(8, 12) + '-' +
        cpnj.substring(12, 14)
    );
}

export function getPhoneFormatted(phone: string): string {
    return '(' + phone.substring(0, 2) + ')' + ' ' + phone.substring(2, 7) + '-' + phone.substring(7, 11);
}
