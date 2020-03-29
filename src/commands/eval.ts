import { Args, Props, Command } from '../types'
import config from '../config'

export default class CMD implements Command {
    public props:Props = { name: 'eval', alias: ['script']}
    public async execute(params: Args){
        if (!config.owners.includes(params.message.author.id)) return params.message.channel.send('You are not in the sudoers file. This incident will be reported.')
        if (!params.message.data.args) return params.message.reply('Parameter required')

  if (
    params.message.data.args.includes('client.token') &&
    params.message.data.args.includes('message')
  ) {
    return params.message.channel.send('Sending Token??')
  }
  params.message.reply('Evaling...').then(async m => {
    const result = new Promise(resolve => resolve(eval(params.message.data.args)))

    return result
      .then((output: string) => {
        if (typeof output !== 'string')
          output = require('util').inspect(output, {
            depth: 0
          })
        if (output.includes(params.client.token))
          output = output.replace(params.client.token, '(accesstoken was hidden)')
        if (output.length > 1010)
          console.log(output), (output = output.slice(0, 1010) + '\n...')

        params.embed.setTitle('SCRIPT')
        params.embed.addField('INPUT', '`' + params.message.data.args + '`')
        params.embed.addField('OUTPUT', '```js\n' + output + '```')
        params.embed.setColor('GREEN')
        return m.edit(params.embed)
      })
      .catch(error => {
        console.error(error)
        error = error.toString()

        if (error.includes(params.client.token))
          error = error.replace(params.client.token, '(accesstoken was hidden)')
        params.embed.setTitle('SCRIPT')
        params.embed.addField('INPUT', '`' + params.message.data.args + '`')
        params.embed.addField('OUTPUT', 'err')
        params.embed.addField('ERROR', '```js\n' + error + '```')
        params.embed.setColor('RED')
        return m.edit(params.embed)
      })
  })
    }
}
