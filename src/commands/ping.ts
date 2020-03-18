import { Args, Props, Command } from '../types'


export default class Ping implements Command {
    public props:Props = { name: 'ping', alias: ['핑']}
    public async execute(params: Args){
        const m = await params.message.reply('핑?')
        m.edit(`퐁! \n웹소켓: \`${params.client.ws.ping}\`ms\n메세지 전송 시간: \`${ m.createdTimestamp - params.message.createdTimestamp }\`ms`)
    }
}

