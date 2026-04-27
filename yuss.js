 
const axios = require('axios')
const { exec } = require('child_process')

function bukaWA(noWa) {
  const url = `https://wa.me/${noWa}?text=Min%20minta%20pw%20untuk%20bot%20telegram%20v1%20dong`
  if (process.platform === 'win32') exec(`start ${url}`)
  else if (process.platform === 'darwin') exec(`open ${url}`)
  else exec(`xdg-open ${url}`)
}

module.exports = (bot, config, sempak) => {

//====

bot.start((ctx) => {
    const user = ctx.from
    ctx.replyWithPhoto({ source: './lib/menu.jpg' }, {
        caption: `⚀──────『BOT MENU』──────⚀

𖠇 User info
➬ Name: ${user.first_name} ${user.last_name || ''}
➬ Id: ${user.id}

𖧶 Bot Info
➬ Name: Syuzo
➬ Owner: YussXy
➬ Version: 1.0
➬ Prefix: /

⌥⧽ BOT FEATURES
◍ /capcut
◍ /facebook
◍ /spotify
◍ /tiktok
◍ /removebg
◍ /remini
◍ /ssweb
◍ /faxelobyff
◍ /iqc
`,
        reply_markup: {
            inline_keyboard: [
                [{ text: "Join Saluran", url: 'https://whatsapp.com/channel/0029VbAgFKULSmbeJMLfmR3b' }],
                [{ text: "Chat Owner", url: 'https://t.me/YussXy' }],
                [{ text: "Update Bot", callback_data: 'update_bot' }],
                [{ text: "Support", url: 'https://saweria.co/yussxy' }, { text: "Saran", url: 'https://ngl.link/yussxy' }]
            ]
        }
    })
})

bot.action('update_bot', async (ctx) => {
    await ctx.answerCbQuery()
    await ctx.reply(`📦 *HARGA UPDATE BOT*

✅ 5 fitur - Rp.3000
✅ 8 fitur - Rp.5000
✅ 10 fitur - Rp.8000
✅ 12 fitur - Rp.10000

💳 PEMBAYARAN:
🏦 DANA: 083188871798

Kirim bukti transfer ke owner @YussXy
`, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: "Kembali ke Menu", callback_data: 'back_to_start' }]
            ]
        }
    })
})

bot.action('back_to_start', async (ctx) => {
    await ctx.answerCbQuery()
    const user = ctx.from
    await ctx.replyWithPhoto({ source: './lib/menu.jpg' }, {
        caption: `⚀──────『BOT MENU』──────⚀

𖠇 User info
➬ Name: ${user.first_name} ${user.last_name || ''}
➬ Id: ${user.id}

𖧶 Bot Info
➬ Name: Syuzo
➬ Owner: YussXy
➬ Version: 1.0
➬ Prefix: /

⌥⧽ BOT FEATURES
◍ /capcut
◍ /facebook
◍ /spotify
◍ /tiktok
◍ /removebg
◍ /remini
◍ /ssweb
◍ /faxelobyff
◍ /iqc
`,
        reply_markup: {
            inline_keyboard: [
                [{ text: "Join Saluran", url: 'https://whatsapp.com/channel/0029VbAgFKULSmbeJMLfmR3b' }],
                [{ text: "Chat Owner", url: 'https://t.me/YussXy' }],
                [{ text: "Update Bot", callback_data: 'update_bot' }],
                [{ text: "Support", url: 'https://saweria.co/yussxy' }, { text: "Saran", url: 'https://ngl.link/yussxy' }]
            ]
        }
    })
})



bot.hears('minta', (ctx) => {
    bukaWA(config.noWa)
    ctx.reply('Membuka WhatsApp...')
})



//===========

