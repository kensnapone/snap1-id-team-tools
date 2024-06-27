const fs = require('fs')
const path = require('path')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
require('dotenv').config({path: __dirname + '/.env'})

fs.readFile(process.env['VIRTUAL_ED_TEXT'], 'utf8', (err, data) => {
    const options = {
        method: 'POST',
        headers: {
          'xi-api-key': process.env['ELEVEN_LABS_API_KEY'],
          'Content-Type': 'application/json'
        },
        body: `{"voice_settings":{"use_speaker_boost":${process.env['VIRTUAL_ED_VOICE_BOOST']},"similarity_boost":${process.env['VIRTUAL_ED_VOICE_SIMILARITY']},"stability":${process.env['VIRTUAL_ED_VOICE_STABILITY']},"style":${process.env['VIRTUAL_ED_VOICE_STYLE']}},"text":"${data.replace(/"/g, `\\"`)}"}`
      }

      if (!err) {
        fetch(`https://api.elevenlabs.io/v1/text-to-speech/${process.env['ELEVEN_LABS_VOICE_ID']}`, options)
        .then(response => response.arrayBuffer())
        .then(buffer => {
            return fs.promises.writeFile(`./files/output/${argv.o || "audio.mp3"}`, Buffer.from(buffer))
        })
        .then(response => console.log(response))
        .catch(err => console.error(err));
      } else {
        console.log(err)
      }
})


