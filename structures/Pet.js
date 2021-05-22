class Pet {
    constructor(data) {
        /**
         * Gets a player's current pet.
         * @type {string}
         */
        this.petType = data.currentPet ? currentPet(data) : null;
        /**
         * Gets the pet name.
         * @type {string}
         */
        this.petName = data.petStats ? petName(data) : null
        /**
         * All current pet stats.
         */
        this.petStats = (data.petStats ? {
            /**
             * Pet experience.
             * @type {number}
             */
            experience: data.petStats[data.currentPet] ? data.petStats[data.currentPet].experience : null,
            /**
             * Raw pet name.
             * @type {string}
             */
            name: data.petStats[data.currentPet] ? data.petStats[data.currentPet].name : null,
            thirst: (data.petStats[data.currentPet] ? {
                /**
                 * Thirst timestamp.
                 * @type {Date}
                 */
                timestamp: data.petStats[data.currentPet].THIRST ? new Date(data.petStats[data.currentPet].THIRST.timestamp) : null,
                /**
                 * Thirst value.
                 * @type {number}
                 */
                value: data.petStats[data.currentPet].THIRST ? data.petStats[data.currentPet].THIRST.value : null
            } : null),
            exercise: (data.petStats[data.currentPet] ? {
                /**
                 * Exercise timestamp.
                 * @type {Date}
                 */
                timestamp: data.petStats[data.currentPet].EXERCISE ? new Date(data.petStats[data.currentPet].EXERCISE.timestamp) : null,
                /**
                 * Exercise value.
                 * @type {number}
                 */
                value: data.petStats[data.currentPet].EXERCISE ? data.petStats[data.currentPet].EXERCISE.value : null
            } : null),
            hunger: (data.petStats[data.currentPet] ? {
                /**
                 * Hunger timestamp.
                 * @type {Date}
                 */
                timestamp: data.petStats[data.currentPet].HUNGER ? new Date(data.petStats[data.currentPet].HUNGER.timestamp) : null,
                /**
                 * Hunger value.
                 * @type {number}
                 */
                value: data.petStats[data.currentPet].HUNGER ? data.petStats[data.currentPet].HUNGER.value : null
            } : null)
        } : null)
    }
}
/**
 * @description Gets a player's current Pet.
 * @param {object} player
 * @returns {string}
 */
 function currentPet(player) {
    let pet;
    const pets = player.currentPet.toLowerCase().toString()
    pet = pets[0].toUpperCase() + pets.substr(1)
    return pet
}
/**
 * @description Gets a player's pet name.
 * @param {object} player 
 * @returns {array}
 */
function petName(player) {
    const petType = player.currentPet ? player.currentPet : null
    let rawPet = player.petStats[petType] ? player.petStats[petType].name : null;
    if(rawPet === null) return null;
    let namedPet = rawPet.replace(/§[0-9A-Za-z]/g, '')
    return namedPet
}

module.exports = Pet;