bot.command('capcut', async (ctx) => {
    let url = ctx.message.text.split(' ')[1]
    let replyToMessageId = ctx.message.message_id
    
    if (!url && ctx.message.reply_to_message) {
        const repliedText = ctx.message.reply_to_message.text
        const words = repliedText.split(' ')
        for (const word of words) {
            if (word.includes('http') && (word.includes('capcut.com') || word.includes('capcut'))) {
                url = word
                break
            }
        }
    }
    
    if (!url) {
        return ctx.reply('✎ Example:\n/capcut link video nya', { reply_to_message_id: replyToMessageId })
    }

    const loadingMsg = await ctx.reply('LOADING.....', { reply_to_message_id: replyToMessageId })
    
    const apiUrl = `https://api.nexray.web.id/downloader/v2/capcut?url=${encodeURIComponent(url)}`
    
    try {
        const response = await axios.get(apiUrl)
        
        if (response.data && response.data.status === true && response.data.result && response.data.result.url) {
            const result = response.data.result
            const videoUrl = result.url
            const caption = `📹 ${result.title || 'Video CapCut'}\n⏱️ Durasi: ${result.duration || 'Tidak diketahui'}\n❤️ Like: ${result.likes || '0'}\n👀 Penggunaan: ${result.usage || '0'}\n\n✅ Berhasil di download`
            
            await ctx.deleteMessage(loadingMsg.message_id)
            await ctx.replyWithVideo({ url: videoUrl }, {
                caption: caption,
                reply_to_message_id: replyToMessageId
            })
        } else {
            await ctx.deleteMessage(loadingMsg.message_id)
            ctx.reply('Gagal mendownload video. Pastikan URL CapCut valid.', { reply_to_message_id: replyToMessageId })
        }
    } catch (error) {
        console.error(error)
        await ctx.deleteMessage(loadingMsg.message_id)
        ctx.reply('Error: Gagal memproses link CapCut. Coba lagi nanti.', { reply_to_message_id: replyToMessageId })
    }
})


//👋👋


bot.command(['fb', 'facebook'], async (ctx) => {
    let url = ctx.message.text.split(' ')[1]
    let replyToMessageId = ctx.message.message_id
    
    if (!url && ctx.message.reply_to_message) {
        const repliedText = ctx.message.reply_to_message.text
        const words = repliedText.split(' ')
        for (const word of words) {
            if (word.includes('http') && (word.includes('facebook.com') || word.includes('fb.com'))) {
                url = word
                break
            }
        }
    }
    
    if (!url) {
        return ctx.reply('✎ Example:\n/fb link facebook nya', { reply_to_message_id: replyToMessageId })
    }

    const loadingMsg = await ctx.reply('LOADING.....', { reply_to_message_id: replyToMessageId })
    
    const apiUrl = `https://api.nexray.web.id/downloader/facebook?url=${encodeURIComponent(url)}`
    
    try {
        const response = await axios.get(apiUrl)
        
        if (response.data && response.data.status === true && response.data.result) {
            const result = response.data.result
            let videoUrl = result.video_hd || result.video_sd
            
            if (videoUrl) {
                await ctx.deleteMessage(loadingMsg.message_id)
                await ctx.replyWithVideo({ url: videoUrl }, {
                    caption: `✅ Berhasil di download`,
                    reply_to_message_id: replyToMessageId
                })
            } else {
                await ctx.deleteMessage(loadingMsg.message_id)
                ctx.reply('Gagal mendownload video. Pastikan URL Facebook valid.', { reply_to_message_id: replyToMessageId })
            }
        } else {
            await ctx.deleteMessage(loadingMsg.message_id)
            ctx.reply('Gagal mendownload video. Pastikan URL Facebook valid.', { reply_to_message_id: replyToMessageId })
        }
    } catch (error) {
        console.error(error)
        await ctx.deleteMessage(loadingMsg.message_id)
        ctx.reply('Error: Gagal memproses link Facebook. Coba lagi nanti.', { reply_to_message_id: replyToMessageId })
    }
})



//🥎🥎


bot.command('spotify', async (ctx) => {
    let url = ctx.message.text.split(' ')[1]
    let replyToMessageId = ctx.message.message_id
    
    if (!url && ctx.message.reply_to_message) {
        const repliedText = ctx.message.reply_to_message.text
        const words = repliedText.split(' ')
        for (const word of words) {
            if (word.includes('http') && (word.includes('spotify.com') || word.includes('spotify'))) {
                url = word
                break
            }
        }
    }
    
    if (!url) {
        return ctx.reply('✎ Example:\n/spotify link/query', { reply_to_message_id: replyToMessageId })
    }

    const loadingMsg = await ctx.reply('LOADING.....', { reply_to_message_id: replyToMessageId })
    
    const apiUrl = `https://api.nexray.web.id/downloader/spotify?url=${encodeURIComponent(url)}`
    
    try {
        const response = await axios.get(apiUrl, {
            timeout: 10000
        })
        
        if (response.data && response.data.status === true && response.data.result) {
            const result = response.data.result
            const audioUrl = result.url
            
            if (audioUrl) {
                await ctx.deleteMessage(loadingMsg.message_id)
                await ctx.replyWithAudio({ url: audioUrl }, {
                    caption: `🎵 ${result.title}\n🎤 Artist: ${result.artist}\n\n✅ Berhasil di download`,
                    reply_to_message_id: replyToMessageId
                })
            } else {
                await ctx.deleteMessage(loadingMsg.message_id)
                ctx.reply('Gagal mendownload audio. Pastikan URL Spotify valid.', { reply_to_message_id: replyToMessageId })
            }
        } else {
            await ctx.deleteMessage(loadingMsg.message_id)
            ctx.reply('Gagal mendownload audio. Pastikan URL Spotify valid.', { reply_to_message_id: replyToMessageId })
        }
    } catch (error) {
        console.error(error)
        await ctx.deleteMessage(loadingMsg.message_id)
        ctx.reply('Error: Gagal memproses link Spotify. Coba lagi nanti.', { reply_to_message_id: replyToMessageId })
    }
})


