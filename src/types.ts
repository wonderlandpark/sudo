// Defined Types
import * as Discord from 'discord.js'

export interface SBot {
    readonly config: Config
    client: Discord.Client
}

export interface Message extends Discord.Message{
    data: {
    arg: string[]
    args: string
    prefix: string
    cmd: string
    processed: Date
    }
} 

export interface Config {
    token: string,
    owners: string[],
    prefix: string
    game?: string
}

export interface Command {
    execute(params: Args):void,
    props: Props
}

export interface ResCommand {
    execute(params: Args):void,
    props: Props
    cmd: string
}


export interface Args {
    client: Discord.Client,
    message: Message,
    embed: Discord.MessageEmbed
}
export interface Props {
    name: string,
    alias: string[]
}

