import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Paper } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const ColTweleve = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={12} md={12}>
                        <Item>col-12</Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ColTweleve;
