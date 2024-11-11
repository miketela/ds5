// modules/ability.js

export class Ability {
    constructor(name, learners) {
        this.name = name;
        this.learners = learners;
    }

    capitalizeName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }

    getHTMLRepresentation() {
        return `
            <div class="ability-info">
                <h3 class="ability-title">${this.capitalizeName()}</h3>
                <div class="ability-content">
                    <p class="p-ability"><strong>Quién puede aprenderla:</strong></p>
                    <ul class="ability-learners">
                        ${this.learners.map(learner => `
                            <li>
                                ${learner.name.charAt(0).toUpperCase() + learner.name.slice(1)}
                                ${learner.isHidden ? '<span class="hidden-ability-indicator">👁️</span>' : ''}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
}
