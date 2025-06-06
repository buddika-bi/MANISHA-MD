const { cmd } = require('./command');
const { fetchJson } = require('./functions');

const apilink = 'https://www.dark-yasiya-api.site'; // DO NOT CHANGE

cmd({
    pattern: "song",
    alias: ["music", "mp3"],
    react: "🎵",
    desc: "Download a song with quality selector",
    category: "download",
    use: '.song <song name>',
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply, q }) => {
    try {
        if (!q) return await reply("🎧 Please enter a song name.");

        const search = await fetchJson(`${apilink}/search/ytmp3?q=${encodeURIComponent(q)}`);
        if (!search?.result || search.result.length === 0) return await reply("❌ No song found.");

        const firstResult = search.result[0];
        const songUrl = firstResult.url;

        const songData = await fetchJson(`${apilink}/ytmp3?url=${songUrl}`);

        const msg = `
🎶 *SONG DOWNLOADER*

• *Title:* ${songData.result.title}
• *Duration:* ${songData.result.duration}

*Choose Quality:*
1 - 64kbps
2 - 128kbps
3 - 320kbps

_Reply with number to get the song 📥_
        `.trim();

        const sentMsg = await conn.sendMessage(from, {
            image: { url: songData.result.thumb },
            caption: msg
        }, { quoted: mek });

        const messageID = sentMsg.key.id;

        conn.ev.on("messages.upsert", async (msgData) => {
            try {
                const receivedMsg = msgData.messages[0];
                if (!receivedMsg.message) return;

                const receivedText = receivedMsg.message.conversation || receivedMsg.message.extendedTextMessage?.text;
                const senderID = receivedMsg.key.remoteJid;
                const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

                if (isReplyToBot) {
                    await conn.sendMessage(senderID, {
                        react: { text: '⬇️', key: receivedMsg.key }
                    });

                    const input = receivedText.trim();
                    const safeTitle = songData.result.title.replace(/[\\/:*?"<>|]/g, '');
                    let audioUrl, qualityLabel;

                    switch (input) {
                        case '1':
                            audioUrl = songData.result.audio64;
                            qualityLabel = '64kbps';
                            break;
                        case '2':
                            audioUrl = songData.result.audio128;
                            qualityLabel = '128kbps';
                            break;
                        case '3':
                            audioUrl = songData.result.audio320;
                            qualityLabel = '320kbps';
                            break;
                        default:
                            await conn.sendMessage(senderID, {
                                text: '❗ Invalid choice. Reply with 1, 2, or 3.'
                            }, { quoted: receivedMsg });
                            return;
                    }

                    await conn.sendMessage(senderID, {
                        audio: { url: audioUrl },
                        mimetype: 'audio/mpeg',
                        fileName: `${safeTitle} - ${qualityLabel}.mp3`
                    }, { quoted: receivedMsg });
                }
            } catch (e) {
                console.error("Error in reply handler (song):", e.message);
            }
        });

    } catch (error) {
        console.error("🚨 Song command error:", error);
        await reply("❌ Failed to process your request.\n\n" + error.message);
    }
});