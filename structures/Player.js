const Skywars = require("../stats/SkyWars");
const Pet = require("./Pet");
const Color = require('./Color');

class Player {
    /**
     * @param {object} data Player data.
     */
    constructor(data) {
        /**
         * Player IGN.
         * @type {string}
         */
        this.ign = data.displayname
        /**
         * Player UUID.
         * @type {string}
         */
        this.uuid = data.uuid
        /**
         * Player level.
         * @type {number}
         */
        this.level = getLevel(data)
        /**
         * Player level progress.
         * @type {PlayerLevelProgress}
         */
        this.levelProgress = playerLevelProgress(data)
        /**
         * Player karma.
         * @type {number}
         */
        this.karma = data.karma
        /**
         * Player rank.
         * @type {Ranks}
         */
        this.rank = getRank(data)
        /**
         * Player version
         * @type {string}
         */
        this.version = data.mcVersionRp ? data.mcVersionRp : null;
        /**
         * Name history.
         * @type {Array<string>}
         */
        this.nameHistory = data.knownAliases
        /**
         * First login.
         * @type {Date}
         */
        this.firstLogin = data.firstLogin ? new Date(data.firstLogin) : null
        /**
         * First login in milliseconds.
         * @type {number}
         */
        this.firstLoginTimestamp = data.firstLogin ? data.firstLogin : null
        /**
         * Last login.
         * @type {Date}
         */
        this.lastLogin = data.lastLogin ? new Date(data.lastLogin) : null
        /**
         * Last login timestamp.
         * @type {number}
         */
        this.lastLoginTimestamp = data.lastLogin ? data.lastLogin : null
        /**
         * Last logout.
         * @type {Date}
         */
        this.lastLogout = data.lastLogout ? new Date(data.lastLogout) : null
        /**
         * Last logout timestamp.
         * @type {Date}
         */
        this.lastLogoutTimestamp = data.lastLogout ? data.lastLogout : null
        /**
         * Network experience.
         * @type {number}
         */
        this.experience = data.networkExp || 0
        /**
         * Equipped cosmetics.
         */
        this.equippedCosmetics = {
            clickEffect: (data.currentClickEffect ? data.currentClickEffect.replace(/[A-Z]/g, (x) => x.toLowerCase()).replace(/[a-z]/, (x) => x[0].toUpperCase()).replace(/_[a-z]/g, (x) => ' '+x[1].toUpperCase()) : null),
            cloak: (data.currentCloak ? data.currentCloak.replace(/[A-Z]|/g, (x) => x.toLowerCase()).replace(/[a-z]/, (x) => x[0].toUpperCase()).replace(/_[a-z]/g, (x) => ' '+x[1].toUpperCase()) : null),
            particlePack: (data.particlePack ? data.particlePack.replace(/[A-Z]/g, (x) => x.toLowerCase()).replace(/[a-z]/, (x) => x[0].toUpperCase()).replace(/_[a-z]/g, (x) => ' '+x[1].toUpperCase()) : null)
        }
        /**
         * All cosmetics.
         */
        this.allCosmetics = (data.vanityMeta ? {
            /**
             * Cloaks
             * @type {string[]}
             */
            cloaks: data.vanityMeta.packages.filter((x) => x.startsWith('cloak_')) ? data.vanityMeta.packages.filter((x) => x.startsWith('cloak_')).map((x) => snakeCase(x.replace('cloak_', ''))) : [],
            /**
             * Suits
             * @type {string[]}
             */
            suits: data.vanityMeta.packages.filter((x) => x.startsWith('suit_')) ? data.vanityMeta.packages.filter((x) => x.startsWith('suit_')).map((x) => snakeCase(x.replace('suit_', ''))) : [],
            /**
             * Taunts
             * @type {string[]}
             */
            taunts: data.vanityMeta.packages.filter((x) => x.startsWith('taunt_')) ? data.vanityMeta.packages.filter((x) => x.startsWith('taunt_')).map((x) => snakeCase(x.replace('taunt_', ''))) : [],
            /**
             * Hats
             * @type {string[]}
             */
            hats: data.vanityMeta.packages.filter((x) => x.startsWith('hat_')) ? data.vanityMeta.packages.filter((x) => x.startsWith('hat_')).map((x) => snakeCase(x.replace('hat_', ''))) : [],
            /**
             * Emotes
             * @type {string[]}
             */
            emotes: data.vanityMeta.packages.filter((x) => x.startsWith('emote_')) ? data.vanityMeta.packages.filter((x) => x.startsWith('emote_')).map((x) => snakeCase(x.replace('emote_', ''))) : [],
            /**
             * Pets
             * @type {string[]}
             */
            pets: data.vanityMeta.packages.filter((x) => x.startsWith('pet_')) ? data.vanityMeta.packages.filter((x) => x.startsWith('pet_')).map((x) => snakeCase(x.replace('pet_', ''))) : [],
            /**
             * Morphs
             * @type {string[]}
             */
            morphs: data.vanityMeta.packages.filter((x) => x.startsWith('morph_')) ? data.vanityMeta.packages.filter((x) => x.startsWith('morph_')).map((x) => snakeCase(x.replace('morph_', ''))) : [],
            /**
             * Gadgets
             * @type {string[]}
             */
            gadgets: data.vanityMeta.packages.filter((x) => x.startsWith('gadget_')) ? data.vanityMeta.packages.filter((x) => x.startsWith('gadget_')).map((x) => snakeCase(x.replace('gadget_', ''))) : [],
            /**
             * Rank color
             * @type {string[]}
             */
            rankColor: data.vanityMeta.packages.filter((x) => x.startsWith('rankcolor_')) ? data.vanityMeta.packages.filter((x) => x.startsWith('rankcolor_')).map((x) => rankColorCase(x.replace('rankcolor_', ''))) : [],
            /**
             * Particle pack
             * @type {string[]}
             */
            particlePack: data.vanityMeta.packages.filter((x) => x.startsWith('particlepack_')) ? data.vanityMeta.packages.filter((x) => x.startsWith('particlepack_')).map((x) => snakeCase(x.replace('particlepack_', ''))) : [],
        } : [])
        /**
         * Current player channel.
         * @type {string}
         */
        this.channel = data.channel
        /**
         * Player language.
         * @type {string}
         */
        this.language = data.userLanguage || 'English'
        /**
         * All game stats.
         */
        this.stats = (data.stats ? {
            skywars: (data.stats.SkyWars ? new Skywars(data.stats.SkyWars) : null)
        } : null)
        /**
         * Social media.
         */
        this.socialMedia = getSocials(data.socialMedia)
        /**
         * Player's pet information.
         */
        this.pet = (data.currentPet ? new Pet(data) : null)
        /**
         * Player's achievement points.
         * @type {number}
         */
        this.achievementPoints = data.achievementPoints || 0
        /**
         * Quests completed.
         * @type {number}
         */
        this.questsCompleted = data.achievements.general_quest_master || 0
        /**
         * Challenges completed.
         * @type {number}
         */
        this.challengesCompleted = challengesComplete(data)
        /**
         * Achievement Point rewards collected.
         * @type {number}
         */
        this.APRewardsCollected = achievementPointRewardsCollected(data)
        /**
         * Achievements completed.
         * @type {number}
         */
        this.achievementsCompleted = achievementsComplete(data.achievementsOneTime)
        /**
         * Ranks gifted.
         * @type {number}
         */
        this.ranksGifted = data.giftingMeta ? (data.giftingMeta.ranksGiven ? data.giftingMeta.ranksGiven : 0) : 0
        /**
         * Player's plus color (must be a MVP+ rank)
         * @type {Color|null}
         */
        this.plusColor = this.rank === 'MVP+' || this.rank === 'MVP++' ? (data.rankPlusColor ? new Color(data.rankPlusColor) : null) : null;
        /**
         * MVP++ prefix color
         * @type {Color|null}
         */
        this.prefixColor = this.rank === 'MVP++' ? (data.monthlyRankColor ? new Color(data.monthlyRankColor) : new Color('GOLD')) : null;
        /**
         * Bundles (ranks or mystery boxes) received.
         * @type {number}
         */
        this.giftsReceived = data.giftingMeta ? data.giftingMeta.realBundlesReceived : 0
        /**
         * Player's favorited cosmetics.
         * @type {Array<string>}
         */
        this.favoriteCosmetics = data.vanityFavorites ? vanityFavorites(data) : [];
        /**
         * Player's current gadget.
         * @type {string}
         */
        this.currentGadget = data.currentGadget ? currentGadget(data) : null;
    }
}
/**
 * @description Get a player's favorite gadgets.
 * @param {object} player 
 * @returns {Array}
 */
