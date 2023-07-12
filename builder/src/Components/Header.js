import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch } from "react-redux";
import { hanldePreviewClick } from "./Redux/counterSlice";
import { useNavigate } from "react-router-dom";

function Header({ updatedComponents }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <>
            <Box
                style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f7fafc",
                }}
            >
                <Typography color="black" style={{ margin: "10px", fontSize: 20 }}>
                    React builder
                </Typography>
                <Box sx={{ "& > :not(style)": { m: 1 } }}>
                    <TextField
                        style={{ opacity: "50%", width: "200%" }}
                        id="input-with-icon-textfield"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EditNoteTwoToneIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                </Box>
                <Box style={{ marginLeft: "auto" }}>
                    <Button
                        size="small"
                        style={{
                            height: "25px",
                            marginRight: "15px",
                            background: "black",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "12px",
                            lineHeight: "1.5",
                            borderRadius: "4px",
                        }}
                    >
                        save
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        // color="primary"
                        style={{
                            border: "1px solid gray",
                            marginRight: "15px",
                            height: "25px",
                            background: "#5e72e4",
                            fontWeight: "bold",
                            fontSize: "12px",
                            lineHeight: "1.5",
                            borderRadius: "4px",
                        }}
                    >
                        Download
                    </Button>
                    <Button
                        size="small"
                        style={{
                            border: "1px solid gray",
                            marginRight: "15px",
                            height: "25px",
                            fontWeight: "bold",
                            fontSize: "12px",
                            lineHeight: "1.5",
                            borderRadius: "4px",
                            color: "#172b4d",
                        }}
                        onClick={() => {
                            dispatch(hanldePreviewClick(updatedComponents));
                            navigate("preview");
                        }}
                    >
                        <RemoveRedEyeIcon style={{ height: "16px" }} />
                        Preview
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default Header;
