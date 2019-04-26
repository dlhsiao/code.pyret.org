'use strict'

const yargs = require('yargs')

function extractSquirrelCommand (options) {
  if (options['squirrel-install']) {
    return 'install'
  }
  if (options['squirrel-updated']) {
    return 'updated'
  }
  if (options['squirrel-uninstall']) {
    return 'uninstall'
  }
  if (options['squirrel-obsolete']) {
    return 'obsolete'
  }
}

function parseArguments (app, args) {
  const options = yargs(args)
  .option('squirrel-install', {
    describe: 'Used by Squirrel to update the app'
  })
  .option('squirrel-uninstall', {
    describe: 'Used by Squirrel to uninstall the app'
  })
  .option('squirrel-obsolete', {
    describe: 'Used by Squirrel to obsolete the app'
  })
  .argv

  const squirrelCommand = extractSquirrelCommand(options)

  return {
    squirrelCommand: squirrelCommand
  }
}

module.exports = {
  parseArguments: parseArguments
}
