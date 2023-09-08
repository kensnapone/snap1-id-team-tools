const express = require('express')
const https = require('https')
const fs = require('fs')
const app = express()
const path = require('path')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
require('dotenv').config({path: __dirname + '/.env'})

const directory = argv.i || process.argv[2] || 'public'
const certFolder = process.env['LOCAL_SECURE_SERVER_KEY_DIR']
const certName = process.env['LOCAL_SECURE_SERVER_KEY_FILENAME']

app.use(express.static(directory))

const httpsOptions = {
    key: fs.readFileSync(`${certFolder}${certName}.key`),
    cert: fs.readFileSync(`${certFolder}${certName}.pem`)
}

https.createServer(httpsOptions, app)
const PORT = 5001;
const port = process.env.LOCAL_SERVER_PORT || PORT
https.createServer(httpsOptions, app).listen(port)
console.log(`Running on ${port}`);