import * as core from '@actions/core'
import fetch from 'node-fetch'

async function run(): Promise<void> {
  try {
    const heroku_api_key =
      core.getInput('heroku_api_key') || process.env.HEROKU_API_KEY
    core.debug(`heroku_api_key: ${heroku_api_key}`)
    const app_name = core.getInput('app_name') || process.env.APP_NAME
    core.debug(`app_name: ${app_name}`)
    const config_key =
      core.getInput('config_key') || `${process.env.APP_CONFIG_KEY}`
    core.debug(`config_key: ${config_key}`)

    const hr = await fetch(
      `https://api.heroku.com/apps/${app_name}/config-vars`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${heroku_api_key}`,
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    )

    const body = (await hr.json()) as Record<string, string | boolean | number>

    const config_value = body?.[config_key]
    core.debug(`hr: ${JSON.stringify(body, null, 2)}`)

    core.setOutput('config_value', config_value)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
