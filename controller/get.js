const { google } = require('googleapis');

async function listFiles(key, DriveFolderID) {
    const drive = google.drive({
        version: 'v3',
        auth: new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            ['https://www.googleapis.com/auth/drive'],
        ),
    });

    try {
        const filesResponse = await drive.files.list({
            q: `'${DriveFolderID}' in parents`,
        });

        const files = filesResponse.data.files;
        console.log(files);
    } catch (error) {
        console.error('Error connecting to Google Drive:', error.message);
    }
}

module.exports = listFiles;