const fetch = require('node-fetch')
const cache = new Map()

function emptyCache(data) {
    return cache.delete(data)
}
async function getData(url, query) {
    const dataGet = cache.get(query)
    if(dataGet === undefined) {
        const p = await fetch(url+query)
        const dataObj = await p.json()
        if(query && !dataObj.player) throw new Error("Player has never logged in!")
        cache.set(query, dataObj.player)
        setTimeout(emptyCache, 120000, query)
    }
    return cache.get(query)
}
module.exports = async (url, query) => {
    return getData(url, query)
}