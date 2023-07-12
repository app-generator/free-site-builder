import React, { useState } from "react";
import { Box, Divider, Drawer } from "@mui/material";
import "./RightSide.css";
import Editor from "./Editor";
import Comp from "./Comp";
import Grids from "./Grids";
import Pages from "./Pages";
const drawerWidth = 240;

function RightSide({ componentsdata, handleDragStart }) {
    const [isComponent, setIsComponent] = useState(false);
    const [isGrid, setIsGrid] = useState(false);
    const [isEditor, setIsEditor] = useState(false);
    const [isPages, setIsPages] = useState(false);

    return (
        <>
            <Drawer
                sx={{
                    width: drawerWidth,
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        height: "50rem",
                        boxSizing: "border-box",
                    },
                }}
                variant="permanent"
                anchor="right"
            >
                <Box className="MenuBox">
                    <Box
                        style={{
                            background: isGrid ? "blue" : "",
                            color: isGrid ? "White" : "",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            setIsGrid(true);
                            setIsComponent(false);
                            setIsEditor(false);
                            setIsPages(false);
                        }}
                    >
                        Grid
                    </Box>
                    <Box
                        style={{
                            background: isComponent ? "black" : "",
                            color: isComponent ? "White" : "",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            setIsComponent(true);
                            setIsEditor(false);
                            setIsGrid(false);
                            setIsPages(false);
                        }}
                    >
                        {" "}
                        Component
                    </Box>
                    <Box
                        style={{
                            background: isEditor ? "Green" : "",
                            color: isEditor ? "White" : "",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            setIsEditor(true);
                            setIsComponent(false);
                            setIsGrid(false);
                            setIsPages(false);
                        }}
                    >
                        Editor
                    </Box>
                    <Box
                        style={{
                            background: isPages ? "black" : "",
                            color: isPages ? "White" : "",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            setIsPages(true);
                            setIsComponent(false);
                            setIsEditor(false);
                            setIsGrid(false);
                        }}
                    >
                        Pages
                    </Box>
                </Box>
                <Divider />
                {isComponent ? (
                    <>
                        <Comp handleDragStart={handleDragStart} />
                    </>
                ) : (
                    ""
                )}
                {isGrid ? <Grids handleDragStart={handleDragStart} /> : ""}

                {isEditor ? <Editor /> : ""}

                {isPages ? <Pages /> : ""}
            </Drawer>
        </>
    );
}

export default RightSide;
