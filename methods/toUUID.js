const fetch = require('../caches/uuidCache')

module.exports = async (input) => {
    try {
        if (!input) throw new Error("No UUID or IGN entered!");
        if (typeof input !== 'string') throw new Error("UUID or IGN must be a STRING.");
        const resOne = await fetch(`https://api.mojang.com/users/profiles/minecraft/${input}`, input)
        return resOne
    } catch (e) {
        throw new Error("Player doesn't exist!");
    }
}