const Discord = require("discord.js");
const { MessageActionRow, MessageButton, Intents } = require('discord.js');
let client = new Discord.Client({
    intents: new Intents(32767)
});
//const Converter = require('timestamp-conv');
const fs = require('fs');
const mysql = require("mysql");
const logger = require("./logger.js");
const colors = require("colors");
const moment = require("moment");

const twvoucher = require('@fortune-inc/tw-voucher');
let settings = JSON.parse(fs.readFileSync(__dirname + "/config.json"));
let prefix = settings['prefix'];
let token = process.env.token;
let tel = settings['tel'];
let author = settings['author'];
let version = settings['version'];
let img = settings['img'];
let sent = settings['sent'];
// console.log();

// const smithdb = mysql.createConnection({
//     host: process.env.dbhost,
//     user: process.env.dbuser,
//     password: process.env.dbpassword,
//     database: process.env.dbdatabase
// });

// smithdb.connect(function(err) {
//     if (err) {
//         console.log(err)
//     } else {
//         logger.log(`Connect With Database Alerady`);
//     }
// });

const express = require('express')
const app = express();
const port = 8000

app.get('/', (req, res) => res.send('Working!'))
app.listen(port);

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}



//ทำปุ่มให้หน่อย :>
//ทำใน repl แกเลย :>
//เราจะคุยเรื่อง domain :/
//ปุ่มไรนิ เอาไปทำไร?
//จะลองเล่นๆ :/

client.on("ready", () => {
    logger.log(`Logged in as ${client.user.tag}, Prefix is ${prefix}`, "ready");
    logger.log(`Truewallet is ${tel}`, "log")
    logger.log("Version: " + version, "log")
});

/**
 * Create a text progress bar
 * @param {Number} value - The value to fill the bar
 * @param {Number} maxValue - The max value of the bar
 * @param {Number} size - The bar size (in letters)
 * @return {String} - The bar
 */
global.progressBar = (value, maxValue, size) => {
    const percentage = value / maxValue; // Calculate the percentage of the bar
    const progress = Math.round((size * percentage)); // Calculate the number of square caracters to fill the progress side.
    const emptyProgress = size - progress; // Calculate the number of dash caracters to fill the empty progress side.

    let progressText = ':green_square:'.repeat(progress); // Repeat is creating a string with progress * caracters in it

    if (value > 230) progressText = ':orange_square:'.repeat(progress);
    if (value > 999) progressText = ':red_square:'.repeat(progress);

    const emptyProgressText = ':white_large_square:'.repeat(emptyProgress); // Repeat is creating a string with empty progress * caracters in it
    const percentageText = Math.round(percentage * 100) + '%'; // Displaying the percentage of the bar

    const bar = progressText + emptyProgressText; // Creating the bar
    return bar;
};

