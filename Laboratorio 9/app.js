// app.js

import { PokemonService } from './pokemonService.js';
import { createPokemon } from './pokemon.js';
import { htmlElements, uiHandlers } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const handlers = {
        searchPokemon: async (event) => {
            event.preventDefault();
            console.log('Handler: searchPokemon activado.');
            const name = htmlElements.pokemonNameInput.value.trim();
            console.log(`Handler: Nombre de Pokémon ingresado: "${name}"`);

            if (!name) {
                console.warn('Handler: No se ingresó ningún nombre de Pokémon.');
                // Pasar la función de recomendaciones al displayError
                uiHandlers.displayError('No se ingresó ningún nombre de Pokémon.', PokemonService.getRecommendations);
                return;
            }

            try {
                console.log('Handler: Iniciando solicitud a la API.');
                const data = await PokemonService.fetchPokemonData(name);
                console.log('Handler: Datos recibidos de la API:', data);

                const pokemon = createPokemon(
                    data.name,
                    data.id,
                    data.sprites.front_default,
                    data.sprites.back_default,
                    data.weight,
                    data.height
                );

                console.log('Handler: Objeto Pokémon creado:', pokemon);
                uiHandlers.displayPokemon(pokemon);
            } catch (error) {
                console.error('Handler: Error en searchPokemon:', error);
                // Pasar la función de recomendaciones al displayError
                uiHandlers.displayError(error.message, PokemonService.getRecommendations);
            }
        }
    };

    const bindEvents = () => {
        console.log('Main: Bind de eventos iniciado.');
        if (htmlElements.searchButton && htmlElements.clearButton) {
            htmlElements.searchButton.addEventListener('click', handlers.searchPokemon);
            htmlElements.clearButton.addEventListener('click', uiHandlers.clearSearch);
            console.log('Main: Eventos vinculados.');
        } else {
            console.error('Main: Botones de búsqueda o limpieza no encontrados.');
        }
    };

    const init = () => {
        console.log('Main: Inicializando aplicación.');
        bindEvents();
        console.log('Main: Aplicación inicializada.');
    };

    init();
});
