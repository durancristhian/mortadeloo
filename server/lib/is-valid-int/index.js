export function isValidInt(number) {
    return number === parseInt(number) && number >= 0 && number <= 100;
}
