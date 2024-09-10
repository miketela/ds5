function esBisiesto(año) {
    const resultado = (año % 4 === 0 && año % 100 !== 0) || (año % 400 === 0);
    console.log(`El año ${año} es bisiesto: ${resultado}`);
    return resultado;
}

// Ejemplo de uso
esBisiesto(2020); // El año 2020 es bisiesto: true
esBisiesto(1900); // El año 1900 no es bisiesto: false
esBisiesto(2000); // El año 2000 es bisiesto: true