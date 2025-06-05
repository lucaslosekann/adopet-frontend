export function maskCPF(value: string): string {
  return value
    .replace(/\D/g, "") // Remove tudo que não é dígito
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1"); // limitar 11 digitos
}

export function isValidCPF(value: string): boolean {
    value = value.replace(/[^\d]+/g, '');
    if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) return false;
    const numbers = value.split('').map(Number);
    const validator = numbers.slice(-2);
    const toValidate = (pop: number) => numbers.slice(0, numbers.length - pop);
    const rest = (count: number, pop: number) =>
    (toValidate(pop).reduce((sum, el, i) => sum + el * (count - i), 0) * 10) % 11 % 10;
    return rest(10, 2) === validator[0] && rest(11, 1) === validator[1];
}

export function maskCPNJ(value: string): string {
  return value
    .replace(/\D/g, "") // Remove tudo que não é dígito
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{4})/, "$1/$2")
    .replace(/(\d{4})(\d{2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export function maskPhone(value: string): string {
  value = value.replace(/\D/g, "");

  if (value.length < 2) {
    return value.replace(/(\d{0,2})/, "($1");
  } else if (value.length <= 6) {
    return value.replace(/(\d{2})(\d{0,4})/, "($1) $2");
  } else if (value.length <= 10) {
    return value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else {
    return value.replace(/(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
  }
}

export function maskStreetNumber(value: string): string {
  return value.replace(/\D/g, "");
}

export function maskCEP(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(\d{3})(\d)/, "$1$2")
    .replace(/(-\d{3})\d+?$/, "$1"); //limitar 9 digitos
}

export function maskUF(value: string): string {
  return value
  .replace(/[^a-zA-Z]/g, "")
  .replace(/^([a-zA-Z]{2})[a-zA-Z]+$/, "$1").toUpperCase(); //limitar 2 letras
}

