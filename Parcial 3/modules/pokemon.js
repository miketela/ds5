// modules/pokemon.js

export class Pokemon {
    constructor(name, id, frontSprite, backSprite, weight, height, evolutionChain, abilities) {
        this.name = name;
        this.id = id;
        this.frontSprite = frontSprite;
        this.backSprite = backSprite;
        this.weight = weight;
        this.height = height;
        this.evolutionChain = evolutionChain;
        this.abilities = abilities;
    }

    capitalizeName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }

    getHTMLRepresentation() {
        return `
            <h3 class="pokemon-title">${this.capitalizeName()} (#${this.id})</h3>
            <div class="main-info">
                <div class="grid-container">
                    <div class="grid-item sprites">
                        <p><strong>Sprites:</strong></p>
                        <div class="sprites-images">
                            <img src="${this.frontSprite}" alt="${this.name} frente" onerror="this.src='../assets/default-front.png'">
                            <img src="${this.backSprite}" alt="${this.name} atrás" onerror="this.src='../assets/default-back.png'">
                        </div>
                    </div>
                    <div class="grid-item weight-height">
                        <p><strong>Weight/Height</strong></p>
                        <div class="weight-height-values">
                            <p>${this.weight} KG / ${this.height} M</p>
                        </div>
                    </div>
                    <div class="grid-item evolution">
                        <p><strong>Cadena de evolución:</strong></p>
                        <ul class="evolution-list">
                            ${this.evolutionChain.map(evo => `
                                <li>
                                    ${evo.name.charAt(0).toUpperCase() + evo.name.slice(1)}
                                    ${evo.isBaby ? '👶' : ''}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="grid-item abilities">
                        <p><strong>Habilidades:</strong></p>
                        <ul class="abilities-list">
                            ${this.abilities.map(ability => `
                                <li>
                                    ${ability.name.charAt(0).toUpperCase() + ability.name.slice(1)}
                                    ${ability.isHidden ? '👁️' : ''}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
}
