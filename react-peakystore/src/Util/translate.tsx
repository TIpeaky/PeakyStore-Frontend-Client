export const translateColor = (color:string):string => {
    switch (color) {
        case "BLUE":  return "Azul";
        case "GREEN":  return "Verde";
        case "YELLOW": return "Amarelo";
        case "PURPLE":  return "Roxo";
        case "PINK":  return "Rosa";
        case "RED": return "Vermelho";
        case "ORANGE":  return "Laranja";
        case "BROWN": return "Marrom";
        case "GREY": return "Cinza";
        case "WHITE": return "Branco";
        case "BLACK":  return "Preto";
        default: return "Cor inválida";
    }
}
export const translateSize = (size:string):string => {
    switch (size) {
        case "XS":  return "PP";
        case "S":  return "P";
        case "M": return "M";
        case "L":  return "G";
        case "XL":  return "GG";
        case "XXL": return "XG";
        default: return "Tamanho inválido";
    }
}