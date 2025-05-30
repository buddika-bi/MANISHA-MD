const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "svEWFJhY#js5-b5WOumgdchibUPJF21d634GYTYa2ZFeRkxxId_E",
    MODE: process.env.MODE || "private",
    PREFIX: process.env.PREFIX || "/",
    AUTHOR: (process.env.PACK_INFO?.split(';') || [])[0] || 'MANISHA MD',
    PACKNAME: (process.env.PACK_INFO?.split(';') || [])[1] || 'MANISHA MD',
    ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/vbi10j.png",
    ALIVE_MSG: process.env.ALIVE_MSG || "HII DEAR IM ONLINE I'M MANISHA-MD WHATSAPP BOT 😊♻️",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "AIzaSyBP9qAGQUHjtIPuaZcyvSnbZDGSyHUD6bc",
    MOVIE_API_KEY: process.env.MOVIE_API_KEY || "sky|decd54b4fa030634e54d6c87fdffbb95f0bb9fb5"
    };
    
