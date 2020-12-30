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
const webpack = require('webpack')
const clearConsole = require('react-dev-utils/clearConsole')

let subprocess
// TODO choose port

const { createCompiler } = require('./checkErrors')

const paths = require('../config/paths')

const devSocket = {
  warnings: (warnings) => console.log('warnings', warnings),
  errors: (errors) => console.log('errors', errors),
}

const useTypeScript = fs.existsSync(paths.appTsConfig)

const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true'

clearConsole()

run()

async function run() {
  const configFactory = require('../config/webpack.config')
  const config = configFactory('development')

  setTimeout(() => {
    const compiler = createCompiler({
      config,
      devSocket,
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
