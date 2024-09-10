function contarCaracteres(cadena) {
    let contador = {};
    for (let char of cadena) {
        contador[char] = (contador[char] || 0) + 1;
    }
    console.log(`El conteo de caracteres en la cadena "${cadena}" es:`, contador);
    return contador;
}

// Ejemplo de uso
contarCaracteres('AABBBACAA'); 
// El conteo de caracteres en la cadena "AABBBACAA" es: { A: 5, B: 3, C: 1 }