function esPalindromo(str) {
    return str === str.split('').reverse().join('');
}

function esPalindromoDobleBase(num) {
    const decimalStr = num.toString();
    const binaryStr = num.toString(2);
    const resultado = esPalindromo(decimalStr) && esPalindromo(binaryStr);
    console.log(`El número ${num} es palíndromo en base 10 y base 2: ${resultado}`);
    return resultado;
}
