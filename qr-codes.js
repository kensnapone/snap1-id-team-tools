const fs = require('fs')
const qrcode = require('qrcode')
const path = require('path')
require('dotenv').config({path: __dirname + '/.env'})

const url_list= process.env['QR_CODE_URLS']
const qr_size = process.env['QR_CODE_SIZE']
const qr_code_directory = process.env['QR_CODE_DIRECTORY']
const qr_type = process.env['QR_TYPE'] || 'png'
const qr_dark = '#' + process.env['QR_CODE_DARK'] || '#000000ff'
const qr_light = '#' + process.env['QR_CODE_LIGHT'] || '#ffffffff'

const generateCode = url => {
    const imageName = url.replace(/(https?\:\/\/)?(www)?/g, '')
        .replace(/[^A-z0-9\-_]/g, '-')
        .replace(/^\-/, '')
        .toLowerCase()
    if (url) {
        console.log(`${qr_code_directory}${imageName}.${qr_type}`)
        qrcode.toFile(`${qr_code_directory}${imageName}.${qr_type}`, url, {
            width: qr_size,
            type: qr_type,
            color: {
                dark: qr_dark,
                light: qr_light
            }
        }, (error) => console.log(error))
    }
}

fs.readFile(url_list, 'utf8', (err, data) => {
    const urls = data.split('\n')
    urls.forEach(url => generateCode(url));
})



