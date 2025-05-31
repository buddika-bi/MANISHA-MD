const config = require('../../config')
const {cmd , commands} = require('../command')

const os = require("os")
const {runtime} = require('../functions')


cmd({
      pattern: "owner",
      alias: ["owner"],
      desc: "Bot owner",
      category: "main",
      react: "👨‍💻",
      filename: __filename
    },
    
    async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
          
          // Status message to be sent
          let desc = `╭──────────●●►
> *♦️ᴏᴡɴᴇʀ :* *94721551183 ...*
> *♦️ᴡʜᴀᴛꜱᴀᴘᴘ ᴄʜᴀɴɴᴇʟ :* *https://whatsapp.com/channel/0029VbAdMtMGk1G1R9Yg2L3x*

> *ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀɴɪꜱʜᴀ ᴄᴏᴅᴇʀ*
╰──────────●●►`

          // Sending the image with caption
await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: desc},{quoted: mek });

      } catch (e) {
          console.error(e);
          reply(`*Error:* ${e.message}`);
      }
    });

cmd({
      pattern: "repo",
      alias: ["repo"],
      desc: "Bot github repo",
      category: "main",
      react: "🧨",
      filename: __filename
    },
    
    async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
          
          // Status message to be sent
          let desc = `╭──────────●●►
> *♦️ʀᴇᴘᴏ:* *https://github.com/manisha-Official18/MANISHA-MD*
> *♦️ᴏᴡɴᴇʀ :* *94721551183 ...*
> *♦️ᴠᴇʀꜱɪᴏɴ :* *1.0 ...*
> *♦️ᴡʜᴀᴛꜱᴀᴘᴘ ᴄʜᴀɴɴᴇʟ : https://whatsapp.com/channel/0029VbAdMtMGk1G1R9Yg2L3x*

> *ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀɴɪꜱʜᴀ ᴄᴏᴅᴇʀ*
╰──────────●●►`

          // Sending the image with caption
await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: desc},{quoted: mek });

      } catch (e) {
          console.error(e);
          reply(`*Error:* ${e.message}`);
      }
    });

cmd({
      pattern: "alive",
      alias: ["online"],
      desc: "Chek Bot Alive",
      category: "main",
      react: "👋",
      filename: __filename
    },
    
    async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
          
          // Status message to be sent
          let desc = `╭──────────●●►
> *♦️ᴘᴏᴡᴇʀꜰᴜʟʟ ᴊᴀᴠᴀꜱᴄʀɪᴘᴛ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ...*
> *♦️ᴏᴡɴᴇʀ : 94721551183 ...*
> *♦️ᴠᴇʀꜱɪᴏɴ :* *1.0 ...*
> *♦️ᴡʜᴀᴛꜱᴀᴘᴘ ᴄʜᴀɴɴᴇʟ : https://whatsapp.com/channel/0029VbAdMtMGk1G1R9Yg2L3x*

> *ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀɴɪꜱʜᴀ ᴄᴏᴅᴇʀ*
╰──────────●●►`

          // Sending the image with caption
await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: desc},{quoted: mek });

      } catch (e) {
          console.error(e);
          reply(`*Error:* ${e.message}`);
      }
    });


cmd({
      pattern: "menu",
      alias: ["panel"],
      desc: "Get Bot Menu",
      category: "main",
      react: "📁",
      filename: __filename
}, async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
let menu = {
main: '',
download: '',
movie: '',
group: '',
owner: '',
convert: '',
news: '',
ai: '',
tools: '',
search: '',
fun: '',
voice: '',
other: '',
logo: '',
settings: ''
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `.${commands[i].pattern}\n`;
 }
}
   

let desc = `*👋 Hello ${pushname}*
          
*╭─「 ᴄᴏᴍᴍᴀɴᴅ ᴘᴀɴᴇʟ 」*
*│◈ ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}*
*│◈ ʀᴀᴍ ᴜꜱᴀɢᴇ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*│◈ ᴘʟᴀᴛꜰᴏʀᴍ : ${os.hostname()}*
*│◈ ᴠᴇʀꜱɪᴏɴ : 1.0*
*╰──────────●●►*

╭──────────●●►
 📥 *𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.download}
╰───────────●●►
╭──────────●●►
 🎬 *𝐌𝐨𝐯𝐢𝐞 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.movie}
╰───────────●●►
╭──────────●●►
 👾 *𝐀𝐢 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.ai}
╰───────────●●►
╭──────────●●►
 🔧 *𝐌𝐚𝐢𝐧 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.main}
╰───────────●●►
╭──────────●●►
 🎉 *𝐅𝐮𝐧 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.fun}
╰───────────●●►
╭──────────●●►
 🔄 *𝐂𝐨𝐧𝐯𝐞𝐫𝐭 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.convert}
╰───────────●●►
╭──────────●●►
 🔍 *𝐒𝐞𝐚𝐫𝐜𝐡 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.search}
╰───────────●●►
╭──────────●●►
 👥 *𝐆𝐫𝐨𝐮𝐩 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.group}
╰───────────●●►
╭──────────●●►
 🔒 *𝐎𝐰𝐧𝐞𝐫 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.owner}
╰───────────●●►
╭──────────●●►
 🎯 *𝐎𝐭𝐡𝐞𝐫 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.other}
╰───────────●●►
╭──────────●●►
 🛠️ *𝐓𝐨𝐨𝐥𝐬 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.tools}
╰───────────●●►
╭──────────●●►
 🎨 *𝐋𝐨𝐠𝐨 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.logo}
╰───────────●●►
╭──────────●●►
⚙️  *𝐒𝐞𝐭𝐭𝐢𝐧𝐠𝐬 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.settings}
╰───────────●●►

> *ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀɴɪꜱʜᴀ ᴄᴏᴅᴇʀ*`

await conn.sendMessage(from,{image: {url: `https://files.catbox.moe/vbi10j.png`},caption: desc},{quoted: mek});

 } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);


cmd({
    pattern: "system",
    react: "♠️",
    alias: ["uptime","status","runtime"],
    desc: "cheack uptime",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `*╭──────────●●►*
> *♦️ᴍᴀɴɪꜱʜᴀ-ᴍᴅ ꜱʏꜱᴛᴇᴍ*

*♦️ᴜᴘᴛɪᴍᴇ :*  ${runtime(process.uptime())}

*♦️ʀᴀᴍ ᴜꜱᴀɢᴇ :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}ᴍʙ / ${Math.round(require('ᴏꜱ').totalmem / 1024 / 1024)}ᴍʙ

*♦️ʜᴏꜱᴛɴᴀᴍᴇ :* ${os.hostname()}

> *ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀɴɪꜱʜᴀ ᴄᴏᴅᴇʀ*
╰──────────●●►
`
await conn.sendMessage(from,{image:{url:config.ALIVE_IMG},caption:`${status}`},{quoted:mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "🚀",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '*PINGING...*' })
        const endTime = Date.now()
        const ping = endTime - startTime
        
        await conn.sendMessage(from, { text: `*🚀MANISHA-MD SPEED : ${ping}ms*`}, { quoted: message })

    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})



cmd({
      pattern: "runtime",
      desc: "Chek Bot Runtime",
      category: "main",
      react: "⏰",
      filename: __filename
    }, async (conn, mek, m, { from, reply }) => {
      try {
      
      let desc = `╭──────────●●►
      *🚀ʀᴜɴᴛɪᴍᴇ :* ${runtime(process.uptime())}
      ╰──────────●●►`

          // Sending the image with caption
          await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: desc},{quoted: mek});
          
      } catch (e) {
          console.error(e);
          reply(`*Error:* ${e.message}`);
      }
    });