client.on('messageCreate', async interaction => {
    if (interaction.content === '$buttontestcommand') {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('primary')
                .setLabel('Primary')
                .setStyle('PRIMARY'),
            );

        interaction.channel.send({ content: 'Pong!', components: [row] });
    }
});

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    console.log(command)
    logger.log(message.author.tag + " | " + prefix + command + ` ${args[0] ? "|" : ""} ${args.join(" | ")}`, "command") //here ตัวนสสีเขียนด้วย 
    if (command === "test") {
        client.channels.cache.get("874088223901614090").send("HELLO WORLD")
    }

    if (command === 'ping') {
        let delay = new Date().getTime() - message.createdTimestamp
        let delayt = delay / 1000
        let delayn = delayt.toFixed(2)
        let pings = `${message.client.ws.ping}`;

        if (pings > 1000) pings = "500"
        if (delayn > 1) delayn = "1"


        let bar = progressBar(delayn, '1', '10');
        let ping = progressBar(pings * 2, '1000', '10');
        let pingEmbed = new Discord.MessageEmbed()
            .setAuthor(`บอทเวอร์ชั่น : ${version} | พัฒนาโดย ${author}`, `${img}`)
            .setColor("GREEN")
            .setDescription(`${ping} | ${client.ws.ping}ms
${bar} | ${delayt.toFixed(2)}s`)
            .setTimestamp()

        return message.channel.send({ embeds: [pingEmbed] }).catch(console.error);
    }
  
    if (command === "ty") {
      message.delete()
 message.channel.send(`<:netherstar:916933016662728765> ขอบคุณที่ใช้บริการ P5 SHOP นะครับ <:netherstar:916933016662728765>
ถ้าถูกใจ ฝากเครดิต <:1_:853578589324967947> ให้เราที่ <#874088197141970994> ด้วยนะครับ
แล้วแวะมาอุดหนุนใหม่นะคร้าบบบ <:congrats:924517045696090152>
ถ้าไม่มีอะไรแล้ว กดปิด ticket โดยพิมพ์ $close ได้เลยครับผม <a:9420mcbeespin:916933018411757578>
<a:bc7:855859841951465492> อย่าลืม Save ข้อความสินค้าไว้ก่อนจะปิด Ticket นะครับ จะได้ไม่ต้องขอใหม่`)
    }

    if (command === "nf") {
      message.delete()
      message.channel.send(`✦ กรุณาอ่านก่อนเข้าใช้ NETFLIX P5 SHOP •₊˚。

♡🔑 1จอ ต่อ1คน เป็นจอส่วนตัว ไม่มีการหารร่วม
♡🖥️ เข้าใช้ทีละอุปกรณ์ ดูทีละเครื่อง
♡🗝 ไม่อนุญาตให้นำไปแชร์หรือขายต่อ
♡🔐 ตั้งรหัสพินเองได้เลย
♡🪑 ห้ามเปลี่ยนรหัสเมล
♡🧺 ห้ามเข้าใช้โปรไฟล์ของคนอื่น
♡🔑 1 โปรไฟล์ ล็อคอินหลายเครื่องได้ แต่ต้องเปิดทีละเครื่อง
♡🍂 แจ้งโปรไฟล์หลังการเปลื่ยนชื่อภายใน 24 ชม. หลังการสั่งซื้อ
♡🌲 แจ้งต่อเมลก่อน 1-3 วันก่อนหมดอายุ [ บางแอคต่อไม่ได้ ]
♡🧵 รับเคลมหากเข้าไม่ได้ ยกเว้นบล็อคโซน

▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀`)
    }
  if(command === "tryweb"){
    message.channel.send(`User สำหรับทดลองใช้
Web : https://rent.p5shop.in.th/
Username : admin_rent
Password : TQ4yUqrU4m3l4NDC`)
  }
  
  if (command === "inyt") {
      message.delete()
      message.channel.send(`<:ytlogo:853578637989904414> วิธีการตอบรับคำเชิญ Youtube [ BY P5 SHOP ]
1. เข้าแอพ Gmail / เว็บ Gmail
2. จะมีลิงก์ของยูทูปส่งไป
3. จิ้มลิงก์ ➤ เลื่อนลงมา
4. กด ACCEPT INVITATION
5. กด GET STARTED 
6. เลือกเมลให้ตรงกับที่ให้ทางร้านมา
7. กด MORE
8. กด JOIN FAMILY 
9. กด VIEW FAMILY 
10. กด เรียบร้อยแล้ว เข้าใช้งานในแอพได้เลย ถ้าเข้าแอพแล้วยังไม่เป็น Premium ให้รีแอปทีหนึ่งครับ

https://cdn.discordapp.com/attachments/874088217689870397/936942717886414869/yt.png`)
    }

  if (command === "outyt") {
      message.delete()
      message.channel.send(`╭・ʚ ?  ɞ・วิธีออกจากกลุ่มครอบครัว Youtube
︰หนึ่ง・ให้ลูกค้าเข้าลิงค์  https://families.google.com/
︰สอง・จากนั้นเข้าสู่ระบบเมลที่จะออกจากกลุ่มครอบครัว
︰สาม・จากนั้นให้กดสามขีดที่มุมบนซ้าย ☰
︰สี่・กดออกจากครอบครัวได้เลย
╰・ʚ เย้ ɞ・ เสร็จเรียบร้อย`)
    }

  if (command === "longyt") {
    message.delete()
    message.channel.send(`❧────༺♢༻────☙
╭・ YT PREMIUM ต่อเมล ( BY P5 SHOP ) ◝ ⊹ 
︰หัวบ้าน ・ ${args[0]} 
︰เมลลูกค้า・ ${args[1]} 
︰สามารถไปกดรับ YT PREMIUM  ใน Gmail เพื่อเปิดใช้งานได้เลยนะครับ
︰เเละเเจ้งทางร้านด้วยว่ารับหรือยัง
︰หมดอายุ : 00/0/2565 [ ควรแจ้งต่อก่อน 1-3 วัน ]
╰ ・ลิงค์สำหรับลูกค้าเข้ากลุ่มแจ้งต่อเมล https://line.me/R/ti/g/x_n9EkqyVM
❧────༺♢༻────☙

https://cdn.discordapp.com/attachments/874088217689870397/936942717886414869/yt.png
https://cdn.discordapp.com/attachments/874088217689870397/936942717588627466/yt_by_p5shop.png`)
    // message.channel.send(`${Date.getDay()}.${Date.getMonth()}.${Date.getYear()}`)
  }

  if(command === "shop-open"){
    message.delete();
    message.channel.send('https://media.discordapp.net/attachments/943318331077853224/943518627209031680/768715d22635d4b1.png?width=881&height=330')
  }

  if(command === "shop-close"){
    message.delete();
    message.channel.send('https://media.discordapp.net/attachments/943318331077853224/943518627452293140/74a3dac7957716f4.png?width=881&height=330')
  }

  if (command === "spam"){
    message.channel.send(`${args.join(" ")}`)
    message.channel.send(`${args.join(" ")}`)
    message.channel.send(`${args.join(" ")}`)
    message.channel.send(`${args.join(" ")}`)
    message.channel.send(`${args.join(" ")}`)
  }

  if(command === "hi"){
    message.channel.send(`<:cashmoneycheck:916913842636865557>  สวัสดีครับ P5 SHOP ยินดีให้บริการครับ <:cashmoneycheck:916913842636865557> 
 <a:918153692128100412:919906823769825321>  แจ้งสื่งที่ต้องการได้เลยครับ <a:9420mcbeespin:916933018411757578>`)
  }

  if(command === "pap"){
    message.channel.send(`<a:wait:929921846512611368> รอจัดส่งสินค้าสักครู่นะครับ <a:wait:929921846512611368>
<a:p_kirbybounce1:947855387032436756> กำลังเตรียมจัดส่งสินค้าครับ <a:918153692128100412:919906823769825321>
<:bag:916912869839351858> ขอบคุณคร้าบ <a:9420mcbeespin:916933018411757578>`)
  }

  if(command === "thx"){
   message.delete();
  message.channel.send(`<:netherstar:916933016662728765> ขอบคุณที่ใช้บริการ P5 SHOP นะครับ <:netherstar:916933016662728765>
ถ้าไม่มีอะไรแล้ว กดปิด ticket โดยพิมพ์ **$close** ได้เลยครับผม <a:9420mcbeespin:916933018411757578>`)
  }

  if(command === "wait"){
    message.channel.send(`<:cashmoneycheck:916913842636865557> รับออเดอร์เรียบร้อยครับ<:cashmoneycheck:916913842636865557> 
<a:wait:929921846512611368>  ปกติสินค้าใช้เวลาจัดส่งไม่เกิน ${args.join(" ")} ครับผม <a:wait:929921846512611368> 
<:netherstar:916933016662728765> ขอบคุณที่ใช้บริการ P5 SHOP คร้าบ <:netherstar:916933016662728765>`)
  }
  

    if (command === "bill") {
        var href = makeid(12);
        message.reply({
            embeds: [new Discord.MessageEmbed()
                .setColor("GREEN")
                // .setTitle(`ชำระเงิน`)
                .setDescription(`\`\`\`ตัวเลือกการชำระเงินตามข้างล่างเลย\`\`\`
          **สำคัญ !** : กรุณาใส่เลขอ้างอิงด้วยนะครับ
          เลขอ้างอิงคือ : ${href}

          -> [**TRUEMONEY WALLET**](
          https://payment.p5shop.in.th/payment/aungpao/)
          -> [**QR PROMPT PAY**](          https://payment.p5shop.in.th/payment/qrpay/)
          `)
                // .setImage('https://payment.p5shop.in.th/img/Newpayment.png')
                .setAuthor(`บอทเวอร์ชั่น : ${version} | พัฒนาโดย ${author}`, `${img}`)
            ]
        });
    message.channel.send(`กรุณาใส่เลขอ้างอิงเป็น : ${href}`)
    message.channel.send(`หรือใส่เป็นเลข TICKET ที่กำลังสนทนาในขณะนี้`)
    }


    if (command === "pay") {
        if (args[0]) {
            twvoucher(`${tel}`, `${args[0]}`).then(redeemed => {
                console.log(redeemed)
                message.reply({
                    embeds: [new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(`\`\`\`ระบบชำระเงินด้วยซองอั่งเปา\`\`\`
    
                คุณ ${message.author.tag} ได้ทำการชำระเงินจำนวน ${redeemed.amount} บาทแล้ว
                โดยผู้สร้างซอง : ${redeemed.owner_full_name}
                ขอขอบพระคุณครับ : D
            `)
                        .setAuthor(`บอทเวอร์ชั่น : ${version} | พัฒนาโดย ${author}`, `${img}`)
                    ]
                })

                client.channels.cache.get(`${sent}`).send({
                    embeds: [new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(`\`\`\`ระบบชำระเงินด้วยซองอั่งเปา\`\`\`
    
                คุณ ${message.author.tag} ได้ทำการชำระเงินจำนวน ${redeemed.amount} บาทแล้ว
                โดยผู้สร้างซอง : ${redeemed.owner_full_name}
                ขอขอบพระคุณครับ : D
            `)
                        .setAuthor(`บอทเวอร์ชั่น : ${version} | พัฒนาโดย ${author}`, `${img}`)
                    ]
                })
            }).catch(err => {
                cpm
                message.reply({
                    embeds: [new Discord.MessageEmbed()
                        .setColor("RED")
                        .setDescription(`\`\`\`ระบบชำระเงินด้วยซองอั่งเปา\`\`\`
    
            ไม่พบซอง ${args[0]}
            `)
                        .setAuthor(`บอทเวอร์ชั่น : ${version} | พัฒนาโดย ${author}`, `${img}`)
                    ]
                })
            });
        } else {
            message.reply({
                embeds: [new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`\`\`\`ระบบชำระเงินด้วยซองอั่งเปา\`\`\`
       กรุณาพิมพ์ $pay <ลิงค์ซอง>
        `)
                    .setAuthor(`บอทเวอร์ชั่น : ${version} | พัฒนาโดย ${author}`, `${img}`)
                ]
            });
        }
    }

    if (command === "qrpay") {
        if (args[0]) {
            if (!Number(args[0]) && args[0] == "0") {
                message.reply({
                    embeds: [new Discord.MessageEmbed()
                        .setColor("#003d6b")
                        .setTitle(`เกิดข้อผิดพลาด`)
                        .setDescription(`\`\`\`นายใส่ยอดชำระน้อยกว่า 1 บาทไม่ได้นะ!\`\`\``)
                        .setAuthor(`บอทเวอร์ชั่น : ${version} | พัฒนาโดย ${author}`, `${img}`)
                    ]
                });
            } else if (!Number(args[0])) {
                message.reply({
                    embeds: [new Discord.MessageEmbed()
                        .setColor("#003d6b")
                        .setTitle(`เกิดข้อผิดพลาด`)
                        .setDescription(`\`\`\`นายใส่เป็นสิ่งอื่นที่ไม่ใช่ตัวเลขไม่ได้นะ !\`\`\``)
                        .setAuthor(`บอทเวอร์ชั่น : ${version} | พัฒนาโดย ${author}`, `${img}`)
                    ]
                });
            } else if (args[0].length < 1) {
                message.reply({
                    embeds: [new Discord.MessageEmbed()
                        .setColor("#003d6b")
                        .setTitle(`เกิดข้อผิดพลาด`)
                        .setDescription(`\`\`\`นายใส่ยอดชำระน้อยกว่า 1 บาทไม่ได้นะ\`\`\``)
                        .setAuthor(`บอทเวอร์ชั่น : ${version} | พัฒนาโดย ${author}`, `${img}`)
                    ]
                });
            } else if (args[0].length > 6) {
                message.reply({
                    embeds: [new Discord.MessageEmbed()
                        .setColor("#003d6b")
                        .setTitle(`เกิดข้อผิดพลาด`)
                        .setDescription(`\`\`\`นายใส่ยอดชำระมากกว่า 999,999 บาทไม่ได้นะ\`\`\``)
                        .setAuthor(`บอทเวอร์ชั่น : ${version} | พัฒนาโดย ${author}`, `${img}`)
                    ]
                });
            } else if (args[0] > 1) {
                let attachment = new Discord.MessageAttachment(`https://promptpay.io/0653192342/${args[0]}`, `${args[0]}.png`)

                message.reply({
                    files: [attachment],
                    embeds: [new Discord.MessageEmbed()
                        .setColor("#003d6b")
                        .setTitle(`Amount : ${args[0]}`)
                        .setDescription(`\`\`\`ชำระเงินผ่าน Qr Code ใต้ล่างเลย\`\`\``)
                        .setImage(`attachment://${args[0]}.png`)
                        .setAuthor(`บอทเวอร์ชั่น : ${version} | พัฒนาโดย ${author}`, `${img}`)
                    ]
                })
            }
        } else {
            message.reply({
                embeds: [new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`\`\`\`ระบบชำระเงินพร้อมเพย์คิวอาโค้ด\`\`\`
       กรุณาพิมพ์ $qrpay <จำนวนเงิน>
        `)
                    .setAuthor(`บอทเวอร์ชั่น : ${version} | พัฒนาโดย ${author}`, `${img}`)
                ]
            });
        }
    }

})

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
// client.on(`messageCreate`, async(message) => {
//     if (message.author.bot) return;
//     if (!message.content.startsWith(prefix) || message.author.bot) return;

