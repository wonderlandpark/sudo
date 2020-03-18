import { Bot } from './utils'
import config from './config'

process.on('unhandledRejection', reason => {
    console.error(reason)
  })
  process.on('uncaughtException', err => {
    console.error(err.stack)
  })
  process.on('warning', err => {
    console.warn(err.stack)
  })
  process.on('exit', () => {
    console.info(`Process has been Destroyed`)
    console.log('Bye', 'Cyan')
    console.log('\x1b[0m')
  })

  const B = new Bot(config)

  B.start()