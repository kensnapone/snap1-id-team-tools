# Snap1 Instructional Design Team Tools
Tools to help with the instructional design process

## Setup

Install [NodeJS](https://nodejs.org)

```
git clone https://github.com/kensnapone/snap1-id-team-tools.git

cd snap1-id-team-tools

npm install
```
Copy the .env.example file and rename it .env.

## Tools

### Composer Panes Set
Move panes with precision for recording screens the same every time

```
# Adjust Right Pane Pixels
ADJUST_RIGHT_PANE=100

# Adjust Left Pane Pixels
ADJUST_LEFT_PANE=-100

```

### Virtual Ed
Generate audio files of Ed or other AI voices to handle pickups or other needs.

```
# Eleven Labs API Key
ELEVEN_LABS_API_KEY=elevenlabsapikeygoeshere

# Eleven Labs Voice ID
ELEVEN_LABS_VOICE_ID=voiceidgoeshere

# Virtual Ed Text File
VIRTUAL_ED_TEXT=./files/input/virtual_ed.txt

# Voice settings (see https://elevenlabs.io/docs/speech-synthesis/voice-settings)
# Voice settings stability (between 0 and 1.0)
VIRTUAL_ED_VOICE_STABILITY=0

# Voice settings similarity boost (between 0 and 1.0)
VIRTUAL_ED_VOICE_SIMILARITY=0.5

# Voice settings style (between 0 and 1.0)
VIRTUAL_ED_VOICE_STYLE=0

# Voice settings use boost (true or false)
VIRTUAL_ED_VOICE_BOOST=true

```

### QR Codes

Using a text file of URLs (one on each line), you can generate each QR code to a folder you can set. Example content of a text file might look like this:

```
https://www.control4.com
https://www.control4.com/help/education/c4ct/v1/workbook/course-1.html#activity-2-configuring-the-router-and-connecting-to-the-wan
https://www.control4.com/help/education/c4ct/v1/workbook/course-1.html#activity-1-setting-up-the-router
```

#### Environment Variables

```
# QR Code Size in Pixels
QR_CODE_SIZE=300

# Path to QR Code List of URLS in a text file
QR_CODE_URLS=./files/input/qr_codes.txt

# Path to QR Code Output Directory
QR_CODE_DIRECTORY=./files/output/

# QR Code Dark color in rgba format (defaults to black)
# NOTE: Dark should always be darker than the light color
QR_CODE_DARK=000000ff

# QR Code Dark color in rgba format (defaults to white)
QR_CODE_LIGHT=ffffffff
```

#### How to Use

```
node qr-codes.js
```

### Tiny PNG Compression

Compress PNG files in any folder on your computer.

#### Environment Variables

```
# Tiny PNG API Key
TINYPNG_API_KEY=yourapikeygoeshere
```

#### How to Use

**WARNING: This utility overwrites ALL the image files with the compressed version!**

```
node tiny-png.js '/path/to/folder'
```

 *Tip: You can drag the folder to the terminal window to create the path to the folder rather than typing it out.*



### Server

Run a local server, either secured or unsecured (https vs. http), from any folder on your computer.

#### Additional Setup

For a secure server you need to set up a certificate authority on your local computer and any device you want to access the local server. These resources will help you to do this. Be sure to name the pem and key files the same (other than the extension obviously).

[Local Server Certificate on a Mac](https://www.youtube.com/watch?v=sR4_YISXNZE)

[Local Server Certificate on Windows](https://www.youtube.com/watch?v=dDU178Uezc0)

This resouce may help you with the first step of obtaining OpenSSL a little more.
[Generate PEM Keys with OpenSSL on Mac OS](https://kentakodashima.medium.com/generate-pem-keys-with-openssl-on-macos-ecac55791373)



#### Environment Variables

```
# Key and Pem File Directory
LOCAL_SECURE_SERVER_KEY_DIR=./

# Key and Pem File Name
LOCAL_SECURE_SERVER_KEY_FILENAME=cert

# Server Port
LOCAL_SERVER_PORT=5001
```

#### How to Use


For unsecure server, use 

```
node server-unsecure.js '/path/to/folder'
```

 For secure server:

```
node server-secure.js '/path/to/folder'
```