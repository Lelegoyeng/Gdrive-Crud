const { google } = require('googleapis');
const key = require('./keys.json');

const drive = google.drive({
    version: 'v3',
    auth: new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        ['https://www.googleapis.com/auth/drive'],
    ),
});

async function checkDriveConnection() {
    try {
        // Use the about endpoint to check if the user authenticated successfully
        const aboutResponse = await drive.about.get({
            fields: 'user'
        });

        const user = aboutResponse.data.user;
        console.log(`Connected to Google Drive as: ${user.displayName} (${user.emailAddress})`);
        return true;
    } catch (error) {
        console.error('Error connecting to Google Drive:', error.message);
        return false;
    }
}

// Call the function to check the connection
checkDriveConnection();

drive.files.list({
    q: "'160UgtH6Q5-4QDNpASQO8MRv4LQtQ5EQZ' in parents",
}, (err, res) => {
    if (err) return console.error('The API returned an error:', err.message);
    const files = res.data.files;
    if (files.length) {
        console.log('Files in Storage folder:');
        files.forEach(file => {
            console.log(`${file.name} (${file.id})`);
        });
    } else {
        console.log('No files found in Upload folder.');
    }
});