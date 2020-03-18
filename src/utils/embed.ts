import { MessageEmbed, Message } from 'discord.js'
import { embed } from '.'

export default function(message: Message){
    const embed = new MessageEmbed()
    embed.setTimestamp(new Date())
    embed.setFooter(message.author.tag)
    return embed
}