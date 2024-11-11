// pokemonService.js

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
            return data;
        } catch (error) {
            console.error('PokemonService: Error al obtener datos:', error);
            throw error;
        }
    },

    // Función para obtener todos los Pokémon y almacenarlos en caché
    fetchAllPokemon: async () => {
        if (PokemonService.allPokemon) {
            // Retorna el caché si ya está cargado
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
            console.log('PokemonService: Lista completa de Pokémon obtenida.');
            return allPokemon;
        } catch (error) {
            console.error('PokemonService: Error al obtener la lista completa de Pokémon:', error);
            throw error;
        }
    },

    // Función para generar recomendaciones basadas en el input
    getRecommendations: async (input, maxSuggestions = 5) => {
        try {
            const allPokemon = await PokemonService.fetchAllPokemon();
            // Filtrar nombres que contienen el input
            const suggestions = allPokemon.filter(name => name.includes(input.toLowerCase()));
            // Ordenar por proximidad al inicio
            suggestions.sort((a, b) => a.indexOf(input.toLowerCase()) - b.indexOf(input.toLowerCase()));
            // Limitar el número de sugerencias
            return suggestions.slice(0, maxSuggestions);
        } catch (error) {
            console.error('PokemonService: Error al obtener recomendaciones:', error);
            return [];
        }
    }
};