//🥊🥊

bot.command(['tiktok', 'tt'], async (ctx) => {
    let url = ctx.message.text.split(' ')[1]
    let replyToMessageId = ctx.message.message_id
    
    if (!url && ctx.message.reply_to_message) {
        const repliedText = ctx.message.reply_to_message.text
        const words = repliedText.split(' ')
        for (const word of words) {
            if (word.includes('http') && (word.includes('tiktok.com') || word.includes('vt.tiktok'))) {
                url = word
                break
            }
        }
    }
    
    if (!url) {
        return ctx.reply('✎ Example:\n/tiktok link tiktok nya', { reply_to_message_id: replyToMessageId })
    }

    const loadingMsg = await ctx.reply('LOADING.....', { reply_to_message_id: replyToMessageId })
    
    const apiUrl = `https://api.nexray.web.id/downloader/tiktok?url=${encodeURIComponent(url)}`
    
    try {
        const response = await axios.get(apiUrl)
        
        if (response.data && response.data.status === true && response.data.result) {
            const result = response.data.result
            const videoUrl = result.data
            const musicUrl = result.music_info?.url
            const stats = result.stats
            
            const caption = `🎵 ${result.title || 'TikTok Video'}\n👤 Author: ${result.author?.nickname || 'Unknown'}\n⏱️ Durasi: ${result.duration || 'Tidak diketahui'}\n\n📊 Stats:\n👁️ Views: ${stats?.views || '0'}\n❤️ Likes: ${stats?.likes || '0'}\n💬 Comments: ${stats?.comment || '0'}\n↗️ Share: ${stats?.share || '0'}\n\n✅ Berhasil di download`
            
            await ctx.deleteMessage(loadingMsg.message_id)
            
            const sentMessage = await ctx.replyWithVideo({ url: videoUrl }, {
                caption: caption,
                reply_to_message_id: replyToMessageId,
                reply_markup: musicUrl ? {
                    inline_keyboard: [
                        [{ text: "Unduh MP3", callback_data: `download_mp3_${result.id}` }]
                    ]
                } : undefined
            })
            
            if (musicUrl) {
                bot.action(`download_mp3_${result.id}`, async (ctx) => {
                    await ctx.answerCbQuery()
                    await ctx.replyWithAudio({ url: musicUrl }, {
                        caption: `🎵 ${result.music_info?.title || 'Audio TikTok'}\n👤 Artist: ${result.music_info?.author || 'Unknown'}\n\n✅ Berhasil di download`,
                        reply_to_message_id: sentMessage.message_id
                    })
                })
            }
        } else {
            await ctx.deleteMessage(loadingMsg.message_id)
            ctx.reply('Gagal mendownload video. Pastikan URL TikTok valid.', { reply_to_message_id: replyToMessageId })
        }
    } catch (error) {
        console.error(error)
        await ctx.deleteMessage(loadingMsg.message_id)
        ctx.reply('Error: Gagal memproses link TikTok. Coba lagi nanti.', { reply_to_message_id: replyToMessageId })
    }
})




//🥊🥊

