const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "UjFUHKqY#LbN5-rgqR6f_v3yd8-MwX8zf3vMliouOQMmWWMmgXQI",
    MODE: process.env.MODE || "private",
    PREFIX: process.env.PREFIX || "/",
    AUTO_REACT: process.env.AUTO_REACT || "false",
    AUTHOR: (process.env.PACK_INFO?.split(';') || [])[0] || 'MANISHA MD',
    PACKNAME: (process.env.PACK_INFO?.split(';') || [])[1] || 'MANISHA MD',
    ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/vbi10j.png",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "AIzaSyBP9qAGQUHjtIPuaZcyvSnbZDGSyHUD6bc",
    MOVIE_API_KEY: process.env.MOVIE_API_KEY || "sky|decd54b4fa030634e54d6c87fdffbb95f0bb9fb5",
    OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39" // omdbapi.com
    };
    
