const { SkyWarsPrestigeIcons } = require('../methods/constants')
const divide = require('../methods/divide')

// generateStatsForMode used under MIT License full-use policy from hypixel-api-reborn
const generateStatsForMode = (stats, mode) => {
    return {
      kills: stats[`kills_${mode}`] || 0,
      deaths: stats[`deaths_${mode}`] || 0,
      wins: stats[`wins_${mode}`] || 0,
      losses: stats[`losses_${mode}`] || 0,
      KDRatio: divide(stats[`kills_${mode}`], stats[`deaths_${mode}`]),
      WLRatio: divide(stats[`wins_${mode}`], stats[`losses_${mode}`])
    };
};

class Skywars {
    constructor(stats) {
        /**
         * @type {number}
         */
        this.kills = stats.kills
        /**
        * @type {number}
        */
        this.coins = stats.coins || 0;
        /**
        * @type {number}
        */
        this.souls = stats.souls || 0;
        /**
        * @type {number}
        */
        this.tokens = stats.cosmetic_tokens || 0;
        /**
        * @type {number}
        */
        this.winstreak = stats.win_streak || 0;
        /**
        * @type {number}
        */
        this.losses = stats.losses || 0;
        /**
        * @type {number}
        */
        this.deaths = stats.deaths || 0;
        /**
        * @type {number}
        */
        this.wins = stats.wins || 0;
        /**
        * @type {number}
        */
        this.lootChests = stats.skywars_chests || 0;
        /**
        * @type {number}
        */
        this.openedLootChests = stats.SkyWars_openedChests || 0;
        /**
        * Heads
        */
        this.heads = {
            total: stats.heads || 0,
            divine: stats.heads_divine || 0,
            heavenly: stats.heads_heavenly || 0,
            succulent: stats.heads_succulent || 0,
            decent: stats.heads_decent || 0,
            yucky: stats.heads_yucky || 0,
            tasty: stats.heads_tasty || 0,
            meh: stats.heads_meh || 0,
            eww: stats.heads_eww || 0
        }
        /**
        * @type {number}
        */
        this.experience = stats.skywars_experience || 0;
        /**
        * Formatted Level
        * @type {string}
        */
        this.levelFormatted = stats.levelFormatted ? (stats.levelFormatted.replace(/§l/gm, '**').replace(/§([a-f]|[1-9])/gm, '').replace(/§r/gm, '')) : null;
        /**
        * Prestige Icons
        * @type {SkyWarsPrestigeIcons}
        */
        this.prestigeIcon = stats.selected_prestige_icon ? SkyWarsPrestigeIcons[stats.selected_prestige_icon] : null;
        /**
        * Total Games Played
        * @type {number}
        */
        this.gamesPlayed = (stats.games_solo || 0) + (stats.games_team || 0) + (stats.games_ranked || 0) + (stats.games_mega || 0) + (stats.games_mega_doubles || 0) + (stats.games_lab || 0);
        /**
        * Total KD Ratio
        * @type {number}
        */
        this.KDRatio = divide(this.kills, this.deaths);
        /**
        * Total WL Ratio
        * @type {number}
        */
        this.WLRatio = divide(this.wins, this.losses);
        /**
        * Opals
        * @type {number}
        */
        this.opals = stats.opals || 0;
        /**
        * Avarice
        * @type {number}
        */
        this.avarice = stats.avarice || 0;
        /**
        * Tenacity
        * @type {number}
        */
        this.tenacity = stats.tenacity || 0;
        /**
        * Shards
        * @type {number}
        */
        this.shards = stats.shard || 0;
        this.shardProgress = {
            shardsToNextOpal: 20000 - this.shards,
            percent: shardPercent(this.shards),
            formattedProgress: `${this.shards}/20000 (${shardPercent(this.shards)}%)`
        }
        /**
        * Shard By Mode
        * @type {SkyWarsShardsInMode}
        */
        this.shardsInMode = {
        solo: stats.shard_solo || 0,
        team: stats.shard_team || 0,
        ranked: stats.shard_ranked || 0,
        mega: (stats.shard_mega || 0) + (stats.shard_mega_doubles || 0),
        lab: stats.shard_lab || 0
        };
        /**
        * Solo Skywars Stats
        */
        this.solo = {
            overall: {
              winstreak: stats.winstreak_solo || 0,
              gamesPlayed: stats.games_solo || 0,
              kills: stats.kills_solo || 0,
              wins: stats.wins_solo || 0,
              losses: stats.losses_solo || 0,
              deaths: stats.deaths_solo || 0,
              KDRatio: divide(stats.kills_solo, stats.deaths_solo),
              WLRatio: divide(stats.wins_solo, stats.losses_solo),
              heads: {
                  total: stats.heads_solo || 0,
                  divine: stats.heads_divine_solo || 0,
                  heavenly: stats.heads_heavenly_solo || 0,
                  succulent: stats.heads_succulent_solo || 0,
                  decent: stats.heads_decent_solo || 0,
                  yucky: stats.heads_yucky_solo || 0,
                  tasty: stats.heads_tasty_solo || 0,
                  meh: stats.heads_meh_solo || 0,
                  eww: stats.heads_eww_solo || 0
              },
              assists: stats.assists_solo || 0,
              voidKills: stats.void_kills_solo || 0,
              meleeKills: stats.melee_kills_solo || 0,
              bowKills: stats.bow_kills_solo || 0,
              chestsOpened: stats.chests_opened_solo || 0,
              timePlayed: stats.time_played_solo || 0,
              longestBowShot: stats.longest_bow_shot_solo || 0,
              fastestWin: stats.fastest_win_solo || 0,
              highestKillGame: stats.most_kills_game_solo || 0,
              arrowsShot: stats.arrows_shot_solo || 0,
              arrowsHit: stats.arrows_hit_solo || 0,
              arrowHitMissRatio: divide(stats.arrows_hit_solo, stats.arrows_shot_solo),
              fallKills: stats.fall_kills_solo || 0,
              perkLevels: {
                  bulldozer: stats.solo_bulldozer + 1,
                  juggernaut: stats.solo_juggernaut + 1,
                  endermastery: stats.solo_ender_mastery + 1,
                  blazingArrows: stats.solo_blazing_arrows + 1,
                  resistance: stats.solo_resistance_boost + 1,
                  robbery: stats.solo_robbery + 1,
                  blackMagic: stats.solo_black_magic + 1,
                  luckyCharm: stats.solo_lucky_charm + 1,
                  arrowRecovery: stats.solo_arrow_recovery + 1,
                  fat: stats.solo_fat + 1
              },
              activeKit: stats[`activeKit_SOLO`] ? prettyKit(stats[`activeKit_SOLO`]) : null
            },
            normal: generateStatsForMode(stats, 'solo_normal'),
            insane: generateStatsForMode(stats, 'solo_insane')
        };
          /**
           * Team Skywars Stats
           */
        this.team = {
            overall: {
              winstreak: stats.winstreak_team || 0,
              gamesPlayed: stats.games_team || 0,
              kills: stats.kills_team || 0,
              wins: stats.wins_team || 0,
              losses: stats.losses_team || 0,
              deaths: stats.deaths_team || 0,
              KDRatio: divide(stats.kills_team, stats.deaths_team),
              WLRatio: divide(stats.wins_team, stats.losses_team),
              heads: {
                total: stats.heads_team || 0,
                divine: stats.heads_divine_team || 0,
                heavenly: stats.heads_heavenly_team || 0,
                succulent: stats.heads_succulent_team || 0,
                decent: stats.heads_decent_team || 0,
                yucky: stats.heads_yucky_team || 0,
                tasty: stats.heads_tasty_team || 0,
                meh: stats.heads_meh_team || 0,
                eww: stats.heads_eww_team || 0
              },
              assists: stats.assists_team || 0,
              voidKills: stats.void_kills_team || 0,
              meleeKills: stats.melee_kills_team || 0,
              bowKills: stats.bow_kills_team || 0,
              chestsOpened: stats.chests_opened_team || 0,
              timePlayed: stats.time_played_team || 0,
              longestBowShot: stats.longest_bow_shot_team || 0,
              fastestWin: stats.fastest_win_team || 0,
              highestKillGame: stats.most_kills_game_team || 0,
              arrowsShot: stats.arrows_shot_team || 0,
              arrowsHit: stats.arrows_hit_team || 0,
              arrowHitMissRatio: divide(stats.arrows_hit_team, stats.arrows_shot_team),
              fallKills: stats.fall_kills_team || 0,
              perkLevels: {
                  bulldozer: stats.team_bulldozer + 1,
                  juggernaut: stats.team_juggernaut + 1,
                  endermastery: stats.team_ender_mastery + 1,
                  blazingArrows: stats.team_blazing_arrows + 1,
                  resistance: stats.team_resistance_boost + 1,
                  robbery: stats.team_robbery + 1,
                  blackMagic: stats.team_black_magic + 1,
                  luckyCharm: stats.team_lucky_charm + 1,
                  arrowRecovery: stats.team_arrow_recovery + 1,
                  fat: stats.team_fat + 1
              },
              activeKit: stats[`activeKit_TEAM`] ? prettyTeamKit(stats[`activeKit_TEAM`]) : null
            },
            normal: generateStatsForMode(stats, 'team_normal'),
            insane: generateStatsForMode(stats, 'team_insane')
        };
        this.ranked = {
            winstreak: stats.winstreak_ranked || 0,
            gamesPlayed: stats.games_ranked || 0,
            kills: stats.kills_ranked || 0,
            wins: stats.wins_ranked || 0,
            losses: stats.losses_ranked || 0,
            deaths: stats.deaths_ranked || 0,
            KDRatio: divide(stats.kills_ranked, stats.deaths_ranked),
            WLRatio: divide(stats.wins_ranked, stats.losses_ranked)
          };
          /**
           * Mega Skywars Stats
           */
          this.mega = {
            overall: {
              winstreak: stats.winstreak_mega || 0,
              gamesPlayed: (stats.games_mega || 0) + (stats.games_mega_doubles || 0),
              kills: (stats.kills_mega || 0) + (stats.kills_mega_doubles || 0),
              wins: (stats.wins_mega || 0) + (stats.wins_mega_doubles || 0),
              losses: (stats.losses_mega || 0) + (stats.losses_mega_doubles || 0),
              fastestWin: stats.fastest_win_mega || 0,
              chestsOpened: (stats.chests_opened_mega || 0) + (stats.chests_opened_mega_doubles || 0),
              timePlayed: (stats.time_played_mega || 0) + (stats.time_played_mega_doubles || 0),
              deaths: (stats.deaths_mega || 0) + (stats.deaths_mega_doubles || 0),
              KDRatio: divide(((stats.kills_mega || 0) + (stats.kills_mega_doubles || 0)), ((stats.deaths_mega || 0) + (stats.deaths_mega_doubles || 0))),
              WLRatio: divide(((stats.wins_mega || 0) + (stats.wins_mega_doubles || 0)), ((stats.losses_mega || 0) + (stats.losses_mega_doubles || 0)))
            },
            solo: {
              gamesPlayed: stats.games_mega || 0,
              kills: stats.kills_mega || 0,
              wins: stats.wins_mega || 0,
              activeKit: stats[`activeKit_MEGA`] ? prettyMegaKit(stats[`activeKit_MEGA`]) : null,
              chestsOpened: stats.chests_opened_mega || 0,
              timePlayed: stats.time_played_mega || 0,
              losses: stats.losses_mega || 0,
              deaths: stats.deaths_mega || 0,
              KDRatio: divide(stats.kills_mega || 0, stats.deaths_mega || 0),
              WLRatio: divide(stats.wins_mega || 0, stats.losses_mega || 0)
            },
            doubles: {
              gamesPlayed: stats.games_mega_doubles || 0,
              kills: stats.kills_mega_doubles || 0,
              wins: stats.wins_mega_doubles || 0,
              chestsOpened: stats.chests_opened_mega_doubles || 0,
              timePlayed: stats.time_played_mega_doubles || 0,
              losses: stats.losses_mega_doubles || 0,
              deaths: stats.deaths_mega_doubles || 0,
              KDRatio: divide(stats.kills_mega_doubles || 0, stats.deaths_mega_doubles || 0),
              WLRatio: divide(stats.wins_mega_doubles || 0, stats.losses_mega_doubles || 0)
            }
          };
          /**
           * Skywars Laboratory Stats
           */
          this.lab = {
            winstreak: stats.winstreak_lab || 0,
            gamesPlayed: stats.games_lab || 0,
            kills: stats.kills_lab || 0,
            wins: stats.wins_lab || 0,
            losses: stats.losses_lab || 0,
            deaths: stats.deaths_lab || 0,
            KDRatio: divide(stats.kills_lab, stats.deaths_lab),
            WLRatio: divide(stats.wins_lab, stats.losses_lab),
            assists: stats.assists_lab || 0,
            voidKills: stats.void_kills_lab || 0,
            meleeKills: stats.melee_kills_lab || 0,
            chestsOpened: stats.chests_opened_lab || 0,
            timePlayed: stats.time_played_lab || 0,
            fastestWin: stats.fastest_win_lab || 0,
            eggsThrown: stats.egg_thrown_lab || 0
          };
        /**
         * SkyWars level progress.
         * @type {SkyWarsLevelProgress}
         */
        this.levelProgress = swLevelProg(stats.skywars_experience)
        /**
         * SkyWars level.
         * @type {number}
         */
        this.level = getLevel(stats.skywars_experience)
        /**
         * Blocks placed.
         * @type {number}
         */
        this.blocksPlaced = stats.blocks_placed || 0
        /** 
         *  @type {number} */
        this.highestKillGame = stats.most_kills_game || 0
        /** Blocks Broken
         *  @type {number} */
        this.blocksBroken = stats.blocks_broken || 0
        /** Arrows Hit
         *  @type {number} */
        this.arrowsHit = stats.arrows_hit || 0
        /** Arrows Shot
         *  @type {number} */
        this.arrowsShot = stats.arrows_shot || 0
        /** Arrows H/M Ratio
         *  @type {number} */
        this.arrowHitMissRatio = divide(this.arrowsHit, this.arrowsShot)
        /** Eggs Thrown
         *  @type {number} */
        this.eggsThrown = stats.egg_thrown || 0
        /** Items Enchanted
         *  @type {number} */
        this.itemsEnchanted = stats.items_enchanted || 0
        /** Enderpearls Thrown
         *  @type {number} */
        this.enderpearlsThrown = stats.enderpearls_thrown || 0
        /** Void Kills
         *  @type {number} */
        this.voidKills = stats.void_kills || 0
        /** Melee Kills
         *  @type {number} */
        this.meleeKills = stats.melee_kills || 0
        /** Bow Kills
         *  @type {number} */
        this.bowKills = stats.bow_kills || 0
        /** Chests Opened
         *  @type {number} */
        this.chestsOpened = stats.chests_opened || 0
        /** Last Played Mode
         *  @type {string} */
        this.lastPlayedMode = stats.lastMode ? prettyMode(stats.lastMode) : null
        /** Refill Chests Broken
         *  @type {number} */
        this.brokenRefillChests = stats.refill_chest_destroy || 0
        /** Mob Kills (why does this exist?)
         *  @type {number} */
        this.mobKills = stats.mob_kills
        /** Active Balloon
         *  @type {string} */
        this.activeBalloon = stats.active_balloon ? prettyBalloon(stats.active_balloon) : null
        /** Active Cage
         *  @type {string} */
        this.activeCage = stats.active_cage ? prettyCage(stats.active_cage) : null
        /** Active Victory Dance
         *  @type {string} */
        this.activeVictoryDance = stats.active_victorydance ? prettyDance(stats.active_victorydance) : null
        /** Active Kill Message
         *  @type {string} */
        this.activeKillMsg = stats.active_killmessages ? prettyify(stats.active_killmessages, 'killmessages ', 'Kill Message') : null
        /** Active Death Cry
         *  @type {string} */
        this.activeDeathCry = stats.active_deathcry ? prettyify(stats.active_deathcry, 'deathcry ', 'Death Cry') : null
        /** Active Projectile Trail
         *  @type {string} */
        this.activeProjTrail = stats.active_projectiletrail ? prettyify(stats.active_projectiletrail, 'projectiletrail ', 'Trail') : null
        /** Active Kill Effect
         *  @type {string} */
        this.activeKillEffect = stats.active_killeffect ? prettyify(stats.active_killeffect, 'killeffect ', 'Kill Effect') : null
        /** Assists
         *  @type {number} */
        this.assists = stats.assists || 0
        /** Time Played in milliseconds
         *  @type {number} */
        this.timePlayed = stats.time_played || 0
        /** Fall Kills
         *  @type {number} */
        this.fallKills = stats.fall_kills || 0
        /** Quits (0_0)
         *  @type {number} */
        this.quits = stats.quits || 0
        /** Soul Well Statistics */
        this.soulwell = {
            uses: stats.soul_well || 0,
            legendaries: stats.soul_well_legendaries || 0,
            rares: stats.soul_well_rares || 0,
            paidSouls: stats.paid_souls || 0
        }
        /**
         * Longest bow shot in blocks.
         * @type {number}
         */
        this.longestBowShot = stats.longest_bow_shot || 0
        /**
         * @type {boolean}
         */
        this.isLevelHidden = stats.hide_skywars_level
        /**
         * Fastest win in seconds.
         * @type {number}
         */
        this.fastestWin = stats.fastest_win || 0
    }
}
module.exports = Skywars;

