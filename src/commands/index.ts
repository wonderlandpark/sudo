import { Command } from '../types'

import Ping from './ping'
import Discordstatus from './Discordstatus'
import Exec from './exec'
import djs from './djs'
import submit from './submit'
import Eval from './eval'
import ReadLog from './readLog'
import tag from './tag'

const commands:Command[] = [ new Ping(), new Discordstatus(), new Exec(), new djs(), new tag(), new submit(), new Eval(), new ReadLog()] 

export default commands

