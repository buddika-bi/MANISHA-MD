const { cmd, commands } = require('./command');
const config = require('../config');
const prefix = config.PREFIX;
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('./functions2');
const { writeFileSync } = require('fs');
const path = require('path');

    
cmd({ 
pattern: "settings",
 alias: ["config", "botsettings"],
 react: "⚙️", 
 desc: "Bot settings panel with buttons", 
 category: "settings", 
 filename: __filename, 
 }, async (conn, mek, m, { from, isOwner }) => { 
 if (!isOwner) return conn.sendMessage(from, { text: "💼 Only the owner can access bot settings!" }, { quoted: mek });

await conn.sendMessage(from, {
    text: "⚙️ *BOT SETTINGS PANEL*",
    footer: "Select a setting to configure",
    title: "MANISHA MD - SETTINGS",
    buttonText: "Tap to Choose",
    sections: [
        {
            title: "Configuration Menu",
            rows: [
                {
                    title: "1. Mode",
                    description: `Current: ${config.MODE}`,
                    rowId: ".setconfig mode"
                },
                {
                    title: "2. Auto-React",
                    description: `Current: ${config.AUTO_REACT === "true" ? "ON" : "OFF"}`,
                    rowId: ".setconfig autoreact"
                },
                {
                    title: "3. Prefix",
                    description: `Current: ${config.PREFIX}`,
                    rowId: ".setconfig prefix"
                }
            ]
        }
    ]
}, { quoted: mek });

});

cmd({ 
pattern: "setconfig", 
desc: "Handles settings update from settings menu", 
filename: __filename, 
category: "settings" },
async (conn, mek, m, { args, from, isOwner }) => { 
if (!isOwner) return conn.sendMessage(from, { text: "💼 Only the owner can configure settings!" }, { quoted: mek });

const option = args[0]?.toLowerCase();
if (!option) return conn.sendMessage(from, { text: "❌ Invalid option." }, { quoted: mek });

switch (option) {
    case "mode":
        await conn.sendMessage(from, {
            text: "🔧 *Set Bot Mode*\n\nChoose:\n1. Private\n2. Public",
        }, { quoted: mek });

        conn.ev.once("messages.upsert", async (msgData) => {
            const reply = msgData.messages[0]?.message?.conversation?.toLowerCase();
            if (!reply) return;

            if (["1", "private"].includes(reply)) {
                config.MODE = "private";
                await conn.sendMessage(from, { text: "✅ Mode set to *PRIVATE*" });
            } else if (["2", "public"].includes(reply)) {
                config.MODE = "public";
                await conn.sendMessage(from, { text: "✅ Mode set to *PUBLIC*" });
            } else {
                await conn.sendMessage(from, { text: "❌ Invalid input. Use 1/private or 2/public." });
            }
        });
        break;

    case "autoreact":
        await conn.sendMessage(from, {
            text: "🔁 *Set Auto-React*\n\nChoose:\n1. On\n2. Off",
        }, { quoted: mek });

        conn.ev.once("messages.upsert", async (msgData) => {
            const reply = msgData.messages[0]?.message?.conversation?.toLowerCase();
            if (!reply) return;

            if (["1", "on"].includes(reply)) {
                config.AUTO_REACT = "true";
                await conn.sendMessage(from, { text: "✅ Auto-react enabled" });
            } else if (["2", "off"].includes(reply)) {
                config.AUTO_REACT = "false";
                await conn.sendMessage(from, { text: "✅ Auto-react disabled" });
            } else {
                await conn.sendMessage(from, { text: "❌ Invalid input. Use 1/on or 2/off." });
            }
        });
        break;

    case "prefix":
        await conn.sendMessage(from, {
            text: "✏️ *Set New Prefix*\n\nReply with a single character (e.g., !, #, .)",
        }, { quoted: mek });

        conn.ev.once("messages.upsert", async (msgData) => {
            const reply = msgData.messages[0]?.message?.conversation;
            if (!reply) return;

            if (reply.length === 1) {
                config.PREFIX = reply;
                await conn.sendMessage(from, { text: `✅ Prefix set to *${reply}*` });
            } else {
                await conn.sendMessage(from, { text: "❌ Prefix must be a single character." });
            }
        });
        break;

    default:
        return conn.sendMessage(from, { text: "❌ Unknown config option." }, { quoted: mek });
}

});

