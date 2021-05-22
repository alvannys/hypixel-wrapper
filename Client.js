const Player = require("./structures/Player");
const toUUID = require('./methods/toUUID');
const getData = require('./caches/pDataCache');
const validate = require('./methods/validate');

class Client {
    /**
     * @param {string} key API Key
     */
    constructor(key) {
        /** @readonly */
        this.key = validate(key)
    }
    /**
     * 
     * @param {string} input A player name or UUID as a string.
     * @description Allows the retrieval of player statistics.
     * @example ``<hypixel>.player('alvanny').then(player => {
     *      console.log(player.ign)
     * })``
     * // returns "Alvanny"
     */
    async player(input) {
        if(this.key === undefined) return
        if(typeof input !== "string") throw new Error("Query must be a string!")
        if(!input) throw new Error("A player must be entered!")
        const playerURL = `https://api.hypixel.net/player?key=${this.key}&uuid=`
        const u = await toUUID(input)
        const res = await getData(playerURL, u)
        return new Player(res)
    }
}
module.exports = Client;