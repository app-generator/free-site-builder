import React from "react";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./RightSide.css";
import { gridData } from "../../data/componetData";

function Grids({ handleDragStart }) {
    return (
        <div>
            {/* grid */}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Grids</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box className="accordionDetailBox">
                        {gridData.map((item) => {
                            return (
                                <>
                                    <Typography
                                        margin="auto"
                                        marginLeft="15px"
                                        color="#525f7f"
                                    >
                                        {item.desc}
                                    </Typography>
                                    <Box
                                        width="100%"
                                        key={item.id}
                                        draggable="true"
                                        alignItems="center"
                                        onDragStart={(event) =>
                                            handleDragStart(event, item)
                                        }
                                    >
                                        <Box
                                            style={{
                                                border: "1px solid #f1f1f1",
                                                background: "#e9ecef",
                                                width: "200px",
                                                height: "30px",
                                                borderRadius: "5px",
                                            }}
                                        >
                                            <img
                                                src={item.picture}
                                                alt=""
                                                style={{
                                                    height: "30px",
                                                    width: "inherit",
                                                }}
                                            ></img>
                                        </Box>
                                    </Box>
                                </>
                            );
                        })}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default Grids;
