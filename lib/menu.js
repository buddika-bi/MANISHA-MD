const { cmd, commands } = require('./command');
const config = require('../config');
const os = require('os');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, fetchJson , runtime ,sleep } = require('./functions')

cmd({
    pattern: "setmenu",
    desc: "Show button based interactive menu",
    category: "main",
    react: "🧾",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Buttons definition
        const buttons = [
            { buttonId: 'menu_1', buttonText: { displayText: '📥 Download Menu' }, type: 1 },
            { buttonId: 'menu_2', buttonText: { displayText: '😄 Fun Menu' }, type: 1 },
            { buttonId: 'menu_3', buttonText: { displayText: '👑 Owner Menu' }, type: 1 },
            { buttonId: 'menu_4', buttonText: { displayText: '🤖 AI Menu' }, type: 1 },
            { buttonId: 'menu_5', buttonText: { displayText: '🔄 Convert Menu' }, type: 1 },
            { buttonId: 'menu_6', buttonText: { displayText: '📌 Other Menu' }, type: 1 },
            { buttonId: 'menu_7', buttonText: { displayText: '🏠 Main Menu' }, type: 1 },
            { buttonId: 'menu_8', buttonText: { displayText: '🎬 Movie Menu' }, type: 1 },
            { buttonId: 'menu_9', buttonText: { displayText: '🛠️ Tool Menu' }, type: 1 },
            { buttonId: 'menu_10', buttonText: { displayText: '🔍 Search Menu' }, type: 1 },
            { buttonId: 'menu_11', buttonText: { displayText: '⚙️ Settings Menu' }, type: 1 },
        ];

        // Message with buttons
        const buttonMessage = {
            image: { url: config.ALIVE_IMG },
            caption: '╭━━━〔 *MANISHA-MD* 〕━━━┈⊷\nSelect a menu option below:',
            footer: 'Created by MANISHA CODER',
            buttons: buttons,
            headerType: 4
        };

        await conn.sendMessage(from, buttonMessage, { quoted: m });

    } catch (error) {
        console.error(error);
        reply('❌ Error showing menu.');
    }
});

// Event listener for button responses
conn.ev.on('messages.upsert', async (msgData) => {
    try {
        const msg = msgData.messages[0];
        if (!msg.message?.buttonsResponseMessage) return;

        const buttonId = msg.message.buttonsResponseMessage.selectedButtonId;
        const from = msg.key.remoteJid;

        // Send different menu text based on button pressed
        let responseText = '';
        switch(buttonId) {
            case 'menu_1':
                responseText = `╭━━━〔 📥 Download Menu 〕━━━┈⊷
• xvideos [name]
• song [name]
• video [name]
• apk [name]
• ig [url]
• tiktok [url]
• mediafire [url]
• twitter [url]
• gdrive [url]
• img [query]
╰━━━━━━━━━━━━━━━━━━━┈⊷`;
                break;

            case 'menu_2':
                responseText = `╭━━━〔 😄 Fun Menu 〕━━━┈⊷
• hack
• animegirl
• fact
• dog
• joke
╰━━━━━━━━━━━━━━━━━━━┈⊷`;
                break;

            case 'menu_3':
                responseText = `╭━━━〔 👑 Owner Menu 〕━━━┈⊷
• restart
╰━━━━━━━━━━━━━━━━━━━┈⊷`;
                break;

            case 'menu_4':
                responseText = `╭━━━〔 🤖 AI Menu 〕━━━┈⊷
• gemini [query]
╰━━━━━━━━━━━━━━━━━━━┈⊷`;
                break;

            case 'menu_5':
                responseText = `╭━━━〔 🔄 Convert Menu 〕━━━┈⊷
• sticker [img]
╰━━━━━━━━━━━━━━━━━━━┈⊷`;
                break;

            case 'menu_6':
                responseText = `╭━━━〔 📌 Other Menu 〕━━━┈⊷
• githubstalk [username]
• trt
• weather
• tts
╰━━━━━━━━━━━━━━━━━━━┈⊷`;
                break;

            case 'menu_7':
                responseText = `╭━━━〔 🏠 Main Menu 〕━━━┈⊷
• alive
• owner
• repo
• ping
• system
• runtime
╰━━━━━━━━━━━━━━━━━━━┈⊷`;
                break;

            case 'menu_8':
                responseText = `╭━━━〔 🎬 Movie Menu 〕━━━┈⊷
• sinhalasub [name]
╰━━━━━━━━━━━━━━━━━━━┈⊷`;
                break;

            case 'menu_9':
                responseText = `╭━━━〔 🛠️ Tool Menu 〕━━━┈⊷
• gitclone [repo link]
╰━━━━━━━━━━━━━━━━━━━┈⊷`;
                break;

            case 'menu_10':
                responseText = `╭━━━〔 🔍 Search Menu 〕━━━┈⊷
• yts
• mvs
╰━━━━━━━━━━━━━━━━━━━┈⊷`;
                break;

            case 'menu_11':
                responseText = `╭━━━〔 ⚙️ Settings Menu 〕━━━┈⊷
• mode
• setprefix
• auto-react
╰━━━━━━━━━━━━━━━━━━━┈⊷`;
                break;

            default:
                responseText = '❌ Invalid option!';
        }

        await conn.sendMessage(from, { text: responseText }, { quoted: msg });

    } catch (e) {
        console.error('Button response error:', e);
    }
});