function vanityFavorites(player) {
    let favorites;
    favorites = player.vanityFavorites.replace(/;/gi, ' ').toLowerCase().split(" ")
    for (let i = 0; i < favorites.length; i++) {
        favorites[i] = favorites[i][0].toUpperCase() + favorites[i].substr(1);
    }
    for (let i = 0; i < favorites.length; i++) {
        favorites[i] = favorites[i].replace(/_[a-z]/gi, (x) => ' '+x[1].toUpperCase())
    }
    return favorites
}
/**
 * @description Gets a player's current Gadget.
 * @param {object} player
 * @returns {string}
 */
 function currentGadget(player) {
    let gadget;
    const gadgets = player.currentGadget.toLowerCase().toString()
    gadget = gadgets[0].toUpperCase() + gadgets.substr(1)
    return gadget
}
/**
 * @description Gets a player's challenges completed.
 * @param {object} player
 * @returns {number}
 */
function challengesComplete(player) {
    let challenges = Object.values(player.challenges.all_time).reduce((a, b) => a+b, 0);
    return challenges
}
/**
 * @description Gets a player's rank.
 * @param {object} player
 * @returns {string}
 */
function getRank(player) {
    let rank;
    if(player.prefix) {
        rank = player.prefix.replace(/§[0-9a-z]|\[|\]/g, '')
    } else if(player.rank && player.rank !== 'NORMAL') {
        switch (player.rank) {
            case 'MODERATOR':
              rank = 'Moderator';
              break;
            case 'YOUTUBER':
              rank = 'YouTube';
              break;
            case 'HELPER':
              rank = 'Helper';
              break;
            case 'ADMIN':
              rank = 'Admin';
              break;
          }
    } else {
        switch (player.newPackageRank) {
          case 'MVP_PLUS':
            rank = player.monthlyPackageRank && player.monthlyPackageRank === 'SUPERSTAR' ? 'MVP++' : 'MVP+';
            break;
          case 'MVP':
            rank = 'MVP';
            break;
          case 'VIP_PLUS':
            rank = 'VIP+';
            break;
          case 'VIP':
            rank = 'VIP';
            break;
          default:
            rank = player.monthlyPackageRank && player.monthlyPackageRank === 'SUPERSTAR' ? 'MVP++' : 'Default';
        }
      }
      return rank;
}
/**
 * @description Gets a player's level.
 * @param {object} player
 * @returns {number}
 */
