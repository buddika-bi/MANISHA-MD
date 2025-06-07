const { cmd } = require('./command');
const config = require('../config');

cmd({
    pattern: "settings",
    alias: ["setting", "config"],
    react: "⚙️",
    desc: "Bot main settings control panel",
    category: "settings",
    filename: __filename,
}, async (conn, mek, m, { args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 Only the owner can use this command!*");

    const category = args[0]?.toLowerCase();
    const option = args[1];

    if (!category || !option) {
        return reply(
`⚙️ *Settings Menu:*

1. *Prefix*
• .settings prefix 1  => \`. \`
• .settings prefix 2  => \`! \`
• .settings prefix 3  => \`/ \`

2. *Mode*
• .settings mode 1  => Private
• .settings mode 2  => Public

3. *Auto-react*
• .settings autoreact 1  => Enable
• .settings autoreact 2  => Disable

_Example: .settings mode 1_`
        );
    }

    // === PREFIX ===
    if (category === "prefix") {
        const prefixMap = {
            "1": ".",
            "2": "!",
            "3": "/"
        };
        const selectedPrefix = prefixMap[option] || option;

        if (!selectedPrefix) return reply("❌ Invalid prefix option. Use 1 = `.`, 2 = `!`, 3 = `/`");
        config.PREFIX = selectedPrefix;
        return reply(`✅ _Prefix successfully changed to_ *${selectedPrefix}*`);
    }

    // === MODE ===
    if (category === "mode") {
        if (option === "1" || option === "private") {
            config.MODE = "private";
            return reply("✅ _Bot mode is now set to_ *PRIVATE*.");
        } else if (option === "2" || option === "public") {
            config.MODE = "public";
            return reply("✅ _Bot mode is now set to_ *PUBLIC*.");
        } else {
            return reply("❌ Invalid mode. Use 1 = Private, 2 = Public");
        }
    }

    // === AUTO-REACT ===
    if (category === "autoreact") {
        if (option === "1" || option === "on") {
            config.AUTO_REACT = "true";
            return reply("✅ *Auto-react enabled.*");
        } else if (option === "2" || option === "off") {
            config.AUTO_REACT = "false";
            return reply("✅ *Auto-react disabled.*");
        } else {
            return reply("❌ Invalid input. Use 1 = Enable, 2 = Disable");
        }
    }

    // Unknown setting
    return reply("❌ Unknown setting category. Use: prefix, mode, or autoreact.");
});
