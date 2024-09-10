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

// Ejemplo de uso
esPalindromoDobleBase(585); // El número 585 es palíndromo en base 10 y base 2: true
esPalindromoDobleBase(10);  // El número 10 no es palíndromo en base 10 y base 2: false