function getLevel(player) {
    let networkLevel;
    networkLevel = Math.sqrt(player.networkExp/1250+12.25)-3.5
    return networkLevel + 1;
}
/**
 * @description EXP to next player level.
 * @param {object} player
 * @returns {number}
 */
function xpToNextLevel(player) {
    const lvl = getLevel(player)
    let xpToNext = (2500*Math.floor(lvl))+5000
    if(player.networkExp < 10000) return 10000
    return xpToNext
}
function levelToXP(player) {
    let level = Number(Math.floor(getLevel(player)))
    level = level - 1
    let xp = 1250*level**2 + 8750*level
    return xp
}
/**
 * Player Network level Progress
 * @param {Object} player player data
 * @returns {{xpToNext:number,currentXP:number,percent:number,remainingXP:number,percentRemaining:number}}
 */
function playerLevelProgress(player) {
    let xpFromLevel = levelToXP(player)
    let currentXP = (player.networkExp - xpFromLevel)
    const xpToNext = xpToNextLevel(player)
    const remainingXP = (xpToNext - currentXP)+2500
    currentXP = currentXP - 2500
    let percent = (Math.round(((currentXP / xpToNext) * 100) * 100)/ 100)
    const percentRemaining = Math.round((100 - percent)*100)/100
    return {
        xpToNext,
        currentXP,
        remainingXP,
        percent,
        percentRemaining
    }
}
function snakeCase(string) {
    return string.toLowerCase().replace(/_[a-z]/gi, (x) => x[1].toUpperCase());
}
function rankColorCase(string) {
    return string.toUpperCase()
}
/**
 * @description Social media output.
 * @param {object} player
 * @returns {Array<{name:string,link:string}>}
 */
function getSocials(social) {
    if(!social) return null;
    const links = social.links
    const bigNames = ['TWITTER', 'YOUTUBE', 'INSTAGRAM', 'TWITCH', 'HYPIXEL', 'DISCORD'];
    const cleanNames = ['Twitter', 'YouTube', 'Instagram', 'Twitch', 'Hypixel', 'Discord'];
    if(!links) return null;
    const filter = Object.keys(links).map((x) => bigNames.indexOf(x))
    if(filter.includes(undefined)) {
        filter.filter((x) => x !== -1)
    }
    const result = filter.map((x) => ({name: cleanNames[x], link: links[bigNames[x]]}))
    return result
}
function achievementsComplete(data) {
    data = Object.keys(data).length
    return data
}
function achievementPointRewardsCollected(data) {
    return Object.keys(data.achievementRewardsNew).length
}
/**
 * @typedef {string} Ranks
 * * `Default`
 * * `MVP++`
 * * `MVP+`
 * * `MVP`
 * * `VIP+`
 * * `VIP`
 * * `YouTube`
 * * `Admin`
 * * `Helper`
 * * `Moderator`
 */

/**
 * @typedef {Object} PlayerLevelProgress
 * @property {number} xpToNext Total XP to a player's next level.
 * @property {number} realXP Approximate XP to the player's next level.
 * @property {number} percent Player level progress as a percentage.
 * @property {number} percentRemaining Remaining percentage of the percent value.
 */

module.exports = Player;