const { google } = require('googleapis');

async function GetDownloadLink(key, fileId) {
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
        if (!fileId) {
            console.error('File ID belum diisi!');
            return;
        }

        // Mengatur izin akses file menjadi publik
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        // Mendapatkan metadata file berdasarkan fileId
        const fileMetadata = await drive.files.get({
            fileId: fileId,
            fields: 'webContentLink', // Hanya mendapatkan webContentLink untuk download
        });

        const downloadLink = fileMetadata.data.webContentLink;

        if (downloadLink) {
            console.log(`Link download untuk file dengan ID ${fileId}: ${downloadLink}`);
            return downloadLink;
        } else {
            console.error(`Tidak dapat menemukan link download untuk file dengan ID ${fileId}.`);
        }
    } catch (error) {
        console.error('Error getting download link from Google Drive:', error.message);
    }
}

module.exports = GetDownloadLink;