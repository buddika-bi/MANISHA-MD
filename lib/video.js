const { cmd } = require('./command');
const { fetchJson } = require('./functions');

const apilink = 'https://www.dark-yasiya-api.site'; // DO NOT CHANGE

cmd({
    pattern: "video",
    alias: ["ytvideo", "vid"],
    react: "🎥",
    desc: "Download YouTube video with quality selector",
    category: "download",
    use: '.video <video name>',
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply, q }) => {
    try {
        if (!q) return await reply("🎥 Please enter a video name.");

        const search = await fetchJson(`${apilink}/search/ytmp4?q=${encodeURIComponent(q)}`);
        if (!search?.result || search.result.length === 0) return await reply("❌ No video found.");

        const firstResult = search.result[0];
        const videoUrl = firstResult.url;

        const videoData = await fetchJson(`${apilink}/ytmp4?url=${videoUrl}`);

        const msg = `
🎬 *VIDEO DOWNLOADER*

• *Title:* ${videoData.result.title}
• *Duration:* ${videoData.result.duration}

*Choose Quality:*
1 - 360p
2 - 480p
3 - 720p
4 - 1080p

_Reply with number to download 📥_
        `.trim();

        const sentMsg = await conn.sendMessage(from, {
            image: { url: videoData.result.thumb },
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
                    const safeTitle = videoData.result.title.replace(/[\\/:*?"<>|]/g, '');
                    let videoUrl, qualityLabel;

                    switch (input) {
                        case '1':
                            videoUrl = videoData.result.video360;
                            qualityLabel = '360p';
                            break;
                        case '2':
                            videoUrl = videoData.result.video480;
                            qualityLabel = '480p';
                            break;
                        case '3':
                            videoUrl = videoData.result.video720;
                            qualityLabel = '720p';
                            break;
                        case '4':
                            videoUrl = videoData.result.video1080;
                            qualityLabel = '1080p';
                            break;
                        default:
                            await conn.sendMessage(senderID, {
                                text: '❗ Invalid choice. Reply with 1, 2, 3 or 4.'
                            }, { quoted: receivedMsg });
                            return;
                    }

                    await conn.sendMessage(senderID, {
                        video: { url: videoUrl },
                        mimetype: 'video/mp4',
                        fileName: `${safeTitle} - ${qualityLabel}.mp4`
                    }, { quoted: receivedMsg });
                }
            } catch (e) {
                console.error("Reply handler error (video):", e.message);
            }
        });

    } catch (error) {
        console.error("🚨 Video command error:", error);
        await reply("❌ Failed to process your request.\n\n" + error.message);
    }
});