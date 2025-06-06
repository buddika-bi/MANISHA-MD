const { cmd } = require('./command');
const { fetchJson } = require('./functions');

const apilink = 'https://www.dark-yasiya-api.site'; // DO NOT CHANGE

cmd({
    pattern: "xvideos",
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

        // Get search results
        const xv_list = await fetchJson(`${apilink}/search/xvideo?q=${encodeURIComponent(q)}`);
        if (!xv_list?.result || xv_list.result.length === 0) {
            return await reply("❌ No results found!");
        }

        const video_url = xv_list.result[0].url;

        // Get video download info
        const xv_info = await fetchJson(`${apilink}/download/xvideo?url=${video_url}`);

        if (!xv_info || !xv_info.result) {
            console.log("⚠️ Invalid API response:", xv_info);
            return await reply("❌ Failed to get video info.");
        }

        const { title, views, like, deslike, dl_link, links } = xv_info.result;

        // Check if quality links exist
        if (!links || typeof links !== 'object') {
            return await reply("❌ Quality links not available.");
        }

        const caption = `🔞 *XVIDEO DOWNLOADER*\n\n` +
            `• *Title* : ${title}\n` +
            `• *Views* : ${views}\n` +
            `• *Like/Dislike* : ${like} / ${deslike}\n` +
            `• *Available Qualities*:\n` +
            `   ➤ Q1 - 360p\n` +
            `   ➤ Q2 - 480p\n` +
            `   ➤ Q3 - 720p\n\n` +
            `📩 *Reply with your choice:* Q1 / Q2 / Q3`;

        const sent = await conn.sendMessage(from, {
            image: { url: dl_link },
            caption: caption
        }, { quoted: mek });

        // Function to handle the quality reply
        const messageListener = async (msg) => {
            try {
                const newMsg = msg.messages?.[0];
                if (!newMsg?.message) return;

                const userText = newMsg.message.conversation || newMsg.message.extendedTextMessage?.text;
                const isReply = newMsg.message?.extendedTextMessage?.contextInfo?.stanzaId === sent.key.id;

                if (!isReply) return;

                const choice = userText.trim().toUpperCase();

                let selectedLink;
                if (choice === "Q1") selectedLink = links["360p"];
                else if (choice === "Q2") selectedLink = links["480p"];
                else if (choice === "Q3") selectedLink = links["720p"];
                else return await conn.sendMessage(from, {
                    text: "❌ Invalid choice! Please reply with Q1, Q2, or Q3.",
                }, { quoted: newMsg });

                if (!selectedLink) {
                    return await conn.sendMessage(from, {
                        text: `❌ Download link for ${choice} is not available.`,
                    }, { quoted: newMsg });
                }

                // Send the video file
                await conn.sendMessage(from, {
                    document: { url: selectedLink },
                    mimetype: "video/mp4",
                    fileName: `${title.replace(/[^\w\s]/gi, '')}-${choice}.mp4`,
                    caption: `🔞 *${title}*\n📥 Quality: ${choice.replace('Q', '')}p`
                }, { quoted: newMsg });

                // Remove the listener after successful reply
                conn.ev.off('messages.upsert', messageListener);

            } catch (err) {
                console.error("❌ Error handling quality reply:", err);
                await conn.sendMessage(from, { text: "❌ Failed to process your reply." }, { quoted: msg.messages?.[0] });
            }
        };

        // Activate the listener
        conn.ev.on('messages.upsert', messageListener);

        // Auto-remove the listener after 60 seconds
        setTimeout(() => conn.ev.off('messages.upsert', messageListener), 60000);

    } catch (error) {
        console.error("🚨 Error in xvideo command:", error);
        await reply("❌ Error: " + error.message);
    }
});
