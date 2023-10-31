const inquirer = require('inquirer');
const listFiles = require('./controller/get');
const Upload = require('./controller/upload');
const downloadFile = require('./controller/download');
const keys = require('./keys.json');
const DriveFolderID = '16Afi0ml8TKMZK8oqgAtsKlinuhwNca40';

inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Pilih aksi yang ingin Anda lakukan:',
            choices: [
                'List File',
                'Upload',
                'Download',
                'Delete',
            ],
        },
    ])
    .then(async (answers) => {
        // Gunakan jawaban pengguna untuk apa pun yang Anda butuhkan
        console.log(`Anda memilih untuk ${answers.action}.`);
        if (answers.action === 'List File') {
            listFiles(keys, DriveFolderID);
        }
        if (answers.action === 'Upload') {
            Upload(keys, DriveFolderID);
        }
        if (answers.action === 'Download') {
            const { fileId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'fileId',
                    message: 'Masukkan ID file yang ingin Anda download:',
                },
            ]);
            downloadFile(keys, fileId);
        }

    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Prompt tidak dapat dirender di lingkungan saat ini.");
        } else {
            console.log("Terjadi kesalahan lain: ", error);
        }
    });