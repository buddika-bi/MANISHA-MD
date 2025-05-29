const {cmd , commands} = require('../command')

cmd({
    pattern: "repo",
    desc: "repo the bot",
    react: "🧨",
    category: "main",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `*📍REPO LINK ❤️‍🔥👇*

https://github.com/manisha-Official18/MANISHA-MD



*ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀɴɪꜱʜᴀ ᴄᴏᴅᴇʀ*

`
await conn.sendMessage(from,{image:{url: `https://ibb.co/ccjyFW1Z`},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})