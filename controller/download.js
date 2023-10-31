const fs = require('fs');
const { google } = require('googleapis');

async function downloadFile(key, fileId) {
    const drive = google.drive({
        version: 'v3',
        auth: new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            ['https://www.googleapis.com/auth/drive'],
        ),
    });

    const namaFile = await drive.files.get({
        fileId: fileId,
    });

    const streamFS = `download/${namaFile.data.name}`
    const destStream = fs.createWriteStream(streamFS);

    try {
        const fileResponse = await drive.files.get({
            fileId: fileId,
            alt: 'media',
        }, { responseType: 'stream' });

        fileResponse.data
            .on('end', () => {
                console.log(`File downloaded to: ${streamFS}`);
            })
            .on('error', (err) => {
                console.error('Error downloading file:', err.message);
            })
            .pipe(destStream);
    } catch (error) {
        console.error('Error connecting to Google Drive:', error.message);
    }
}

module.exports = downloadFile;
