// modules/app.js

import { PokemonService } from './pokemonService.js';
import { uiHandlers, htmlElements } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const handlers = {
        searchHandler: async (event) => {
            event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
            console.log('Handler: searchHandler activado.');
            
            const query = htmlElements.pokemonNameInput.value.trim();
            const searchType = htmlElements.searchTypeSelect.value;
            console.log(`Handler: Término de búsqueda: "${query}", Tipo de Búsqueda: "${searchType}"`);

            if (!query) {
                console.warn('Handler: No se ingresó ningún término de búsqueda.');
                if (searchType === 'pokemon') {
                    uiHandlers.displayError('No se ingresó ningún nombre de Pokémon.', PokemonService.getRecommendations);
                } else if (searchType === 'ability') {
                    uiHandlers.displayError('No se ingresó ningún nombre de Habilidad.', null); // Puedes implementar recomendaciones para habilidades
                }
                return;
            }

            try {
                if (searchType === 'pokemon') {
                    console.log('Handler: Realizando búsqueda de Pokémon.');
                    const pokemon = await PokemonService.fetchPokemonData(query);
                    console.log('Handler: Pokémon encontrado:', pokemon);
                    uiHandlers.displayPokemon(pokemon);
                } else if (searchType === 'ability') {
                    console.log('Handler: Realizando búsqueda de Habilidad.');
                    const ability = await PokemonService.fetchAbilityData(query);
                    console.log('Handler: Habilidad encontrada:', ability);
                    uiHandlers.displayAbility(ability);
                }
            } catch (error) {
                console.error('Handler: Error durante la búsqueda:', error);
                if (searchType === 'pokemon') {
                    uiHandlers.displayError(error.message, PokemonService.getRecommendations);
                } else if (searchType === 'ability') {
                    uiHandlers.displayError(error.message, null); // Puedes implementar recomendaciones para habilidades
                }
            }
        }
    };

    const bindEvents = () => {
        console.log('Main: Vinculando eventos.');

        // Escuchar el evento 'submit' del formulario en lugar del 'click' del botón
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', handlers.searchHandler);
            console.log('Main: Evento "submit" del formulario vinculado.');
        } else {
            console.error('Main: Formulario de búsqueda no encontrado.');
        }

        // Escuchar el evento 'click' del botón "Limpiar"
        if (htmlElements.clearButton) {
            htmlElements.clearButton.addEventListener('click', uiHandlers.clearSearch);
            console.log('Main: Evento "click" del botón "Limpiar" vinculado.');
        } else {
            console.error('Main: Botón "Limpiar" no encontrado.');
        }
    };

    const init = () => {
        console.log('Main: Inicializando aplicación.');
        bindEvents();
        console.log('Main: Aplicación inicializada.');
    };

    init();
});
