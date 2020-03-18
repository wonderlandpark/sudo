import { Command, ResCommand } from '../types'

export default class CommandHander {
    public CommandList: Command[]
    public Commands: ResCommand[]
    constructor ( commands: Command[] ){
        this.CommandList = commands
        this.Commands = []
        this.CommandList.forEach(el=> {
            this.Commands.push({ execute: el.execute, props: el.props, cmd: el.props.name})
            el.props.alias.forEach(a=> {
                this.Commands.push({ execute: el.execute, props: el.props, cmd: a})
            })
        })        
    }

    get(cmd: string){
        const res = this.Commands.filter(r=> r.cmd.toLowerCase() === cmd.toLowerCase())
        if(res.length > 0) return res[0]
        else return false
    }

}