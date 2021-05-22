module.exports = (key) => {
    return validateKey(key)
}

function validateKey(key) {
    if(!key) return console.error('No API key specified!')
    if(typeof key !== "string") return console.error('API Key must be a string!')
    if(key.length < 30) return console.error('Invalid API Key!')
    return key
}