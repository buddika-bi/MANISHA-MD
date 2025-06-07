const { cmd, commands } = require('./command');
const config = require('../config');
const prefix = config.PREFIX;
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('./functions2');
const { writeFileSync } = require('fs');
const path = require('path');

cmd({ 
  pattern: "settings", 
  desc: "Handles settings update from settings menu", 
  filename: __filename, 
  category: "settings" 
}, async (conn, mek, m, { args, from, isOwner }) => { 

  if (!isOwner) {
    return conn.sendMessage(from, { 
      text: "💼 Only the bot owner can use this command!" 
    }, { quoted: mek });
  }

  const option = args[0]?.toLowerCase();

  if (!option || !["mode", "autoreact", "prefix"].includes(option)) {
    return conn.sendMessage(from, {
      text: "❌ Invalid option!\n\n📌 Available options:\n- mode\n- autoreact\n- prefix\n\nExample: *setconfig mode*",
    }, { quoted: mek });
  }

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
          await conn.sendMessage(from, { text: "✅ Bot mode set to *PRIVATE*!" });
        } else if (["2", "public"].includes(reply)) {
          config.MODE = "public";
          await conn.sendMessage(from, { text: "✅ Bot mode set to *PUBLIC*!" });
        } else {
          await conn.sendMessage(from, { text: "❌ Invalid input! Please reply with 1/private or 2/public." });
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
          await conn.sendMessage(from, { text: "✅ Auto-react is now enabled." });
        } else if (["2", "off"].includes(reply)) {
          config.AUTO_REACT = "false";
          await conn.sendMessage(from, { text: "✅ Auto-react is now disabled." });
        } else {
          await conn.sendMessage(from, { text: "❌ Invalid input! Please reply with 1/on or 2/off." });
        }
      });
      break;

    case "prefix":
      await conn.sendMessage(from, {
        text: "✏️ *Set a New Prefix*\n\nReply with a single character (e.g., !, #, .)",
      }, { quoted: mek });

      conn.ev.once("messages.upsert", async (msgData) => {
        const reply = msgData.messages[0]?.message?.conversation;
        if (!reply) return;

        if (reply.length === 1) {
          config.PREFIX = reply;
          await conn.sendMessage(from, { text: `✅ Prefix set to *${reply}*.` });
        } else {
          await conn.sendMessage(from, { text: "❌ Prefix must be a single character." });
        }
      });
      break;
  }

});
