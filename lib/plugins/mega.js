const { cmd } = require('../command');
const mega = require('mega');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

// Mega.nz login credentials (Use a valid Mega account)
const MEGA_EMAIL = config.MEGA_EMAIL;
const MEGA_PASSWORD = config.MEGA_PASSWORD;

cmd({
  pattern: "mega",
  alias: ["megadownload"],
  react: '📥',
  desc: "Download a file from Mega.nz using the provided Mega link.",
  category: "download",
  use: ".mega <Mega link>",
  filename: __filename
}, async (conn, mek, msg, { args, reply }) => {
  const megaLink = args.join(" ");
  
  if (!megaLink) return reply("❗ Please provide the Mega link to download.");

  try {
    // Log into Mega
    const client = mega({ email: MEGA_EMAIL, password: MEGA_PASSWORD });

    client.on('ready', () => {
      // Extract file ID from the Mega link (Mega link format: https://mega.nz/file/<file_id>#<key>)
      const fileId = megaLink.split('/')[4];
      const key = megaLink.split('#')[1];

      if (!fileId || !key) return reply("❌ Invalid Mega link.");

      // Get the file
      const file = client.open(fileId, key);
      
      const fileName = path.basename(file.name);
      const filePath = path.join(__dirname, `../../downloads/${fileName}`);

      // Download the file
      file.download(filePath, (err) => {
        if (err) {
          console.error("Download error:", err);
          return reply("❌ Failed to download the file.");
        }

        // Send the downloaded file to WhatsApp
        conn.sendMessage(msg.from, {
          document: fs.readFileSync(filePath),
          mimetype: 'application/octet-stream',
          fileName: fileName
        }, { quoted: msg});

        // Clean up by removing the downloaded file after sending
        fs.unlinkSync(filePath);
      });
    });

  } catch (error) {
    console.error("Error interacting with Mega:", error.message);
    reply("❌ An error occurred while interacting with Mega.");
  }
});
