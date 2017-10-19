const argv = require('yargs').argv
const shelljs = require('shelljs')
const {promisify} = require('util')
const fs = require('fs')


const {pkg} = argv

process.nextTick(async () => {

  if (!!pkg) {
    shelljs.cd(`packages/${pkg}`)
    shelljs.exec(`rm -f *.js`)
    shelljs.exec(`babel src -d .`)
    shelljs.exec(`npm publish --access=public`)
    shelljs.exec(`rm -f *.js`)
  }
  
})
