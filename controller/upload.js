const { google } = require('googleapis');
const fs = require('fs');
const { file } = require('googleapis/build/src/apis/file');

const folderPath = './upload';

async function Upload(key, DriveFolderID) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        const numberOfFiles = files.length;
        if (numberOfFiles > 1) {
            console.log('Gagal Upload, File Hanya Dapat Upload 1 File!');
        } else {
            uploadFile(key, files[0], DriveFolderID);
        }
    });
}


async function uploadFile(key, files, DriveFolderID) {
    const folderId = DriveFolderID;
    const filePath = `upload/${files}`
    const namaFile = filePath.substring(filePath.lastIndexOf('/') + 1);
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
        const fileMetadata = {
            name: namaFile,
            parents: [folderId],
        };

        const media = {
            mimeType: 'application/octet-stream',
            body: fs.createReadStream(filePath),
        };

        const res = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
            // Adding the resumable option to track upload progress
            media: {
                body: fs.createReadStream(filePath),
                resumable: true,
            },
        });

        // Track progress using the 'progress' event
        let progress = 0;
        const fileSize = fs.statSync(filePath).size;

        media.body.on('data', (chunk) => {
            progress += chunk.length;
            const percentage = ((progress / fileSize) * 100).toFixed(2);
            console.log(`Uploading... ${percentage}%`);
        });

        console.log('File berhasil diunggah. ID:', res.data.id);
    } catch (error) {
        console.error('Error mengunggah file ke Google Drive:', error.message);
    }
}




module.exports = Upload;