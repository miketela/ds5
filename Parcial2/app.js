var app = (function() {
    // Variables privadas
    let numbers = [];

    const generateBtn = document.getElementById('generateBtn');
    const ascendBtn = document.getElementById('ascendBtn');
    const descendBtn = document.getElementById('descendBtn');
    const numberList = document.getElementById('numberList');

    // Funciones privadas
    function generateNumber() {
        // Verificamos si ya se han generado todos los números posibles
        if (numbers.length >= 99) {
            alert("Todos los números posibles han sido generados.");
            return;
        }

        let num;
        let formattedNum;

        // Generamos un número único que no esté en el arreglo 'numbers'
        do {
            num = Math.floor(Math.random() * 99) + 1;
            formattedNum = num < 10 ? '0' + num : num.toString();
        } while (numbers.includes(formattedNum));

        numbers.push(formattedNum);
        displayNumbers(numbers);   
    }

    function displayNumbers(numArray) {
        numberList.innerHTML = '';
        numArray.forEach(function(num) {
            const numItem = document.createElement('div');
            numItem.classList.add('number-item');
            numItem.textContent = num;
            numberList.appendChild(numItem);
        });
    }

    function sortNumbersAscending() {
        if (numbers.length === 0) return;
        const sortedNumbers = numbers.slice().sort(function(a, b) {
            return parseInt(a) - parseInt(b);
        });
        displayNumbers(sortedNumbers);
    }

    function sortNumbersDescending() {
        if (numbers.length === 0) return;
        const sortedNumbers = numbers.slice().sort(function(a, b) {
            return parseInt(b) - parseInt(a);
        });
        displayNumbers(sortedNumbers);
    }

    // Inicialización del módulo y configuración de eventos
    document.addEventListener('DOMContentLoaded', function() {
        generateBtn.addEventListener('click', generateNumber);
        ascendBtn.addEventListener('click', sortNumbersAscending);  
        descendBtn.addEventListener('click', sortNumbersDescending);
    });

    // No exponemos nada públicamente
    return {};
})();