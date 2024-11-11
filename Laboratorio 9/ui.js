// ui.js

import { getHTMLRepresentation } from './pokemon.js';

export const htmlElements = {
    pokemonNameInput: document.getElementById('pokemon-name'),
    searchButton: document.getElementById('search-button'),
    clearButton: document.getElementById('clear-button'),
    pokemonInfo: document.getElementById('pokemon-info') // Usar pokemon-info
};

// Verificación de elementos
console.log('Verificación de elementos HTML:');
console.log('pokemonNameInput:', htmlElements.pokemonNameInput);
console.log('searchButton:', htmlElements.searchButton);
console.log('clearButton:', htmlElements.clearButton);
console.log('pokemonInfo:', htmlElements.pokemonInfo);

export const uiHandlers = {
    displayPokemon: (pokemon) => {
        console.log('UI Handler: Displaying Pokémon:', pokemon);
        const html = getHTMLRepresentation(pokemon);
        if (htmlElements.pokemonInfo) {
            htmlElements.pokemonInfo.innerHTML = html;
            htmlElements.pokemonInfo.classList.remove('error'); // Asegura que no tenga clase de error
            htmlElements.pokemonInfo.style.display = 'block'; // Mostrar el div
            htmlElements.clearButton.style.display = 'inline-block'; // Mostrar el botón "Limpiar"
        } else {
            console.error('UI Handler: Elemento pokemonInfo no encontrado.');
        }
    },
    displayError: async (error, getRecommendationsFunc) => {
        console.error('UI Handler: Error al buscar el Pokémon:', error);
        if (htmlElements.pokemonInfo) {
            htmlElements.pokemonInfo.innerHTML = `<p>${error || 'Error al buscar el Pokémon. Intenta nuevamente.'}</p>`;
            htmlElements.pokemonInfo.classList.add('error'); // Añadir clase de error
            htmlElements.pokemonInfo.style.display = 'block'; // Mostrar el div
            htmlElements.clearButton.style.display = 'inline-block'; // Mostrar el botón "Limpiar"

            // Obtener recomendaciones y mostrarlas
            if (typeof getRecommendationsFunc === 'function') {
                const input = htmlElements.pokemonNameInput.value.trim();
                if (input) {
                    const recommendations = await getRecommendationsFunc(input);
                    if (recommendations.length > 0) {
                        const recommendationsHTML = `
                            <h4>Recomendados:</h4>
                            <ul>
                                ${recommendations.map(name => `<li><button class="recommendation-button" data-name="${name}">${capitalizeFirstLetter(name)}</button></li>`).join('')}
                            </ul>
                        `;
                        htmlElements.pokemonInfo.innerHTML += recommendationsHTML;

                        // Añadir listeners a los botones de recomendaciones
                        const recommendationButtons = htmlElements.pokemonInfo.querySelectorAll('.recommendation-button');
                        recommendationButtons.forEach(button => {
                            button.addEventListener('click', () => {
                                const recommendedName = button.getAttribute('data-name');
                                htmlElements.pokemonNameInput.value = recommendedName;
                                // Disparar el evento de búsqueda
                                htmlElements.searchButton.click();
                            });
                        });
                    } else {
                        // Opcional: Mostrar mensaje si no hay recomendaciones
                        htmlElements.pokemonInfo.innerHTML += `<p>No hay recomendaciones disponibles.</p>`;
                    }
                }
            }
        } else {
            console.error('UI Handler: Elemento pokemonInfo no encontrado.');
        }
    },
    clearSearch: () => {
        console.log('UI Handler: Limpiando búsqueda.');
        if (htmlElements.pokemonNameInput && htmlElements.pokemonInfo && htmlElements.clearButton) {
            htmlElements.pokemonNameInput.value = '';
            htmlElements.pokemonInfo.innerHTML = '';
            htmlElements.pokemonInfo.classList.remove('error'); // Remover clase de error si existe
            htmlElements.pokemonInfo.style.display = 'none'; // Ocultar el div
            htmlElements.clearButton.style.display = 'none'; // Ocultar el botón "Limpiar"
        } else {
            console.error('UI Handler: Elementos de búsqueda no encontrados.');
        }
    }
};

// Función para capitalizar la primera letra
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
