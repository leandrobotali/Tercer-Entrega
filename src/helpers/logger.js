import log4js from 'log4js'
import 'dotenv/config'

log4js.configure({
  appenders: {
    consola: { type: 'console' },
    archivoErrores: { type: 'file', filename: 'error.log' },
    loggerConsola: {
      type: 'logLevelFilter',
      appender: 'consola',
      level: 'info',
    },
    loggerArchivoErrores: {
      type: 'logLevelFilter',
      appender: 'archivoErrores',
      level: 'error',
    },
  },
  categories: {
    default: {
      appenders: ['loggerConsola','loggerArchivoErrores'],
      level: 'all',
    },
    prod: {
      appenders: ['loggerArchivoErrores'],
      level: 'all',
    },
  },
})

let logger = null

if (process.env.NODE_ENV === 'production') {
  logger = log4js.getLogger('prod')
} else {
  logger = log4js.getLogger()
}

//en produccion establecer en .env NODE_ENV = production

export default logger