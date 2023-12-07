const { google } = require('googleapis');

async function Delete(key, fileId) {
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
        const filesResponse =  await drive.files.delete({
            fileId: fileId,
        });

        console.log('File has been Delete!');
    } catch (error) {
        console.error('Error connecting to Google Drive:', error.message);
    }
  }

  module.exports = Delete;