import { Args, Props, Command } from '../types'
import fetch from 'node-fetch'

export default class Ping implements Command {
    public props:Props = { name: 'djs', alias: ['discordjs']}
    public async execute(params: Args){
        const res = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=https://raw.githubusercontent.com/discordjs/discord.js/docs/stable.json&q=${encodeURI(params.message.data.args)}`).then(res => res.json())
        console.log(res)
        if(!res) return params.message.reply('404')
        params.message.reply({embed: res})
    }
}

