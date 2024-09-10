function contarCaracteres(cadena) {
    let contador = {};
    for (let char of cadena) {
        contador[char] = (contador[char] || 0) + 1;
    }
    console.log(`El conteo de caracteres en la cadena "${cadena}" es:`, contador);
    return contador;
}
