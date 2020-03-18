import { Args, Props, Command } from '../types'
import fetch from 'node-fetch'

export default class Ping implements Command {
    public props:Props = { name: 'Discordstatus', alias: ['디스코드', '디스코드상태']}
    public async execute(params: Args){
        const json: {components: {id: string, name: string, status: string, created_at: Date, updated_at: Date}[], status: { description: string }} = await fetch('https://srhpyqt94yxb.statuspage.io/api/v2/summary.json').then(r=> r.json())
        params.embed.setTitle('Discord Status')
        params.embed.setDescription(json.status.description)
        const downComp = json.components.filter((el: { status: string }) => el.status !== 'operational' )
        if(downComp.length > 0) downComp.forEach(el=> params.embed.addField(el.name, el.status))
        return params.message.reply(params.embed)
    }
}