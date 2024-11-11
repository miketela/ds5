// modules/ui.js

import { PokemonService } from './pokemonService.js';

export const htmlElements = {
    pokemonNameInput: document.getElementById('pokemon-name'),
    searchButton: document.getElementById('search-button'),
    clearButton: document.getElementById('clear-button'),
    pokemonInfo: document.getElementById('pokemon-info'),
    abilityInfo: document.getElementById('ability-info'),
    searchTypeSelect: document.getElementById('search-type')
};

// Verificación de elementos
console.log('Verificación de elementos HTML:');
console.log('pokemonNameInput:', htmlElements.pokemonNameInput);
console.log('searchButton:', htmlElements.searchButton);
console.log('clearButton:', htmlElements.clearButton);
console.log('pokemonInfo:', htmlElements.pokemonInfo);
console.log('abilityInfo:', htmlElements.abilityInfo);
console.log('searchTypeSelect:', htmlElements.searchTypeSelect);

export const uiHandlers = {
    displayPokemon: (pokemon) => {
        console.log('UI Handler: Displaying Pokémon:', pokemon);
        const html = pokemon.getHTMLRepresentation();
        if (htmlElements.pokemonInfo) {
            htmlElements.pokemonInfo.innerHTML = html;
            htmlElements.pokemonInfo.classList.remove('error');
            htmlElements.pokemonInfo.style.display = 'block';
            htmlElements.clearButton.style.display = 'inline-block';
            htmlElements.abilityInfo.style.display = 'none';
            console.log('UI Handler: Información de Pokémon mostrada.');
        } else {
            console.error('UI Handler: Elemento pokemonInfo no encontrado.');
        }
    },
    displayAbility: (ability) => {
        console.log('UI Handler: Displaying Ability:', ability);
        const html = ability.getHTMLRepresentation();
        if (htmlElements.abilityInfo) {
            htmlElements.abilityInfo.innerHTML = html;
            htmlElements.abilityInfo.classList.remove('error');
            htmlElements.abilityInfo.style.display = 'block';
            htmlElements.clearButton.style.display = 'inline-block';
            htmlElements.pokemonInfo.style.display = 'none';
            console.log('UI Handler: Información de Habilidad mostrada.');
        } else {
            console.error('UI Handler: Elemento abilityInfo no encontrado.');
        }
    },
    displayError: async (error, getRecommendationsFunc) => {
        console.error('UI Handler: Error al buscar:', error);
        const searchType = htmlElements.searchTypeSelect.value;
        console.log(`UI Handler: Tipo de búsqueda en error: "${searchType}"`);
        if (searchType === 'pokemon') {
            if (htmlElements.pokemonInfo) {
                htmlElements.pokemonInfo.innerHTML = `<p class="error-message">${error || 'Error al buscar el Pokémon. Intenta nuevamente.'}</p>`;
                htmlElements.pokemonInfo.classList.add('error');
                htmlElements.pokemonInfo.style.display = 'block';
                htmlElements.clearButton.style.display = 'inline-block';
                console.log('UI Handler: Mensaje de error de Pokémon mostrado.');

                // Obtener recomendaciones y mostrarlas
                if (typeof getRecommendationsFunc === 'function') {
                    const input = htmlElements.pokemonNameInput.value.trim();
                    if (input) {
                        console.log(`UI Handler: Obteniendo recomendaciones para "${input}"`);
                        const recommendations = await getRecommendationsFunc(input);
                        console.log('UI Handler: Recomendaciones obtenidas:', recommendations);
                        if (recommendations.length > 0) {
                            const recommendationsHTML = `
                                <h4>Recomendados:</h4>
                                <ul>
                                    ${recommendations.map(name => `
                                        <li>
                                            <button class="recommendation-button" data-name="${name}">
                                                ${name.charAt(0).toUpperCase() + name.slice(1)}
                                            </button>
                                        </li>
                                    `).join('')}
                                </ul>
                            `;
                            htmlElements.pokemonInfo.innerHTML += recommendationsHTML;
                            console.log('UI Handler: Recomendaciones mostradas.');

                            // Añadir listeners a los botones de recomendaciones
                            const recommendationButtons = htmlElements.pokemonInfo.querySelectorAll('.recommendation-button');
                            recommendationButtons.forEach(button => {
                                button.addEventListener('click', () => {
                                    const recommendedName = button.getAttribute('data-name');
                                    console.log(`UI Handler: Recomiendo buscar "${recommendedName}"`);
                                    htmlElements.pokemonNameInput.value = recommendedName;
                                    // Disparar el evento de búsqueda
                                    htmlElements.searchButton.click();
                                });
                            });
                        } else {
                            htmlElements.pokemonInfo.innerHTML += `<p>No hay recomendaciones disponibles.</p>`;
                            console.log('UI Handler: No hay recomendaciones disponibles.');
                        }
                    }
                }
            } else {
                console.error('UI Handler: Elemento pokemonInfo no encontrado.');
            }
        } else if (searchType === 'ability') {
            if (htmlElements.abilityInfo) {
                htmlElements.abilityInfo.innerHTML = `<p class="error-message">${error || 'Error al buscar la habilidad. Intenta nuevamente.'}</p>`;
                htmlElements.abilityInfo.classList.add('error');
                htmlElements.abilityInfo.style.display = 'block';
                htmlElements.clearButton.style.display = 'inline-block';
                htmlElements.pokemonInfo.style.display = 'none';
                console.log('UI Handler: Mensaje de error de Habilidad mostrado.');

                // Aquí podrías añadir recomendaciones para habilidades si lo deseas
            } else {
                console.error('UI Handler: Elemento abilityInfo no encontrado.');
            }
        }
    },
    clearSearch: () => {
        console.log('UI Handler: Limpiando búsqueda.');
        if (htmlElements.pokemonNameInput && htmlElements.pokemonInfo && htmlElements.abilityInfo && htmlElements.clearButton) {
            htmlElements.pokemonNameInput.value = '';
            htmlElements.pokemonInfo.innerHTML = '';
            htmlElements.abilityInfo.innerHTML = '';
            htmlElements.pokemonInfo.classList.remove('error');
            htmlElements.abilityInfo.classList.remove('error');
            htmlElements.pokemonInfo.style.display = 'none';
            htmlElements.abilityInfo.style.display = 'none';
            htmlElements.clearButton.style.display = 'none';
            console.log('UI Handler: Búsqueda limpiada.');
        } else {
            console.error('UI Handler: Elementos de búsqueda no encontrados.');
        }
    }
};