//     const args = message.content.slice(prefix.length).trim().split(' ');
//     const command = args.shift().toLowerCase();

//     if (command === `check`) {
//         if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return;

//         let n = args[0];
//         if (args[0]) n = args[0];
//         let query = `SELECT * FROM users WHERE username = ':n'`.replace(":n", n);

//         smithdb.query(query, (err, smith) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 if (smith[0]) {
//                     var id = smith[0].id;
//                     var username = smith[0].username;
//                     var status = smith[0].status;
//                     var point = smith[0].point;
//                     var allpoint = smith[0].allpoint;
//                     var gp = smith[0].GP
//                     var discorduser = smith[0].discorduser;
//                     var tag = smith[0].tag;
//                     var discordid = smith[0].discordid;
//                     var refcode = smith[0].refcode;

//                     message.reply(`ID: ${n}\nUsername : ${username}\nStatus : ${status}\nPoint : ${point}\nAllpoint : ${allpoint}\nGP : ${gp}\nDiscord User : ${discorduser}\nTAG : ${tag}\nUser ID : ${discordid}\nREF CODE : ${refcode}`)

//                 } else {
//                     message.reply("ไม่พบผู้ใช้ไอดีนี้!")
//                 }
//             }
//         });
//     }

//     if (command === `randomref`) {


