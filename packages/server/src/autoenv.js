const { homedir, cpus } = require('os')
const path = require('path')
const dotenv = require('dotenv')
const mkdirp = require('mkdirp')
const fs = require('fs')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

if (!process.env.DATA_DIR) {
  process.env.DATA_DIR = path.resolve(
    process.env.NODE_ENV === 'production' ?
      homedir() :
      process.cwd(),
    './.youkuohao/cis'
  )
}

const envPath = path.resolve(process.env.DATA_DIR, './.env')
if (dotenv.config({ path: envPath }).error) {
  const defaultEnv =
    `# youkuohao ci system
MONGODB_URL = mongodb://localhost`
  mkdirp.sync(process.env.DATA_DIR)
  fs.writeFileSync(envPath, defaultEnv, 'utf8')
  dotenv.config({ path: envPath })
}
