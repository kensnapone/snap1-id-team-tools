const fs = require('fs')
const path = require('path')
const tinify = require("tinify")
require('dotenv').config({path: __dirname + '/.env'})
tinify.key = process.env['TINYPNG_API_KEY']

function findPngFiles(dir, callback) {
    fs.readdir(dir, (err, files) => {
        if (err) return console.error(err);

        files.forEach(file => {
            const filePath = path.join(dir, file)
            
            fs.stat(filePath, (err, stats) => {
                if (err) return console.error(err);

                if (stats.isDirectory()) {
                    findPngFiles(filePath, callback)
                } else if (path.extname(file) === '.png') {
                    callback(filePath)
                }
            });
        });
    });
}

function processPngFile(filePath) {
    const source = tinify.fromFile(filePath)
    source.toFile(filePath)
    console.log(`Processing PNG file: ${filePath}`)
}

// Get the directory from the command line arguments.
const targetDirectory = process.argv[2];

if (!targetDirectory) {
    console.error('Please provide a directory path as an argument.');
    process.exit(1);
} else {
    findPngFiles(targetDirectory, processPngFile);
}

