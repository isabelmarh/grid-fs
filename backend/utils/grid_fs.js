const mongoose = require("mongoose");
const { Readable } = require("stream");

module.exports = {
    uploadFileHelper: async function (file, userId) {
        try {
            //default connection
            const db = mongoose.connection.db;
            let bucket = new mongoose.mongo.GridFSBucket(db, {
                bucketName: "files",
            });

            let uploadStream = await bucket.openUploadStream(file.originalname, {
                metadata: {
                    user: userId,
                    contentType: file.mimetype,
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

    findFileById: (fileID) => {
        let db = mongoose.connection.db;
        let bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "files" });
        let id = new mongoose.mongo.ObjectID(fileID);
        return bucket.find({ _id: id });
    },

    downloadFileHelper: (fileID) => {
        let db = mongoose.connection.db;
        let bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "files" });
        let id = new mongoose.mongo.ObjectID(fileID);
        return bucket.openDownloadStream(id);
    },

    deleteFileHelper: (fileID) => {
        let db = mongoose.connection.db;
        let bucket = new mongoose.mongo.GridFSBucket(db, {
            bucketName: "files"
        });
        let id = new mongoose.mongo.ObjectID(fileID);
        bucket.delete(id);
    },
    getFileByUser: (userId) => {
        let db = mongoose.connection.db;
        let bucket = new mongoose.mongo.GridFSBucket(db, {
            bucketName: "files"
        });
        return bucket.find({ "metadata.userId":  userId  });
    }
};