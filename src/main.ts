import * as core from '@actions/core'
import * as heroku from 'heroku'

async function run(): Promise<void> {
  try {
    const heroku_api_key = core.getInput('heroku_api_key')
    core.debug(`heroku_api_key: ${heroku_api_key}`)
    const app_name = core.getInput('app_name')
    core.debug(`app_name: ${app_name}`)
    const config_key = core.getInput('config_key')
    core.debug(`config_key: ${config_key}`)

    process.env.HEROKU_API_KEY = heroku_api_key
    const hr = await heroku.run(['config:get', config_key, '-a', app_name])
    core.debug(`hr: ${hr}`)

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
