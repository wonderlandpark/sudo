import { Args, Props, Command } from '../types'
import config from '../config'
import * as Discord from 'discord.js'

export default class CMD implements Command {
    public props:Props = { name: 'submit', alias: ['신청']}
    public async execute(params: Args){
     if(params.message.data.arg[0] === 'career') {
         let content = params.message.data.args.split(' ')
         content.splice(0, 1)
         let data = content.join(' ').split(/ \| /gi)
         const m = await params.message.reply('Done.')
         m.delete({timeout: 3000})
         
         console.log(params.client.channels.cache)
         params.client.channels.cache.get(config.submitChannel).send(`${params.message.author.tag} (${params.message.author.id}) \`\`\`fix\nCAREER: ${params.message.data.arg[1]}\n${data.join('\n')}\`\`\``)
         
     
        }
        else {
            const m = await params.message.reply('Parameter required')
            m.delete({timeout: 3000})
        }  
    }
}

