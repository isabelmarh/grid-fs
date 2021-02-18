import React, { useRef, useState } from 'react';
import Dropzone from 'react-dropzone';
import { uploadFiles } from './../../utils/api';
import { useSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Chip from '@material-ui/core/Chip';

const dropStyle = {
    height: "200px",
    border: "1px solid rgb(102, 103, 102)",
    borderRadius: "20px",
    backgroundColor: "#eeeeee"
};

const FileUpload = () => {
    const dropzoneRef = useRef();
    const [files, setFiles] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const handleDrop = (aacceptedFiles) => {
        if (aacceptedFiles.length === 0) {
            return;
        }
        setFiles(aacceptedFiles);
    };
    const uploadFile = async (myfile) => {
        try {
            const formData = new FormData();
            formData.append("file", myfile);
            const resp = await uploadFiles(formData);
            if (resp.status === 200) {
                setFiles([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemove = () => {
        setFiles([]);
    };

    const handleFormSubmit = (ev) => {
        ev.preventDefault();
        if (files.length === 0) {
            return;
        }
        files.forEach((file) => {
            uploadFile(file).then(() => {
                enqueueSnackbar("File uploaded", {
                    variant: "success",
                });
            });
        });
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <Dropzone onDrop={handleDrop} ref={dropzoneRef} maxFiles={4}>
                    {({ getRootProps, getInputProps }) => (
                        <div className="container">
                            <div {...getRootProps()} style={dropStyle}>
                                <input {...getInputProps()} />
                                <p style={{ textAlign: "center" }}>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                        </div>
                    )}
                </Dropzone>
                <div style={{ display: "flex", justifyContent: "center", margin: "40px 0" }} >
                    <Button style={{ textAlign: "center" }} variant="contained" startIcon={<CloudUploadIcon />} type="submit" color="default">Upload Files</Button>
                </div>
            </form>
            {files.length > 0 && files.map((file) => {
                return (
                    <div className="file" style={{ margin: 10, width: "100%" }}>
                        <Chip label={`${file.name}`}
                            onDelete={handleRemove}
                            color="primary"
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default FileUpload;

