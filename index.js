const inquirer = require('inquirer');
const listFiles = require('./controller/get');
const Upload = require('./controller/upload');
const downloadFile = require('./controller/download');
const keys = require('./keys.json');
const Delete = require('./controller/delete');
const GetDownloadLink = require('./controller/getDownloadLink');
const downloadFiles = require('./controller/download-files');

// fuwa fuwa f1
const DriveFolderID = '160UgtH6Q5-4QDNpASQO8MRv4LQtQ5EQZ';

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
                'GetDownloadLink',
                'Downloader Files'
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

        if (answers.action === 'Delete') {
            const { fileId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'fileId',
                    message: 'Masukkan ID file yang ingin Anda Delete:',
                },
            ]);
            Delete(keys, fileId);
        }
        if (answers.action === 'GetDownloadLink') {
            const { fileId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'fileId',
                    message: 'Masukkan ID file untuk get Download Link:',
                },
            ]);
            GetDownloadLink(keys, fileId);
        }
        if (answers.action === 'Downloader Files') {
            const { link } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'link',
                    message: 'Masukkan Download Link:',
                },
            ]);
            downloadFiles(link)
        }

    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Prompt tidak dapat dirender di lingkungan saat ini.");
        } else {
            console.log("Terjadi kesalahan lain: ", error);
        }
    });
