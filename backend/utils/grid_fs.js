const mongoose = require("mongoose");
const { Readable } = require("stream");

module.exports = {
    uploadFileHelper: async function (file) {
        try {
            //default connection
            const db = mongoose.connection.db;
            let bucket = new mongoose.mongo.GridFSBucket(db, {
                bucketName: "files",
            });

            let uploadStream = await bucket.openUploadStream(file.originalname, {
                metadata: {
                    user: "John",
                    contentType: file.mimeType,
                },
            });
            function bufferToStream(binary) {
                const readableStream = new Readable(binary);
                readableStream.push(binary);
                readableStream.push(null);
                return readableStream;
            }

            const stream = bufferToStream(file.buffer);
            stream
                .pipe(uploadStream)
                .on("finish", function () {
                    console.log("File Uploaded");
                })
                .on("error", function (err) {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    },

    findFileById: (fileId) => {
        let db = mongoose.connection.db;
        let bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "files" });
        let id = new mongoose.mongo.ObjectID(fileId);
        return bucket.find({ _id: id });
    },

    downloadFileHelper: (fileID) => {
        let db = mongoose.connection.db;
        let bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "files" });
        let id = new mongoose.mongo.ObjectID(fileID);
        return bucket.openDownloadStream(id);
    },
};