bot.command(['removebg', 'rbg'], async (ctx) => {
    let url = ctx.message.text.split(' ')[1]
    let replyToMessageId = ctx.message.message_id
    
    if (!url && ctx.message.reply_to_message) {
        if (ctx.message.reply_to_message.text) {
            const repliedText = ctx.message.reply_to_message.text
            const words = repliedText.split(' ')
            for (const word of words) {
                if (word.includes('http') && (word.includes('.jpg') || word.includes('.png') || word.includes('.jpeg'))) {
                    url = word
                    break
                }
            }
        } else if (ctx.message.reply_to_message.photo) {
            const photo = ctx.message.reply_to_message.photo[ctx.message.reply_to_message.photo.length - 1]
            const photoUrl = await ctx.telegram.getFileLink(photo.file_id)
            url = photoUrl.href
        }
    }
    
    if (!url) {
        return ctx.reply('✎ Example:\n/removebg link gambar ny', { reply_to_message_id: replyToMessageId })
    }

    const loadingMsg = await ctx.reply('LOADING.....', { reply_to_message_id: replyToMessageId })
    
    const apiUrl = `https://api.nexray.web.id/tools/v1/removebg?url=${encodeURIComponent(url)}`
    
    try {
        const response = await axios.get(apiUrl, {
            responseType: 'arraybuffer',
            timeout: 30000
        })
        
        if (response.status === 200 && response.data && response.data.length > 1000) {
            await ctx.deleteMessage(loadingMsg.message_id)
            await ctx.replyWithPhoto({ source: Buffer.from(response.data) }, {
                caption: '✅ Background berhasil dihapus',
                reply_to_message_id: replyToMessageId
            })
        } else {
            await ctx.deleteMessage(loadingMsg.message_id)
            ctx.reply('Gagal menghapus background. Pastikan URL foto valid dan foto jelas.', { reply_to_message_id: replyToMessageId })
        }
    } catch (error) {
        console.error(error)
        await ctx.deleteMessage(loadingMsg.message_id)
        
        if (error.response && error.response.status === 400) {
            ctx.reply('Error: URL foto tidak valid. Pastikan menggunakan link foto langsung (jpg/png).', { reply_to_message_id: replyToMessageId })
        } else {
            ctx.reply('Error: Gagal memproses foto. Coba lagi nanti.', { reply_to_message_id: replyToMessageId })
        }
    }
})


//😢😢


bot.command(['hd', 'remini'], async (ctx) => {
    let url = ctx.message.text.split(' ')[1]
    let replyToMessageId = ctx.message.message_id
    
    if (!url && ctx.message.reply_to_message) {
        if (ctx.message.reply_to_message.text) {
            const repliedText = ctx.message.reply_to_message.text
            const words = repliedText.split(' ')
            for (const word of words) {
                if (word.includes('http') && (word.includes('.jpg') || word.includes('.png') || word.includes('.jpeg'))) {
                    url = word
                    break
                }
            }
        } else if (ctx.message.reply_to_message.photo) {
            const photo = ctx.message.reply_to_message.photo[ctx.message.reply_to_message.photo.length - 1]
            const photoUrl = await ctx.telegram.getFileLink(photo.file_id)
            url = photoUrl.href
        }
    }
    
    if (!url) {
        return ctx.reply('✎ Example:\n/hd https://files.catbox.moe/q88nne.jpg\n', { reply_to_message_id: replyToMessageId })
    }

    const loadingMsg = await ctx.reply('LOADING.....', { reply_to_message_id: replyToMessageId })
    
    const apiUrl = `https://api.nexray.web.id/tools/remini?url=${encodeURIComponent(url)}`
    
    try {
        const response = await axios.get(apiUrl, {
            responseType: 'arraybuffer',
            timeout: 60000
        })
        
        if (response.status === 200 && response.data && response.data.length > 1000) {
            await ctx.deleteMessage(loadingMsg.message_id)
            await ctx.replyWithPhoto({ source: Buffer.from(response.data) }, {
                caption: '✅ Foto Berhasil Di HD Kan',
                reply_to_message_id: replyToMessageId
            })
        } else {
            await ctx.deleteMessage(loadingMsg.message_id)
            ctx.reply('Gagal memproses gambar. Pastikan URL foto valid dan foto jelas.', { reply_to_message_id: replyToMessageId })
        }
    } catch (error) {
        console.error(error)
        await ctx.deleteMessage(loadingMsg.message_id)
        
        if (error.response && error.response.status === 400) {
            ctx.reply('Error: URL foto tidak valid. Pastikan menggunakan link foto langsung (jpg/png).', { reply_to_message_id: replyToMessageId })
        } else {
            ctx.reply('Error: Gagal memproses foto. Coba lagi nanti.', { reply_to_message_id: replyToMessageId })
        }
    }
})



