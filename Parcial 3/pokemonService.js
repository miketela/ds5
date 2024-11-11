// pokemonService.js

import { createPokemon } from './modules/pokemon.js'; // Asegúrate de que la ruta es correcta
// Asegúrate de que getAbilityHTMLRepresentation está siendo utilizado en otro lugar si es necesario

export const PokemonService = {
    fetchPokemonData: async (name) => {
        console.log(`PokemonService: Buscando datos para Pokémon "${name}"`);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
            if (!response.ok) {
                throw new Error(`Pokémon no encontrado: ${name}`);
            }
            const data = await response.json();
            console.log('PokemonService: Datos recibidos:', data);

            // Obtener la cadena de evolución
            const evolutionChain = await PokemonService.fetchEvolutionChain(data.species.url);
            console.log('PokemonService: Cadena de evolución obtenida:', evolutionChain);

            // Obtener habilidades
            const abilities = data.abilities.map(abilityInfo => ({
                name: abilityInfo.ability.name,
                isHidden: abilityInfo.is_hidden
            }));
            console.log('PokemonService: Habilidades obtenidas:', abilities);

            // Crear objeto Pokémon
            const pokemon = createPokemon(
                data.name,
                data.id,
                data.sprites.front_default,
                data.sprites.back_default,
                data.weight,
                data.height,
                evolutionChain,
                abilities
            );

            console.log('PokemonService: Objeto Pokémon creado:', pokemon);
            return pokemon;
        } catch (error) {
            console.error('PokemonService: Error al obtener datos:', error);
            throw error;
        }
    },

    fetchAbilityData: async (abilityName) => {
        console.log(`PokemonService: Buscando datos para Habilidad "${abilityName}"`);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/ability/${abilityName.toLowerCase()}`);
            if (!response.ok) {
                throw new Error(`Habilidad no encontrada: ${abilityName}`);
            }
            const data = await response.json();
            console.log('PokemonService: Datos de habilidad recibidos:', data);
            return data;
        } catch (error) {
            console.error('PokemonService: Error al obtener datos de habilidad:', error);
            throw error;
        }
    },

    // Función para obtener todos los Pokémon y almacenarlos en caché
    fetchAllPokemon: async () => {
        if (PokemonService.allPokemon) {
            console.log('PokemonService: Retornando Pokémon desde caché.');
            return PokemonService.allPokemon;
        }
        console.log('PokemonService: Buscando lista completa de Pokémon...');
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
            if (!response.ok) {
                throw new Error('Error al obtener la lista completa de Pokémon.');
            }
            const data = await response.json();
            const allPokemon = data.results.map(pokemon => pokemon.name);
            PokemonService.allPokemon = allPokemon; // Almacenar en caché
            console.log('PokemonService: Lista completa de Pokémon obtenida y almacenada en caché.');
            return allPokemon;
        } catch (error) {
            console.error('PokemonService: Error al obtener la lista completa de Pokémon:', error);
            throw error;
        }
    },

    // Función para generar recomendaciones basadas en el input
    getRecommendations: async (input, maxSuggestions = 5) => {
        try {
            console.log(`PokemonService: Generando recomendaciones para "${input}"`);
            const allPokemon = await PokemonService.fetchAllPokemon();
            // Filtrar nombres que contienen el input
            const suggestions = allPokemon.filter(name => name.includes(input.toLowerCase()));
            // Ordenar por proximidad al inicio
            suggestions.sort((a, b) => a.indexOf(input.toLowerCase()) - b.indexOf(input.toLowerCase()));
            // Limitar el número de sugerencias
            const limitedSuggestions = suggestions.slice(0, maxSuggestions);
            console.log('PokemonService: Recomendaciones generadas:', limitedSuggestions);
            return limitedSuggestions;
        } catch (error) {
            console.error('PokemonService: Error al obtener recomendaciones:', error);
            return [];
        }
    },

    // Función para obtener la cadena de evolución
    fetchEvolutionChain: async (speciesUrl) => {
        try {
            console.log(`PokemonService: Obteniendo cadena de evolución desde "${speciesUrl}"`);
            const speciesResponse = await fetch(speciesUrl);
            if (!speciesResponse.ok) {
                throw new Error('Error al obtener la especie del Pokémon.');
            }
            const speciesData = await speciesResponse.json();

            const evolutionResponse = await fetch(speciesData.evolution_chain.url);
            if (!evolutionResponse.ok) {
                throw new Error('Error al obtener la cadena de evolución.');
            }
            const evolutionData = await evolutionResponse.json();

            // Procesar la cadena de evolución
            const evolutionChain = [];
            let currentEvolution = evolutionData.chain;

            do {
                evolutionChain.push({
                    name: currentEvolution.species.name,
                    isBaby: currentEvolution.is_baby
                });
                currentEvolution = currentEvolution.evolves_to[0];
            } while (currentEvolution && currentEvolution.hasOwnProperty('evolves_to'));

            console.log('PokemonService: Cadena de evolución procesada:', evolutionChain);
            return evolutionChain;
        } catch (error) {
            console.error('PokemonService: Error al obtener la cadena de evolución:', error);
            return [];
        }
    }
};
