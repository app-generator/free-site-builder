import React from "react";
import { Box, Card, Drawer } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { cardComponet, chartsData, gridData, tables } from "../data/componetData";
const drawerWidth = 240;

function RightSide({ componentsdata, handleDragStart }) {
    return (
        <>
            {" "}
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
                <div>
                    {/* cards */}
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Cards</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box className="accordionDetailBox">
                                {cardComponet.map((item) => {
                                    return (
                                        <Box
                                            display="flex"
                                            key={item.id}
                                            draggable="true"
                                            onDragStart={(event) =>
                                                handleDragStart(event, item)
                                            }
                                        >
                                            <Box>
                                                <Card>
                                                    <img
                                                        src={item.picture}
                                                        alt=""
                                                        style={{
                                                            height: "100px",
                                                            width: "100px",
                                                        }}
                                                    ></img>
                                                </Card>
                                            </Box>
                                            <Typography
                                                margin="auto"
                                                marginLeft="10px"
                                                color="#525f7f"
                                                fontWeight="600"
                                            >
                                                {item.desc}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    {/* Charts */}
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Charts</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box className="accordionDetailBox">
                                {chartsData.map((item) => {
                                    return (
                                        <Box
                                            marginBottom="20px"
                                            display="flex"
                                            key={item.id}
                                            draggable="true"
                                            onDragStart={(event) =>
                                                handleDragStart(event, item)
                                            }
                                        >
                                            <Box style={{ lineHight: "1.6" }}>
                                                <Card>
                                                    <img
                                                        src={item.picture}
                                                        alt=""
                                                        style={{
                                                            height: "100px",
                                                            width: "100px",
                                                        }}
                                                    ></img>
                                                </Card>
                                            </Box>
                                            <Typography
                                                margin="auto"
                                                marginLeft="10px"
                                                color="#525f7f"
                                                fontWeight="600"
                                            >
                                                {item.desc}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    {/* Components */}
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Components</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box className="accordionDetailBox">
                                {componentsdata.map((item) => {
                                    return (
                                        <>
                                            <Box
                                                width="100%"
                                                display="flex"
                                                key={item.id}
                                                draggable="true"
                                                alignItems="center"
                                                onDragStart={(event) =>
                                                    handleDragStart(event, item)
                                                }
                                            >
                                                <Box className="componentImgBox">
                                                    <img
                                                        src={item.picture}
                                                        alt=""
                                                        style={{
                                                            height: "73px",
                                                            width: "73px",
                                                            objectFit: "cover",
                                                        }}
                                                    ></img>
                                                </Box>
                                                <Typography
                                                    margin="auto"
                                                    marginLeft="15px"
                                                    color="#525f7f"
                                                    fontWeight="600"
                                                >
                                                    {item.desc}
                                                </Typography>
                                            </Box>
                                        </>
                                    );
                                })}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
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

                    {/* Tables */}
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Tables</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box className="accordionDetailBox">
                                {tables.map((item) => {
                                    return (
                                        <Box
                                            display="flex"
                                            key={item.id}
                                            draggable="true"
                                            onDragStart={(event) =>
                                                handleDragStart(event, item)
                                            }
                                        >
                                            <Box>
                                                <Card>
                                                    <img
                                                        src={item.picture}
                                                        alt=""
                                                        style={{
                                                            height: "100px",
                                                            width: "100px",
                                                        }}
                                                    ></img>
                                                </Card>
                                            </Box>
                                            <Typography
                                                margin="auto"
                                                marginLeft="10px"
                                                color="#525f7f"
                                                fontWeight="600"
                                            >
                                                {item.desc}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Drawer>
        </>
    );
}

export default RightSide;
