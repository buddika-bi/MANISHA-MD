const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "",
    MODE: process.env.MODE || "private",
    PREFIX: process.env.PREFIX || "/",
    ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/vbi10j.png",
    ALIVE_MSG: process.env.ALIVE_MSG || "HII DEAR IM ONLINE I'M MANISHA-MD WHATSAPP BOT 😊♻️"
    };
    
