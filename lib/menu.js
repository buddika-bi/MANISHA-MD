const { cmd } = require('./command');
const { fetchJson } = require('./functions');

const apilink = 'https://www.dark-yasiya-api.site'; // DO NOT CHANGE

cmd({
    pattern: "xxvideos",
    alias: ["xvdl", "xvdown"],
    react: "🔞",
    desc: "Download xvideo.com porn video",
    category: "download",
    use: '.xvideo < search text >',
    filename: __filename
},
async (conn, mek, m, { from, quoted, reply, q }) => {
    try {
        if (!q) return await reply("🔞 Please provide a search term!");

        const xv_list = await fetchJson(`${apilink}/search/xvideo?q=${encodeURIComponent(q)}`);
        if (!xv_list?.result || xv_list.result.length === 0) {
            return await reply("❌ No results found!");
        }

        const video_url = xv_list.result[0].url;
        const xv_info = await fetchJson(`${apilink}/download/xvideo?url=${video_url}`);

        const { title, views, like, deslike, size, quality } = xv_info.result;
        const msgIDmsg = `🔞 *XVIDEO DOWNLOADER*\n\n` +
            `• *Title* : ${title}\n` +
            `• *Views* : ${views}\n` +
            `• *Like/Dislike* : ${like} / ${deslike}\n` +
            `• *Available Qualities*:\n` +
            `   ➤ Q1 - 360p\n` +
            `   ➤ Q2 - 480p\n` +
            `   ➤ Q3 - 720p\n\n` +
            `📩 *Reply with your choice:* Q1 / Q2 / Q3`;

        const sent = await conn.sendMessage(from, {
            image: { url: xv_info.result.dl_link },
            caption: msgIDmsg
        }, { quoted: mek });

        const msgID = sent.key.id;

        conn.ev.on('messages.upsert', async (messageUpdate) => {
            try {
                const newMsg = messageUpdate?.messages?.[0];
                if (!newMsg?.message) return;

                const userReply = newMsg.message?.conversation || newMsg.message?.extendedTextMessage?.text;
                const isReply = newMsg.message?.extendedTextMessage?.contextInfo?.stanzaId === msgID;

                if (!isReply) return;

                const chosen = userReply.trim().toUpperCase();

                let dl_link;
                if (chosen === "Q1") {
                    dl_link = xv_info.result.links["360p"];
                } else if (chosen === "Q2") {
                    dl_link = xv_info.result.links["480p"];
                } else if (chosen === "Q3") {
                    dl_link = xv_info.result.links["720p"];
                } else {
                    return await reply("❌ Invalid option! Please reply Q1, Q2 or Q3.");
                }

                if (!dl_link) return await reply("❌ Download link not available for that quality.");

                await conn.sendMessage(from, {
                    document: { url: dl_link },
                    mimetype: "video/mp4",
                    fileName: `${title.replace(/[^\w\s]/gi, '')}-${chosen}.mp4`,
                    caption: `🔞 *${title}*\n📥 Quality: ${chosen.replace('Q', '')}p`
                }, { quoted: mek });

            } catch (err) {
                console.error("❌ Error during reply handling:", err);
                await reply("❌ Failed to process the quality selection.");
            }
        });

    } catch (error) {
        console.log("🚨 Error in xvideo command:", error);
        await reply("❌ Error: " + error.message);
    }
});