//         let n = args[0];
//         if (args[0]) n = args[0];
//         let ref = makeid(32);
//         let query2 = `UPDATE users SET refcode = ':ref' WHERE username = ':n'`.replace(":n", n).replace(":ref", ref);

//         smithdb.query(query2, (er, s) => {
//             if (er) {
//                 console.log(er)
//             } else {
//                 let query = `SELECT * FROM users WHERE username = ':n'`.replace(":n", n);

//                 smithdb.query(query, (err, smith) => {
//                     if (err) {
//                         console.log(err)
//                     } else {
//                         if (smith[0]) {
//                             var id = smith[0].id;
//                             var username = smith[0].username;
//                             var status = smith[0].status;
//                             var point = smith[0].point;
//                             var allpoint = smith[0].allpoint;
//                             var gp = smith[0].GP
//                             var discorduser = smith[0].discorduser;
//                             var tag = smith[0].tag;
//                             var discordid = smith[0].discordid;
//                             var refcode = smith[0].refcode;

//                             message.reply(`Username : ${username} ได้ทำการ Gen/Regen Ref เรียบร้อยแล้วครับ กรุณากดรีหน้าเว็บ 1 ครั้งเพื่อดู REF ใหม่ครับ`)

//                         } else {
//                             message.reply("ไม่พบผู้ใช้ไอดีนี้!")
//                         }
//                     }
//                 });
//             }
//         })
//     }

