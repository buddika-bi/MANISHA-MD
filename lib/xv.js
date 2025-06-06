const { cmd } = require('./command');
const { fetchJson } = require('./functions');

const apilink = 'https://www.dark-yasiya-api.site'; // DO NOT CHANGE

cmd({
    pattern: "xv",
    alias: ["xvdl", "xvdown"],
    react: "🔞",
    desc: "Download xvideo.com porn video",
    category: "download",
    use: '.xvideo < search text >',
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply, q }) => {
    try {
        if (!q) return await reply("Please provide a search term! 🔍");

        const xv_list = await fetchJson(`${apilink}/search/xvideo?q=${encodeURIComponent(q)}`);

        if (!xv_list?.result || xv_list.result.length === 0) {
            return await reply("No results found! ❌");
        }

        const video_url = xv_list.result[0].url;
        const xv_info = await fetchJson(`${apilink}/download/xvideo?url=${video_url}`);

        const msg = `
╭────────────●●►
*MANISHA-MD XVIDEO DOWNLOADER*

• *Title* - ${xv_info.result.title}
• *Views* - ${xv_info.result.views}
• *Likes* - ${xv_info.result.like}
• *Dislikes* - ${xv_info.result.deslike}
• *Size* - ${xv_info.result.size}

> *Created by Manisha Coder*
╰────────────●●►

Reply:
1 - Download 480p
2 - Download 720p
3 - Download 1080p`.trim();

        // Send preview message
        const sentMsg = await conn.sendMessage(from, {
            image: { url: xv_info.result.dl_link },
            caption: msg
        }, { quoted: mek });

        const messageID = sentMsg.key.id;

        // Start a one-time reply handler
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

                    const userInput = receivedText.trim();
                    let downloadUrl = xv_info.result.dl_link;
                    let quality;

                    switch (userInput) {
                        case '1':
                            quality = "480p";
                            break;
                        case '2':
                            quality = "720p";
                            break;
                        case '3':
                            quality = "1080p";
                            break;
                        default:
                            await conn.sendMessage(senderID, {
                                text: "Invalid option. Reply with 1, 2 or 3.",
                            }, { quoted: receivedMsg });
                            return;
                    }

                    // Send video document (simulate download by quality)
                    const safeTitle = xv_info.result.title.replace(/[\\/:*?"<>|]/g, '');
                    const fileName = `${safeTitle} - ${quality}.mp4`;

                    await conn.sendMessage(senderID, {
                        document: { url: downloadUrl },
                        mimetype: "video/mp4",
                        fileName: fileName
                    }, { quoted: receivedMsg });
                }
            } catch (e) {
                console.error("Reply handler error:", e.message);
            }
        });

    } catch (error) {
        console.log("🚨 Error in xvideo command:", error);
        await reply("Nothing can be downloaded. ❗\n\nError: " + error.message);
    }
});
