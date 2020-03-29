import { Args, Props, Command } from '../types'
import config from '../config'
import { exec, execSync } from 'child_process'

export default class CMD implements Command {
    public props:Props = { name: 'exec', alias: ['실행', 'run', 'sudo']}
    public async execute(params: Args){
        const { exec } = require('child_process')

  
    const request = params.message.data.args
    if (!config.owners.includes(params.message.author.id)) return params.message.channel.send('You are not in the sudoers file. This incident will be reported.')
    if (request.includes('client.token')&&request.includes('message')){
        return params.message.channel.send('토큰을 전송해도 될까요?')
    }
    exec(request, (error: string, stdout: string, stderr: string) => {
        console.log('Attempting to exec handler: ' + request)
        if (error) {
        console.log('An error was printed: ' + error)
        error = error.toString()
        params.message.channel.send((error), {code: 'bash'})
        return
        }
        if (stdout.includes(params.client.token)) stdout = stdout.replace(params.client.token, '(accesstoken was hidden)')
        if (stdout.length > 1990) console.log('Attempted shell prompts: ' + stdout), stdout = stdout
        params.message.channel.send(stdout, {code: 'bash'}) 
        if (stderr) {
        if (stderr.includes(params.client.token)) stdout = stderr.replace(params.client.token, '(accesstoken was hidden)')
        if (stderr.length > 1990) console.log('An error was printed: ' + stderr), stderr = stderr.slice(0, 1500) + '\n...Too long to be printed (content got console logged)'
        params.message.channel.send(stderr, {code: 'bash'})
        }
    })
}
}
