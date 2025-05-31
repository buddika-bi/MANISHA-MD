const axios = require('axios');
const config = require('../../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "weather",
    desc: "🌤 Get weather information for a location",
    react: "🌤",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❗ Please provide a city name. Usage: .weather [city name]");
        const apiKey = '2d61a72574c11c4f36173b627f8cb177'; 
        const city = q;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;
        const weather = `╭──────────●●►
🌍 *ᴡᴇᴀᴛʜᴇʀ ɪɴꜰᴏʀᴍᴀᴛɪᴏɴ ꜰᴏʀ ${data.name}, ${data.sys.country}* 🌍
🌡️ *ᴛᴇᴍᴘᴇʀᴀᴛᴜʀᴇ*: ${data.main.temp}°C
🌡️ *ꜰᴇᴇʟꜱ ʟɪᴋᴇ*: ${data.main.feels_like}°C
🌡️ *ᴍɪɴ ᴛᴇᴍᴘ*: ${data.main.temp_min}°C
🌡️ *ᴍᴀx ᴛᴇᴍᴘ*: ${data.main.temp_max}°C
💧 *ʜᴜᴍɪᴅɪᴛʏ*: ${data.main.humidity}%
☁️ *ᴡᴇᴀᴛʜᴇʀ*: ${data.weather[0].main}
🌫️ *ꜱᴇꜱᴄʀɪᴘᴛɪᴏɴ*: ${data.weather[0].description}
💨 *ᴡɪɴᴅ ꜱᴘᴇᴇᴅ*: ${data.wind.speed} m/s
🔽 *ᴘʀᴇꜱꜱᴜʀᴇ*: ${data.main.pressure} hPa

*ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀɴɪꜱʜᴀ ᴄᴏᴅᴇʀ*
╰──────────●●►`;
        return reply(weather);
    } catch (e) {
        console.log(e);
        if (e.response && e.response.status === 404) {
            return reply("🚫 City not found. Please check the spelling and try again.");
        }
        return reply("⚠️ An error occurred while fetching the weather information. Please try again later.");
    }
});

cmd({
    pattern: "githubstalk",
    desc: "Fetch detailed GitHub user profile including profile picture.",
    category: "other",
    react: "📚",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide a GitHub username.");
        }

        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `╭──────────●●►
> *♦️ᴍᴀɴɪꜱʜᴀ-ᴍᴅ ɢɪᴛꜱᴛᴀʟᴋ*
        
👤 *ᴜꜱᴇʀ ɴᴀᴍᴇ*: ${data.name || data.login}

🔗 *ɢɪᴛʜᴜʙ ᴜʀʟ*:(${data.html_url})

📝 *ʙɪᴏ*: ${data.bio || 'Not available'}

🏙️ *ʟᴏᴄᴀᴛɪᴏɴ*: ${data.location || 'Unknown'}

📊 *ᴘᴜʙʟɪᴄ ʀᴇᴘᴏ*: ${data.public_repos}

👥 *ꜰᴏʟʟᴏᴡᴇʀꜱ*: ${data.followers} | Following: ${data.following}

📅 *ᴄʀᴇᴀᴛʀᴅ ᴅᴀᴛᴇ*: ${new Date(data.created_at).toDateString()}

🔭 *ᴘᴜʙʟɪᴄ ɢɪꜱᴛꜱ*: ${data.public_gists}

> *ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀɴɪꜱʜᴀ ᴄᴏᴅᴇʀ*
╰──────────●●►`;

        await conn.sendMessage(from, { image: { url: data.avatar_url }, caption: userInfo }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching data🤕: ${e.response ? e.response.data.message : e.message}`);
    }
});
