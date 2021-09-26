import * as core from '@actions/core'
import {handler} from './handler'
// import { getParameters } from './parameters'

async function run(): Promise<void> {
  try {
    //const parameters = getParameters();

    const params = {
      PLAN: 'cloud_free',
      REGION: 'us-east-2',
      NAME: 'tenant1',
      GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
      HASURA_CLOUD_PAT:
        'XGytdW2Ew7vDhH6YzO6c1LUGpLTUziNR50c01sGnZCi7K3Vx31fpP61dAw4gbUNI',
      CLOUD_DATA_GRAPHQL: 'https://2a8e-106-51-72-39.ngrok.io/v1/graphql'
    }
    console.log(params);
    const outputVars = await handler(params)
    const outputVarKeys = Object.keys(outputVars)
    for (let i = 0; i < outputVarKeys.length; i++) {
      core.setOutput(outputVarKeys[i], outputVars[outputVarKeys[i]])
    }
  } catch (error: unknown) {
    console.error(error)
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed('unexpected error occured')
    }
  }
}

run()
