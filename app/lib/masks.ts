export function maskCPF(value: string): string {
  return value
    .replace(/\D/g, "") // Remove tudo que não é dígito
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1"); // limitar 11 digitos
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