function getLevel(xp) {
    const xps = [0, 20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000];
    let exactLevel = 0
    if (xp >= 15000) {
        exactLevel = (xp - 15000) / 10000 + 12;
    } else {
    for (i = 0; i < xps.length; i++) {
        if (xp < xps[i]) {
            exactLevel = i + (xp - xps[i-1]) / (xps[i] - xps[i-1]);
            break;
            }
        }
    }   
    return exactLevel
}
function prettyMode(mode) {
    mode = mode[0].toUpperCase() + mode.substr(1).toLowerCase()
    return mode
}
function prettyBalloon(bal) {
    bal = bal.replace(/_[a-z]/gi, (x) => ' '+x[1].toUpperCase())
    bal = bal.replace(/balloon /gi, '')
    bal = bal + ' Balloon'
    return bal
}
function prettyCage(cage) {
    cage = cage.replace(/_[a-z]/gi, (x) => ' '+x[1].toUpperCase())
    cage = cage.replace(/cage /gi, '')
    cage = cage + ' Cage'
    return cage
}
function prettyDance(dance) {
    dance = dance.replace(/_[a-z]/gi, (x) => ' '+x[1].toUpperCase())
    dance = dance.replace(/victorydance /gi, '')
    return dance
}
function prettyify(cos, type, pretty) {
    cos = cos.replace(/_[a-z]/gi, (x) => ' '+x[1].toUpperCase())
    cos = cos.replace(type, '')
    cos = cos + ` ${pretty}`
    return cos
}
/**
 * 
 * @param {number} shards 
 * @returns {number}
 */
