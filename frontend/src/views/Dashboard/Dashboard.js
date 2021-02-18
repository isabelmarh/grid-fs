import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./../../context/UserContext";
import { getAllFiles, deleteFile, downloadFile } from "../../utils/api";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IconButton } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useSnackbar } from "notistack";
import mime from "mime-types";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
const useStyles = makeStyles({
    table: {
        minWidth: 500,
        overflowX: "auto",
    },
    tableContainer: {
        overflowX: "auto"
    },
});

const Dashboard = () => {
    const classes = useStyles();
    const { user } = useContext(UserContext);
    const [allfiles, setAllFiles] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const getFiles = async () => {
        try {
            const token = localStorage.getItem("token");
            const resp = await getAllFiles(token);
            setAllFiles(resp.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getFiles();
    }, []);

    const handleDelete = async (id) => {
        const resp = await deleteFile(id);
        if (resp.status === 200) {
            getFiles();

            enqueueSnackbar("File deleted", {
                variant: "success",
            });
        }
    };

    const handleDownload = async (id, filename) => {
        try {
            const resp = await downloadFile(id);
            const url = window.URL.createObjectURL(new Blob([resp.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div>
            <h1>Welcome, {user && user.user.username}</h1>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>File name</StyledTableCell>
                            <StyledTableCell align="right">File size</StyledTableCell>
                            <StyledTableCell align="right">Upload Date</StyledTableCell>
                            <StyledTableCell align="right">Content Type</StyledTableCell>
                            <StyledTableCell align="right">Chunk Size</StyledTableCell>{" "}
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allfiles.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.filename}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.length / 1024}KB
                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {new Date(row.uploadDate).toLocaleDateString("es-CL")}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {mime.extension(row.metadata.contentType)}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.chunkSize}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <IconButton onClick={() => {
                                        handleDelete(row._id);
                                    }}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                    <IconButton onClick={() => { handleDownload(row._id, row.filename); }}>
                                        <GetAppIcon />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Dashboard;