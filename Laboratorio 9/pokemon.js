// pokemon.js

export function createPokemon(name, id, frontSprite, backSprite, weight, height) {
    return {
        name,
        id,
        frontSprite,
        backSprite,
        weight,
        height
    };
}

export function capitalizeName(pokemon) {
    if (!pokemon.name) {
        console.warn('capitalizeName: Pokémon object missing "name" property.');
        return '';
    }
    return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
}

export function getHTMLRepresentation(pokemon) {
    if (!pokemon) {
        console.warn('getHTMLRepresentation: Pokémon object is undefined or null.');
        return '<p>Pokémon no disponible.</p>';
    }

    return `
        <h3 class="pokemon-title">${capitalizeName(pokemon)} (#${pokemon.id})</h3>
        <div class="main-info">
            <div class="sprite-group">
                <p><strong>Sprites:</strong></p>
                <div class="sprites">
                    <img src="${pokemon.frontSprite}" alt="${pokemon.name} frente" onerror="this.src='default-front.png'">
                    <img src="${pokemon.backSprite}" alt="${pokemon.name} atrás" onerror="this.src='default-back.png'">
                </div>
            </div>
            <div class="weight-height-group">
                <p><strong>Weight / Height</strong></p>
                <div class="weight-height-values">
                    <p>${pokemon.weight} KG / ${pokemon.height} M</p>
                </div>
            </div>
        </div>
    `;
}
