const fetch = require('node-fetch')
const cache = new Map()
const sessionURL = 'https://sessionserver.mojang.com/session/minecraft/profile/'

function emptyCache(name) {
    return cache.delete(name)
}
async function getUUID(url, query) {
    const reg = /^[0-9a-f]{32}$/i.test(query)
    const check = Array.from(cache.entries()).find((x) => x[1].toLowerCase() === query.toLowerCase());
    const check2 = Array.from(cache.entries()).find((x) => x[0].toLowerCase() === query.toLowerCase());
    if(check) {
        return cache.get(check[0])
    } else if(check2) {
        return cache.get(check2[0])
    }
    if(reg) {
        const uuidGetter = cache.get(query)
        let name;
        if(uuidGetter === undefined) {
            const n = await fetch(sessionURL+query)
            const res = await n.json()
            if(res.error) throw new Error("Malformed UUID!")
            name = res.name.toLowerCase()
            cache.set(res.name.toLowerCase(), res.id)
            setTimeout(emptyCache, 120000, res.name.toLowerCase())
        }
        return cache.get(name)
    }
    const getter = cache.get(query.toLowerCase())
    if(getter === undefined && reg === false) {
        const m = await fetch(url)
        const res = await m.json()
        if(res.error) throw new Error("Malformed UUID!")
        cache.set(res.name.toLowerCase(), res.id)
        setTimeout(emptyCache, 120000, res.name.toLowerCase())
    }
    return cache.get(query.toLowerCase())
}

module.exports = async (url, query) => {
    return await getUUID(url, query);
}
