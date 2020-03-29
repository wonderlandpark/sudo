import { Args, Props, Command } from '../types'
import fetch from 'node-fetch'

export default class CMD implements Command {
    public props:Props = { name: 'djs', alias: ['discordjs']}
    public async execute(params: Args){
        const res = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=https://raw.githubusercontent.com/discordjs/discord.js/docs/stable.json&q=${encodeURI(params.message.data.args)}`).then(res => res.json())
        console.log(res)
        if(!res) {
            const m = await params.message.reply('404')
            m.delete({timeout: 3000})
        }
        const m = await params.message.reply({embed: res})
        m.delete({timeout: 60000})
    }
}

