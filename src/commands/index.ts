import { Command } from '../types'

import Ping from './ping'
import Discordstatus from './Discordstatus'
import Exec from './exec'
import djs from './djs'

const commands:Command[] = [ new Ping(), new Discordstatus(), new Exec(), new djs() ] 

export default commands