const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "xvideo",
  alias: ["xvideos", "xvid"],
  desc: "Download video from Xvideo using Dark-Yasiya API.",
  react: "📥",
  category: "all",
  filename: __filename,
}, 
async (conn, mek, m, { from, reply, args }) => {
  try {
    const url = args[0];
    if (!url) return reply("Please provide an Xvideo URL! Example: .xvideo https://www.xvideos.com/video12345");

    // Dark-Yasiya API endpoint for Xvideo downloader (assumed)
    const apiUrl = `https://www.dark-yasiya-api.site/download/xvideo?url=${encodeURIComponent(url)}`;

    const { data } = await axios.get(apiUrl);

    if (!data.status || !data.result) {
      return reply("Failed to get video info. Check the URL or try again later.");
    }

    // Assuming data.result contains an array of video links with quality and dl_link keys
    const videoLinks = data.result;

    if (videoLinks.length === 0) return reply("No downloadable video links found.");

    // Pick the highest quality video (usually last or first, depending on API)
    const bestVideo = videoLinks[videoLinks.length - 1]; // adjust if needed

    await conn.sendMessage(
      from,
      {
        video: { url: bestVideo.dl_link },
        mimetype: "video/mp4",
        fileName: `${bestVideo.quality || "video"}.mp4`,
      },
      { quoted: m }
    );

  } catch (error) {
    console.error("Xvideo downloader error:", error);
    reply("Error occurred while downloading the video. Please try again later.");
  }
});


cmd({
  pattern: "download",
  alias: ["dl"],
  desc: "Download media from a supported URL using Dark-Yasiya API.",
  react: "📥",
  category: "all",
  filename: __filename,
}, 
async (conn, mek, m, { from, reply, args }) => {
  try {
    const url = args[0];
    if (!url) return reply("Please provide a URL to download! Example: .download https://...");

    // Replace this endpoint with the specific one you want from Dark-Yasiya
    const apiUrl = `https://www.dark-yasiya-api.site/download?url=${encodeURIComponent(url)}`;

    const { data } = await axios.get(apiUrl);

    if (!data.status || !data.result) {
      return reply("Failed to retrieve data. Make sure the URL is correct and supported.");
    }

    // Here data.result should contain the downloadable media links
    // For example, if it has video link:
    const media = data.result[0]; // You can adjust this based on actual API response

    if (!media.dl_link) return reply("No downloadable link found.");

    await conn.sendMessage(
      from,
      {
        video: { url: media.dl_link },
        mimetype: "video/mp4",
        fileName: `${media.title || "download"}.mp4`,
      },
      { quoted: m }
    );

  } catch (error) {
    console.error("Download command error:", error);
    reply("Something went wrong while downloading. Please try again later.");
  }
});
