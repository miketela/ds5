<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laboratorio #2 - Problemas básicos con Javascript</title>
</head>
<body>

    <h1>Laboratorio #2 - Problemas básicos con Javascript</h1>

    <p id="respuesta1"></p>

    <script>
        document.getElementById("respuesta1").textContent = "JavaScript es un lenguaje de programación dinámico utilizado principalmente para crear páginas web interactivas. Se asemeja a Java en su nombre, pero son lenguajes completamente diferentes, aunque ambos son orientados a objetos y tienen una sintaxis similar en algunos aspectos.";
    </script>

    <h2>Operaciones con variables</h2>

    <script>
        var num1 = 10;
        var num2 = 5;

        console.log("Suma:", num1 + num2);          
        console.log("Resta:", num1 - num2);         
        console.log("Multiplicación:", num1 * num2); 
        console.log("División:", num1 / num2);      
    </script>

    <h2>Concatenación de variables</h2>

    <script>
        let str1 = "Hola, ";
        let str2 = "mundo!";
        console.log(str1 + str2);
    </script>

    <h2>Tipo de datos con "const"</h2>

    <script>
        const numConst = 42;
        const strConst = "Cadena de texto";

        console.log("El tipo de numConst es:", typeof numConst);
        console.log("El tipo de strConst es:", typeof strConst);
    </script>

    <h2>Objeto con diferentes tipos de datos</h2>

    <script>
        const miObjeto = {
            numero: 100,
            cadena: "Texto",
            booleano: true,
            objetoVacio: {}
        };

        console.log(miObjeto);
    </script>

    <h2>Función para sumar múltiplos de 3 o 5</h2>

    <script>
        function sumaMultiplos(numero) {
            let suma = 0;
            for (let i = 1; i < numero; i++) {
                if (i % 3 === 0 || i % 5 === 0) {
                    suma += i;
                }
            }
            return suma;
        }

        const resultado = sumaMultiplos(10);
        console.log("La suma de todos los múltiplos de 3 o 5 menores que 10 es:", resultado);
    </script>

</body>
</html>