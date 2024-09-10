function esPrimo(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function sumaPrimos(n) {
    let suma = 0;
    for (let i = 2; i <= n; i++) {
        if (esPrimo(i)) {
            suma += i;
        }
    }
    console.log(`La suma de los números primos menores a ${n} es: ${suma}`);
    return suma;
}
