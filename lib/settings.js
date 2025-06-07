const { cmd } = require('./command');
const config = require('../config');

cmd({
  pattern: "setprefix",
  alias: ["prefix"],
  react: "🔧",
  desc: "Change the bot's command prefix via reply.",
  category: "settings",
  filename: __filename,
}, async (conn, mek, m, { from, isOwner }) => {
  if (!isOwner) return conn.sendMessage(from, { text: "*📛 Only the owner can use this command!*" });

  const sentMsg = await conn.sendMessage(from, {
    text: `*🔧 Set New Prefix:*\n\nPlease reply to this message with the new prefix (e.g., !, ., $, /)`
  });

  const messageID = sentMsg.key.id;

  const messageListener = async (msgData) => {
    try {
      const receivedMsg = msgData.messages[0];
      if (!receivedMsg || receivedMsg.key.remoteJid !== from) return;

      const isReplyToBot = receivedMsg.message?.extendedTextMessage?.contextInfo?.stanzaId === messageID;
      const text = receivedMsg.message.conversation || receivedMsg.message.extendedTextMessage?.text;
      if (!isReplyToBot || !text) return;

      const newPrefix = text.trim();

      if (!newPrefix || newPrefix.length > 2) {
        await conn.sendMessage(from, { text: "❌ Invalid prefix. Please use a single or double character symbol." });
      } else {
        config.PREFIX = newPrefix;
        await conn.sendMessage(from, { text: `✅ *Prefix successfully changed to:* \`${newPrefix}\`` });
      }

      // Remove listener after use
      conn.ev.off("messages.upsert", messageListener);
    } catch (e) {
      console.error("Prefix set error:", e);
    }
  };

  conn.ev.on("messages.upsert", messageListener);
});


cmd({
  pattern: "mode",
  alias: ["setmode"],
  react: "🫟",
  desc: "Set bot mode to private or public via reply.",
  category: "settings",
  filename: __filename,
}, async (conn, mek, m, { from, isOwner }) => {
  if (!isOwner) return conn.sendMessage(from, { text: "*📛 Only the owner can use this command!*" });

  const sentMsg = await conn.sendMessage(from, {
    text: `*📌 Select Bot Mode:*\n\n1. Private\n2. Public\n\n_Reply with number to choose the mode._`
  });

  const messageID = sentMsg.key.id;

  const messageListener = async (msgData) => {
    try {
      const receivedMsg = msgData.messages[0];
      if (!receivedMsg || receivedMsg.key.remoteJid !== from) return;

      const isReplyToBot = receivedMsg.message?.extendedTextMessage?.contextInfo?.stanzaId === messageID;
      const text = receivedMsg.message.conversation || receivedMsg.message.extendedTextMessage?.text;
      if (!isReplyToBot || !text) return;

      const replyText = text.trim();

      if (replyText === "1") {
        config.MODE = "private";
        await conn.sendMessage(from, { text: "✅ *Bot mode set to PRIVATE.*" });
      } else if (replyText === "2") {
        config.MODE = "public";
        await conn.sendMessage(from, { text: "✅ *Bot mode set to PUBLIC.*" });
      } else {
        await conn.sendMessage(from, { text: "❌ Invalid option. Please reply with 1 or 2." });
      }

      // Remove listener after one-time use
      conn.ev.off("messages.upsert", messageListener);
    } catch (e) {
      console.error("Mode select error:", e);
    }
  };

  conn.ev.on("messages.upsert", messageListener);
});



cmd({
  pattern: "auto-react",
  alias: ["autoreact"],
  desc: "Enable or disable the auto-react feature via reply.",
  category: "settings",
  filename: __filename,
}, async (conn, mek, m, { from, isOwner }) => {
  if (!isOwner) return conn.sendMessage(from, { text: "*📛 Only the owner can use this command!*" });

  const sentMsg = await conn.sendMessage(from, {
    text: `*🤖 Auto-React Setting:*\n\n1. ON\n2. OFF\n\n_Reply with number to enable or disable auto-react._`
  });

  const messageID = sentMsg.key.id;

  const messageListener = async (msgData) => {
    try {
      const receivedMsg = msgData.messages[0];
      if (!receivedMsg || receivedMsg.key.remoteJid !== from) return;

      const isReplyToBot = receivedMsg.message?.extendedTextMessage?.contextInfo?.stanzaId === messageID;
      const text = receivedMsg.message.conversation || receivedMsg.message.extendedTextMessage?.text;
      if (!isReplyToBot || !text) return;

      const replyText = text.trim();

      if (replyText === "1") {
        config.AUTO_REACT = "true";
        await conn.sendMessage(from, { text: "✅ *Auto-react enabled.*" });
      } else if (replyText === "2") {
        config.AUTO_REACT = "false";
        await conn.sendMessage(from, { text: "✅ *Auto-react disabled.*" });
      } else {
        await conn.sendMessage(from, { text: "❌ Invalid option. Please reply with 1 or 2." });
      }

      // Remove listener after one-time use
      conn.ev.off("messages.upsert", messageListener);
    } catch (e) {
      console.error("Auto-react error:", e);
    }
  };

  conn.ev.on("messages.upsert", messageListener);
});
