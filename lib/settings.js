const { cmd, commands } = require('./command');
const config = require('../config');
const prefix = config.PREFIX;
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('./functions2');
const { writeFileSync } = require('fs');
const path = require('path');


// SET PREFIX
cmd({
    pattern: "setprefix",
    alias: ["prefix"],
    react: "🔧",
    desc: "Change the bot's command prefix.",
    category: "settings",
    filename: __filename,
}, async (conn, mek, m, { args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 Only the owner can use this command!*");

    const input = args[0];
    if (!input) {
        return reply(`📌 Current prefix: *${config.PREFIX}*\n\nUse:\n• *.setprefix 1* = \`.\`\n• *.setprefix 2* = \`!\`\n• *.setprefix 3* = \`/\``);
    }

    const prefixMap = {
        "1": ".",
        "2": "!",
        "3": "/"
    };

    const selectedPrefix = prefixMap[input] || input;

    if (!selectedPrefix) return reply("❌ Invalid input. Use:\n• *.setprefix 1* = `.`\n• *.setprefix 2* = `!`\n• *.setprefix 3* = `/`");

    config.PREFIX = selectedPrefix;
    return reply(`✅ _Prefix successfully changed to_ *${selectedPrefix}*`);
});

// SET MODE
cmd({
    pattern: "mode",
    alias: ["setmode"],
    react: "🫟",
    desc: "Set bot mode to private or public.",
    category: "settings",
    filename: __filename,
}, async (conn, mek, m, { args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 Only the owner can use this command!*");

    const input = args[0]?.toLowerCase();
    if (!input) {
        return reply(`📌 Current mode: *${config.MODE}*\n\nUse:\n• *.mode 1* = Private\n• *.mode 2* = Public`);
    }

    if (input === "1" || input === "private") {
        config.MODE = "private";
        return reply("✅ _Bot mode is now set to_ *PRIVATE*.");
    } else if (input === "2" || input === "public") {
        config.MODE = "public";
        return reply("✅ _Bot mode is now set to_ *PUBLIC*.");
    } else {
        return reply("❌ Invalid input. Use:\n• *.mode 1* = Private\n• *.mode 2* = Public");
    }
});

// AUTO-REACT
cmd({
    pattern: "auto-react",
    alias: ["autoreact"],
    desc: "Enable or disable the auto-react feature",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 Only the owner can use this command!*");

    const input = args[0]?.toLowerCase();
    if (!input) {
        return reply(`📌 Auto-react is currently: *${config.AUTO_REACT === "true" ? "ENABLED" : "DISABLED"}*\n\nUse:\n• *.auto-react 1* = Enable\n• *.auto-react 2* = Disable`);
    }

    if (input === "1" || input === "on") {
        config.AUTO_REACT = "true";
        return reply("✅ *Auto-react enabled.*");
    } else if (input === "2" || input === "off") {
        config.AUTO_REACT = "false";
        return reply("✅ *Auto-react disabled.*");
    } else {
        return reply("❌ Invalid input. Use:\n• *.auto-react 1* = Enable\n• *.auto-react 2* = Disable");
    }
});
