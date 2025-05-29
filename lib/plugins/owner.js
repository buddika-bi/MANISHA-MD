const {cmd , commands} = require('../command')

cmd({
    pattern: "owner",
    desc: "manisha md bot owner",
    react: "👨‍💻",
    category: "main",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `*OWNER*

🪀 https://wa.me/94721551183



*ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀɴɪꜱʜᴀ ᴄᴏᴅᴇʀ*

`
await conn.sendMessage(from,{image:{url: `https://ibb.co/ccjyFW1Z`},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})