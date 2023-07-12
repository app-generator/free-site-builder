import React from "react";
import { Box, Drawer, Toolbar } from "@mui/material";
const drawerWidth = "200px";

function LeftSide() {
    return (
        <>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: "auto" }}></Box>
                </Drawer>
            </Box>
        </>
    );
}

export default LeftSide;
