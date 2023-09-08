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

app.use(express.static(directory))

const PORT = 5001;
const port = process.env.LOCAL_SERVER_PORT || PORT
app.listen(port);
console.log(`Running on ${PORT}`);