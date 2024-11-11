// modules/pokemonService.js

import { Pokemon } from './pokemon.js';
import { Ability } from './ability.js';

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
            const pokemon = new Pokemon(
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

            // Obtener los Pokémon que pueden aprender esta habilidad
            const learners = data.pokemon.map(p => ({
                name: p.pokemon.name,
                isHidden: p.is_hidden
            }));
            console.log('PokemonService: Pokémon que pueden aprender la habilidad:', learners);

            // Crear objeto Ability
            const ability = new Ability(
                data.name,
                learners
            );

            console.log('PokemonService: Objeto Ability creado:', ability);
            return ability;
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

            while (currentEvolution) {
                evolutionChain.push({
                    name: currentEvolution.species.name,
                    isBaby: currentEvolution.is_baby
                });
                if (currentEvolution.evolves_to.length > 0) {
                    currentEvolution = currentEvolution.evolves_to[0];
                } else {
                    currentEvolution = null;
                }
            }

            console.log('PokemonService: Cadena de evolución procesada:', evolutionChain);
            return evolutionChain;
        } catch (error) {
            console.error('PokemonService: Error al obtener la cadena de evolución:', error);
            return [];
        }
    }
};