//     // if (command === `verifyacc2`) {


//     //   let n = args[0];
//     //   let ref = args[2];
//     //   if(args[0]) n = args[0];      
//     //     smithdb.query(query, (err , smith) => {
//     //         if (err) {
//     //             console.log(err)
//     //         } else {
//     //             if (smith[0]) {
//     //                 var id = smith[0].id;
//     //                 var username = smith[0].username;
//     //                 var status = smith[0].status;
//     //                 var point = smith[0].point;
//     //                 var allpoint = smith[0].allpoint;
//     //                 var gp = smith[0].GP
//     //                 var discorduser = smith[0].discorduser;
//     //                 var tag = smith[0].tag;
//     //                 var discordid = smith[0].discordid;
//     //                 var refcode = smith[0].refcode;

//     //                 // message.reply(`Username : ${username} Was gen ref success fuly ! Plz go back to website`)
//     //                 if(refcode == ref){
//     //                   message.reply('Correct :)')
//     //                 } else{
//     //                   message.reply('Wrong Ref')
//     //                 }
//     //             } else {
//     //               message.reply("ไม่พบผู้ใช้ไอดีนี้!")
//     //             }
//     //         }
//     //     });
//     //     let query2 = `UPDATE users SET refcode = ':ref' WHERE username = ':n'`.replace(":n", n).replace(":ref",ref);

