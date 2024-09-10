function esBisiesto(año) {
    const resultado = (año % 4 === 0 && año % 100 !== 0) || (año % 400 === 0);
    console.log(`El año ${año} es bisiesto: ${resultado}`);
    return resultado;
}