function shardPercent(shards) {
    shards = (Math.round((shards / 20000)*10000)*10000)/1000
    shards = shards / 1000
    return shards
}
function prettyKit(kit) {
    kit = kit.replace(/kit_advanced_solo/g, '')
    kit = kit.replace(/kit_basic_solo/g, '')
    kit = kit.replace(/_[a-z]/gi, (x) => x[1].toUpperCase())
    return kit
}
function prettyTeamKit(kit) {
    kit = kit.replace(/kit_defending_team/g, '')
    kit = kit.replace(/kit_supporting_team/g, '')
    kit = kit.replace(/kit_attacking_team/g, '')
    kit = kit.replace(/_[a-z]/gi, (x) => x[1].toUpperCase())
    return kit
}
function prettyMegaKit(kit) {
    kit = kit.replace(/kit_mega_mega/g, '')
    kit = kit.replace(/_[a-z]/gi, (x) => x[1].toUpperCase())
    return kit
}
/**
 * @param {number} xp
 * @return {{xpToNext:number,percent:number,xpToNextLevel:number,currentXP:number}}
 */
function swLevelProg(xp) {
    const xps = [0, 20, 70, 150, 250, 500, 1000, 2000, 3500, 6000, 10000, 15000];
    const xpToNextLvl = [0, 20, 50, 80, 100, 250, 500, 1000, 1500, 2500, 4000, 5000]
    let currentXP = xp
    let xpToNext;
    let percent;
    if(xp >= 15000) {
        currentXP -= 15000
        if(currentXP === 0) return { currentXP: 0, xpToNext: 10000, percent: 0, xpToNextLevel: 10000 };
        if(currentXP > 10000) {
            do {
                currentXP -= 10000
            } while (currentXP >= 10000);
        }
        xpToNext = 10000 - currentXP
        percent = (Math.round(((currentXP / 10000) * 100) * 100) / 100);
        return {
            currentXP,
            xpToNext,
            percent,
            xpToNextLevel: 10000
        };
    }
    const totalXP = xpToNextLvl[xps.findIndex((x) => x * 10 - xp > 0)] * 10
    for (let i = 0; i < xpToNextLvl.length; i++) {
        if ((currentXP - xpToNextLvl[i]) < 0) break;
        currentXP -= xpToNextLvl[i];
    }
    xpToNext = totalXP - currentXP
    percent = (Math.round(((currentXP / totalXP) * 100) * 100) / 100);
    return {
      currentXP,
      xpToNext,
      percent,
      xpToNextLevel: totalXP
    };
}

/**
 * @typedef {Object} SkyWarsLevelProgress
 * @property {number} percent Level progress as a percentage.
 * @property {number} currentXP XP to next level.
 * @property {number} xpToNextLevel Total XP for the next level.
 * @property {number} xpToNext Remaining XP for the next level.
 */