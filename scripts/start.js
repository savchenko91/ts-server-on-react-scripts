'use strict'
// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'production'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err
})

// Ensure environment variables are read.
require('../config/env')

const fs = require('fs')
const chalk = require('react-dev-utils/chalk')
const webpack = require('webpack')
const clearConsole = require('react-dev-utils/clearConsole')

let subprocess
// TODO choose port

const { createCompiler, prepareUrls, choosePort } = require('./webpackDevServerUtils')

const paths = require('../config/paths')

const appName = require(paths.appPackageJson).name

const useYarn = fs.existsSync(paths.yarnLockFile)

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT_SERVER, 10) || 3001
const HOST = process.env.HOST || '0.0.0.0'

if (process.env.HOST) {
  console.log(
    chalk.cyan(`Attempting to bind to HOST environment variable: ${chalk.yellow(chalk.bold(process.env.HOST))}`),
  )
  console.log(`If this was unintentional, check that you haven't mistakenly set it in your shell.`)
  console.log(`Learn more here: ${chalk.yellow('https://bit.ly/CRA-advanced-config')}`)
  console.log()
}

const devSocket = {
  warnings: (warnings) => console.log('warnings', warnings),
  errors: (errors) => console.log('errors', errors),
}

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'

const useTypeScript = fs.existsSync(paths.appTsConfig)

const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true'

clearConsole()

run()

async function run() {
  const port = await choosePort(HOST, DEFAULT_PORT)

  if (!port) {
    process.exit(0)
  }

  const urls = prepareUrls(protocol, HOST, port)
  process.env.PORT_SERVER = port

  const configFactory = require('../config/webpack.config')
  const config = configFactory('development')

  setTimeout(() => {
    const compiler = createCompiler({
      appName,
      config,
      devSocket,
      urls,
      useYarn,
      useTypeScript,
      tscCompileOnError,
      webpack,
    })

    compiler.watch(
      {
        // Example [watchOptions](/configuration/watch/#watchoptions)
        aggregateTimeout: 300,
        poll: undefined,
      },
      (err, stats) => {},
    )
  })
}