//     //   smithdb.query(query2, (er, s) => {
//     //     if (er) {
//     //       console.log(er)
//     //     } else {
//     //        let query = `SELECT * FROM users WHERE username = ':n'`.replace(":n", n);
//     //     }
//     //   })
//     // }

//     if (command === `verifyacc`) {
        
//         let n = args[0];

//         if (!n) return message.reply("กรุณาใส่ชื่อด้วย!");
//         if (args[0]) n = args[0];

//         let query2 = `UPDATE users SET discordid = '${message.author.id}' WHERE username = ':n'`.replace(":n", n)
//         let queryuser = `UPDATE users SET discorduser = '${message.author.username}' WHERE username = ':n'`.replace(":n", n)
//         let querytag = `UPDATE users SET tag = '${message.author.discriminator}' WHERE username = ':n'`.replace(":n", n)
//         let query = `SELECT * FROM users WHERE username = ':n'`.replace(":n", n);

//         smithdb.query(query, (err, smith) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 if (smith[0]) {
//                   if(!smith[0].discordid) {
//                     if (smith[0].refcode == null) {
//                         message.reply("User นี้ยังไม่ได้มีการ Gen ref นะครับ :>")
//                     } else {
//                         if (smith[0].discorduser) {
//                             message.reply("Error อิควัย")
//                         } else {


//                             var refcode = smith[0].refcode;
//                             console.log(refcode + " | " + args[1])
//                             if (refcode === args[1]) {
//                                 smithdb.query(query2, (er, sm) => {
//                                     if (er) {
//                                         console.log(err)
//                                     } else {
//                                         message.reply("คุณยืนยันตัวตนแล้ว!!!")
//                                     }
//                                 })
//                                 smithdb.query(queryuser, (er, sm) => {
//                                     if (er) {
//                                         console.log(err)
//                                     } else {

//                                     }
//                                 })
//                                 smithdb.query(querytag, (er, sm) => {
//                                     if (er) {
//                                         console.log(err)
//                                     } else {

//                                     }
//                                 })
//                             } else {
//                                 message.reply("Ref ไม่ตรงกับผู้ใช้นี้!")
//                             }
//                         }

//                     }
//                   } else {
//                     message.reply("ผู้ใช้นี้ได้เชื่อม Discord แล้ว!!")
//                   }
//                 } else {
//                     message.reply("ไม่พบผู้ใช้ไอดีนี้!")
//                 }
//             };
//         });

//     }
// })





client.login(token);