bot.command('ssweb', async (ctx) => {
    let url = ctx.message.text.split(' ')[1]
    let replyToMessageId = ctx.message.message_id
    
    if (!url && ctx.message.reply_to_message) {
        const repliedText = ctx.message.reply_to_message.text
        const words = repliedText.split(' ')
        for (const word of words) {
            if (word.includes('http')) {
                url = word
                break
            }
        }
    }
    
    if (!url) {
        return ctx.reply('✎ Example:\n/ssweb https://tiktokdownld.vercel.app/', { reply_to_message_id: replyToMessageId })
    }

    const loadingMsg = await ctx.reply('LOADING.....', { reply_to_message_id: replyToMessageId })
    
    const apiUrl = `https://api.nexray.web.id/tools/ssweb?url=${encodeURIComponent(url)}`
    
    try {
        const response = await axios.get(apiUrl, {
            timeout: 30000
        })
        
        if (response.data && response.data.status === true && response.data.result && response.data.result.file_url) {
            const imageUrl = response.data.result.file_url
            
            await ctx.deleteMessage(loadingMsg.message_id)
            await ctx.replyWithPhoto({ url: imageUrl }, {
                caption: `✅ Screenshot berhasil diambil\n🌐 URL: ${url}`,
                reply_to_message_id: replyToMessageId
            })
        } else {
            await ctx.deleteMessage(loadingMsg.message_id)
            ctx.reply('Gagal mengambil screenshot. Pastikan URL valid.', { reply_to_message_id: replyToMessageId })
        }
    } catch (error) {
        console.error(error)
        await ctx.deleteMessage(loadingMsg.message_id)
        ctx.reply('Error: Gagal memproses screenshot. Coba lagi nanti.', { reply_to_message_id: replyToMessageId })
    }
})





//💘💘


bot.command('faxelobyff', async (ctx) => {
    let nama = ctx.message.text.split(' ')[1]
    let replyToMessageId = ctx.message.message_id
    
    if (!nama && ctx.message.reply_to_message) {
        const repliedText = ctx.message.reply_to_message.text
        if (repliedText) {
            nama = repliedText.trim()
        }
    }
    
    if (!nama) {
        return ctx.reply('✎ Example:\n/faxelobyff YussXy', { reply_to_message_id: replyToMessageId })
    }

    const loadingMsg = await ctx.reply('LOADING.....', { reply_to_message_id: replyToMessageId })
    
    const apiUrl = `https://api.nexray.web.id/maker/fakelobyff?nickname=${encodeURIComponent(nama)}`
    
    try {
        const response = await axios.get(apiUrl, {
            responseType: 'arraybuffer',
            timeout: 30000
        })
        
        if (response.status === 200 && response.data && response.data.length > 1000) {
            await ctx.deleteMessage(loadingMsg.message_id)
            await ctx.replyWithPhoto({ source: Buffer.from(response.data) }, {
                caption: `✅ Berhasil dibuat\n📝 Nama: ${nama}`,
                reply_to_message_id: replyToMessageId
            })
        } else {
            await ctx.deleteMessage(loadingMsg.message_id)
            ctx.reply('Gagal membuat fake lobby FF. Coba lagi nanti.', { reply_to_message_id: replyToMessageId })
        }
    } catch (error) {
        console.error(error)
        await ctx.deleteMessage(loadingMsg.message_id)
        ctx.reply('Error: Gagal memproses permintaan. Coba lagi nanti.', { reply_to_message_id: replyToMessageId })
    }
})


//😍😍


bot.command('iqc', async (ctx) => {
    let teks = ctx.message.text.split(' ').slice(1).join(' ')
    let replyToMessageId = ctx.message.message_id
    
    if (!teks && ctx.message.reply_to_message) {
        const repliedText = ctx.message.reply_to_message.text
        if (repliedText) {
            teks = repliedText.trim()
        }
    }
    
    if (!teks) {
        return ctx.reply('✎ Example:\n/iqc Hai', { reply_to_message_id: replyToMessageId })
    }

    const loadingMsg = await ctx.reply('LOADING.....', { reply_to_message_id: replyToMessageId })
    
    const apiUrl = `https://api.nexray.web.id/maker/iqc?text=${encodeURIComponent(teks)}`
    
    try {
        const response = await axios.get(apiUrl, {
            responseType: 'arraybuffer',
            timeout: 30000
        })
        
        if (response.status === 200 && response.data && response.data.length > 1000) {
            await ctx.deleteMessage(loadingMsg.message_id)
            await ctx.replyWithPhoto({ source: Buffer.from(response.data) }, {
                caption: `✅ Berhasil dibuat\n📝 Teks: ${teks}`,
                reply_to_message_id: replyToMessageId
            })
        } else {
            await ctx.deleteMessage(loadingMsg.message_id)
            ctx.reply('Gagal membuat IQC. Coba lagi nanti.', { reply_to_message_id: replyToMessageId })
        }
    } catch (error) {
        console.error(error)
        await ctx.deleteMessage(loadingMsg.message_id)
        ctx.reply('Error: Gagal memproses permintaan. Coba lagi nanti.', { reply_to_message_id: replyToMessageId })
    }
})









//===========

}
