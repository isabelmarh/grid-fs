import React, { useRef } from 'react';
import Dropzone from 'react-dropzone';

const dropStyle = {
    height: "200px",
    border: "1px solid rgb(102, 103, 102)",
    borderRadius: "20px",
    backgroundColor: "#eeeeee"
};

const FileUpload = () => {
    const dropzoneRef = useRef();

    return (
        <form>
            <Dropzone ref={dropzoneRef} maxFiles={4}>
                {({ getRootProps, getInputProps }) => (
                    <div className="container">
                        <div {...getRootProps()} style={dropStyle}>
                            <input {...getInputProps()} />
                            <p style={{ textAlign: "center" }}>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </div>
                )}
            </Dropzone>
        </form>
    );
};

export default FileUpload;

