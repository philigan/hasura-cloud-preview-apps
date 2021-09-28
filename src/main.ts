import {handler} from './handler'
import {createContext} from './context'
import {createLogger} from './logger'

const run = async (context): Promise<void> => {
  try {
    const outputVars = await handler(context)
    const outputVarKeys = Object.keys(outputVars)
    for (let i = 0; i < outputVarKeys.length; i++) {
      context.logger.output(outputVarKeys[i], outputVars[outputVarKeys[i]])
    }
  } catch (error) {
    if (error instanceof Error) {
      context.logger.terminate(error.message)
    } else {
      context.logger.terminate('unexpected error occured')
    }
    process.exit(1)
  }
}

const logger = createLogger()
try {
  const context = createContext()
  run(context)
} catch (e) {
  if (e instanceof Error) {
    logger.terminate(e.message)
  } else {
    logger.terminate('unexpected error occured')
  }
  process.exit(1)
}
