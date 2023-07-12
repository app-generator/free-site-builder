import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const ColEightFour = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid item lg={8} md={8}>
                    <Item
                        style={{
                            border: "2px dashed gray",
                            borderRight: "none",
                        }}
                    >
                        col-8
                    </Item>
                </Grid>

                <Grid item lg={4} md={4}>
                    <Item style={{ border: "2px dashed gray" }}>col-4</Item>
                </Grid>
            </Grid>
        </Box>
    );
};
export default ColEightFour;
