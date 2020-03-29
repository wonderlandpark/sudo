import * as Discord from 'discord.js'
import * as fs from 'fs'

import { SBot, Config, Message } from '../types'
import commandsHandle from './CommandHandler'
import commands from '../commands'
import { embed } from './'

export default class Bot implements SBot{
    public readonly config: Config
    public client: Discord.Client
    constructor(config: Config){
        this.config = config
        console.log('INIT CONFIG...')
    }

    start () {
        const cmd = new commandsHandle(commands)
        console.log('LOGING')
        
        this.client = new Discord.Client()
        
        this.client.on('ready', () => {
            console.log('IM READY!')
            if (this.config.game) this.client.user.setPresence({ activity: { name: this.config.game }, status: 'idle' })   
        })
        this.client.on('message', (message: Message) => {
            message.data = {
                arg: message.content.replace(this.config.prefix, '').split(' ').slice(1),
                args: message.content.replace(this.config.prefix, '').split(' ').slice(1).join(' '),
                prefix: this.config.prefix,
                cmd: message.content
                  .replace(this.config.prefix, '')
                  .split(' ')[0]
                  .toLowerCase(),
                processed: new Date()
              }
            
            const result = cmd.get(message.data.cmd)
            var now = new Date();
            var s = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' '+  now.getHours() +':' + now.getMinutes() + ':' + now.getSeconds();

            var log = `${s}  [#${message.channel.name}] ${
                message.author.tag
              } : ${message.content.replace(/`/gi, '\\`').replace(/\n/gi, ' (NEWLINE) ')}`
              fs.appendFile('./message.log', log + '\n', function(err: Error) {
                if (err) throw err
                console.log(log)
              })
            if(message.content.toLowerCase().startsWith(this.config.prefix) && result){
                console.log(message.data)
                message.delete()
                result.execute({client: this.client, message: message, embed: embed(message)})
            }
        })
        this.client.login(this.config.token)

    }
}