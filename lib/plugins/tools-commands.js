const { cmd } = require('../command');
const fetch = require('node-fetch');
const axios = require("axios");
const { runtime } = require('../functions');
const config = require('../../config');

cmd({
    pattern: "countdown",
    alias: ['count','start'],
    desc: "Start a countdown timer (Owner only)",
    category: "tools",
    react: "⏱️",
    filename: __filename
},
async (conn, m, message, { args, reply, isCreator, isOwner }) => {
    try {
        if (!isCreator) return reply("_*☣️ THIS COMMAND ONLY FOR MOII OWNER!*_");

        let seconds = parseInt(args[0]);
        if (isNaN(seconds) || seconds <= 0) {
            return reply("❌ PLEASE PROVIDE A VALID NUMBER OF SECONDS.");
        }

        reply(`_*☣️ COUNTDOWN STARTED FOR ${seconds} SECONDS...*_`);

        const timer = setInterval(() => {
            seconds--;
            reply(`_*☣️ TIME LEFT: ${seconds} SECONDS*_`);
            if (seconds === 0) {
                clearInterval(timer);
                reply("✅ _*COUNTDOWN FINISHED*_ ☣️");
            }
        }, 1000);
        
    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

//FETCH API 
cmd({
    pattern: "fetch",
    alias: ["get", "api"],
    desc: "Fetch data from any URL (JSON, files, etc)",
    category: "tools",
    react: "🌐",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        const q = args.join(" ").trim();
        if (!q) return reply('❌ Please provide a URL.');
        if (!/^https?:\/\//.test(q)) return reply('❌ URL must start with http:// or https://');

        const res = await axios.get(q, { responseType: 'arraybuffer' });
        const contentType = res.headers['content-type'];
        const buffer = Buffer.from(res.data);
        
        const options = { quoted: mek };
        const fileName = `fetched.${contentType.split('/')[1] || 'bin'}`;

        // Handle JSON response
        if (contentType.includes('application/json')) {
            const json = JSON.parse(buffer.toString());
            return conn.sendMessage(from, {
                text: `📦 *Fetched JSON*:\n\`\`\`${JSON.stringify(json, null, 2).slice(0, 2048)}\`\`\``
            }, options);
        }

        // Handle file responses (images, videos, etc.)
        let messageContent = {};
        if (contentType.includes('image')) {
            messageContent.image = buffer;
        } else if (contentType.includes('video')) {
            messageContent.video = buffer;
        } else if (contentType.includes('audio')) {
            messageContent.audio = buffer;
        } else {
            // For unknown or generic files
            const filePath = path.join(__dirname, '..', 'temp', fileName);
            await fs.outputFile(filePath, buffer);
            messageContent.document = fs.readFileSync(filePath);
            messageContent.mimetype = contentType;
            messageContent.fileName = fileName;
        }

        await conn.sendMessage(from, messageContent, options);

    } catch (e) {
        console.error("Fetch Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

cmd({
    pattern: "tempnum",
    alias: ["fakenum", "tempnumber","fake"],
    desc: "Get temporary numbers & OTP instructions",
    category: "tools",
    react: "📱",
    use: "<country-code>"
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        // Mandatory country code check
        if (!args || args.length < 1) {
            return reply(`❌ *Usage:* .tempnum <country-code>\nExample: .tempnum us\n\n📦 Use .otpbox <number>* to check OTPs`);
        }

        const countryCode = args[0].toLowerCase();
        
        // API call with validation
        const { data } = await axios.get(
            `https://api.vreden.my.id/api/tools/fakenumber/listnumber?id=${countryCode}`,
            { 
                timeout: 10000,
                validateStatus: status => status === 200
            }
        );

        // Fixed syntax error here - added missing parenthesis
        if (!data?.result || !Array.isArray(data.result)) {
            console.error("Invalid API structure:", data);
            return reply(`⚠ Invalid API response format\nTry .tempnum us`);
        }

        if (data.result.length === 0) {
            return reply(`📭 No numbers available for *${countryCode.toUpperCase()}*\nTry another country code!\n\nUse .otpbox <number> after selection`);
        }

        // Process numbers
        const numbers = data.result.slice(0, 25);
        const numberList = numbers.map((num, i) => 
            `${String(i+1).padStart(2, ' ')}. ${num.number}`
        ).join("\n");

        // Final message with OTP instructions
        await reply(
            `╭──「 📱 *MANISHA-MD TEMPORARY NUMBERS* 」\n` +
            `│\n` +
            `│ Country: ${countryCode.toUpperCase()}\n` +
            `│ Numbers Found: ${numbers.length}\n` +
            `│\n` +
            `${numberList}\n\n` +
            `╰──「 📦 USE: .otpbox <number> 」\n` +
            `_Example: .otpbox +1234567890_\n` +
          `ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀɴɪꜱʜᴀ ᴄᴏᴅᴇʀ`
        );

    } catch (err) {
        console.error("API Error:", err);
        const errorMessage = err.code === "ECONNABORTED" ? 
            `⏳ *Timeout*: API took too long\nTry smaller country codes like 'us', 'gb'` :
            `⚠ *Error*: ${err.message}\nUse format: .tempnum <country-code>`;
            
        reply(`${errorMessage}\n\n🔑 Remember: ${prefix}otpinbox <number>`);
    }
});

cmd({
    pattern: "templist",
    alias: ["tempnumberlist", "tempnlist", "listnumbers"],
    desc: "Show list of countries with temp numbers",
    category: "tools",
    react: "🌍",
    filename: __filename,
    use: ".templist"
},
async (conn, m, { reply }) => {
    try {
        const { data } = await axios.get("https://api.vreden.my.id/api/tools/fakenumber/country");

        if (!data || !data.result) return reply("❌ Couldn't fetch country list.");

        const countries = data.result.map((c, i) => `*${i + 1}.* ${c.title} \`(${c.id})\``).join("\n");

        await reply(`🌍 *Total Available Countries:* ${data.result.length}\n\n${countries}`);
    } catch (e) {
        console.error("TEMP LIST ERROR:", e);
        reply("❌ Failed to fetch temporary number country list.");
    }
});

cmd({
    pattern: "otpbox",
    alias: ["checkotp", "getotp"],
    desc: "Check OTP messages for temporary number",
    category: "tools",
    react: "🔑",
    use: "<full-number>"
},
async (conn, mek, m, { from, args, reply }) => {
    try {
        // Validate input
        if (!args[0] || !args[0].startsWith("+")) {
            return reply(`❌ *Usage:* .otpbox <full-number>\nExample: .otpbox +9231828xx`);
        }

        const phoneNumber = args[0].trim();
        
        // Fetch OTP messages
        const { data } = await axios.get(
            `https://api.vreden.my.id/api/tools/fakenumber/message?nomor=${encodeURIComponent(phoneNumber)}`,
            { 
                timeout: 10000,
                validateStatus: status => status === 200
            }
        );

        // Validate response
        if (!data?.result || !Array.isArray(data.result)) {
            return reply("⚠ No OTP messages found for this number");
        }

        // Format OTP messages
        const otpMessages = data.result.map(msg => {
            // Extract OTP code (matches common OTP patterns)
            const otpMatch = msg.content.match(/\b\d{4,8}\b/g);
            const otpCode = otpMatch ? otpMatch[0] : "Not found";
            
            return `┌ *From:* ${msg.from || "Unknown"}
│ *Code:* ${otpCode}
│ *Time:* ${msg.time_wib || msg.timestamp}
└ *Message:* ${msg.content.substring(0, 50)}${msg.content.length > 50 ? "..." : ""}`;
        }).join("\n\n");

        await reply(
            `╭──「 🔑 *MANISHA-MD OTP MESSAGES* 」\n` +
            `│ Number: ${phoneNumber}\n` +
            `│ Messages Found: ${data.result.length}\n` +
            `│\n` +
            `${otpMessages}\n` +
            `╰──「 📌 Use .tempnum to get numbers 」\n\n` +
          `ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀɴɪꜱʜᴀ ᴄᴏᴅᴇʀ`
        );

    } catch (err) {
        console.error("OTP Check Error:", err);
        const errorMsg = err.code === "ECONNABORTED" ?
            "⌛ OTP check timed out. Try again later" :
            `⚠ Error: ${err.response?.data?.error || err.message}`;
        
        reply(`${errorMsg}\n\nUsage: .otpbox +9231828xx`);
    }
});


cmd({
    pattern: "gitclone",
    desc: "Download a GitHub repository as a ZIP file.",
    category: "tools",
    react: "🕊️",
    use: "<github_link>",
    filename: __filename
}, 
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("Where is the link?\nExample:\n.gitclone repolink");

        if (!q.includes("github.com")) return reply("Invalid GitHub link!");

        let match = q.match(/(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i);
        if (!match) return reply("Invalid GitHub link format!");

        let [, owner, repo] = match;
        repo = repo.replace(/.git$/, '');
        let zipUrl = `https://api.github.com/repos/${owner}/${repo}/zipball`;

        let response = await fetch(zipUrl, { method: "HEAD" });
        let filename = response.headers.get("content-disposition").match(/attachment; filename=(.*)/)[1];

        await conn.sendMessage(from, {
            document: { url: zipUrl },
            fileName: filename + ".zip",
            mimetype: "application/zip"
        }, { quoted: mek });

    } catch (error) {
        console.error("GitClone Error:", error);
        reply("An error occurred while downloading the repository.");
    }
});
