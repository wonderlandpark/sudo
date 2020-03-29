import { Args, Props, Command } from '../types'
import config from '../config'
import * as fs from 'fs'

export default class CMD implements Command {
    public props:Props = { name: 'readLog', alias: ['로그']}
    public async execute(params: Args){
        if (!config.owners.includes(params.message.author.id)) return params.message.channel.send('You are not in the sudoers file. This incident will be reported.')
        fs.readFile('./message.log', 'utf-8', function(err, data) {
          let lines = data.split(/\r?\n/);
          if(!params.message.data.args){
            let text = ''
            for(let i=0; i<9; i++){
              if(lines[lines.length-i]) text += lines[lines.length-i] + '\n'
            }
            params.message.channel.send('```cmd\nREM Last 10 Lines\n' + text + '\n```')
          }
          else {
            lines = lines.filter(r=> r.includes(params.message.data.args))
            let text = ''
            for(let i=0; i<9; i++){
              if(lines[lines.length-i]) text += lines[lines.length-i] + '\n'
            }
            params.message.channel.send('```cmd\nREM Last 10 Lines\n' + text + '\n```')
          }
      });
    }
}
