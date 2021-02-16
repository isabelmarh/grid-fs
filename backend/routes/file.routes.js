const express = require("express");
const router = express.Router();
const upload = require("./../config/multer");
const auth = require("./../config/auth");

const { uploadFile, downloadFile, deleteFile, getAllFiles } = require("./../controller/files.controller");

/*
@route      POST  api/files/upload
@desc       Upload file to DB
@access     Private
*/
router.post("/upload", auth, upload.single("file"), uploadFile);

/* 
@route      GET api/files/download/6029ee416c8434b5f9aab557
@desc       Get files uploaded by user
@access     Private
*/
router.post("/download/:id", auth, downloadFile);

router.delete("/delete/:id", auth, deleteFile);

router.get("/getFiles", auth, getAllFiles);

module.exports = router;