const Downloader = require("nodejs-file-downloader");


const downloadFiles = async (link) => {
    console.log(link)
    const downloader = new Downloader({
        // url: "http://212.183.159.230/200MB.zip",
        url: link,
        directory: "./download",
        onProgress: function (percentage, chunk, remainingSize) {

            console.log("% ", percentage);
            // console.log("Current chunk of data: ", chunk);
            // console.log("Remaining bytes: ", remainingSize);
        },
    });

    try {
        const { filePath, downloadStatus } = await downloader.download();
        console.log("All done");
    } catch (error) {
        console.log("Download failed", error);
    }
}

module.exports = downloadFiles;