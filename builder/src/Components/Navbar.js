import * as React from "react";
import Box from "@mui/material/Box";
import RightSide from "./Sidebar/RightSide/RightSide";
import DroppebaleZone from "./DroppebaleZone";
import componentsdata from "./data/componetData";
import Header from "./Header";
import AddIcon from "@mui/icons-material/Add";
import ModalComponent from "./Sidebar/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const drawerWidth = 240;

export default function Navbar() {
    const [draggedComponent, setDraggedComponent] = React.useState(null);
    const [updatedComponents, setUpdatedComponents] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [hoveredComponent, setHoveredComponent] = React.useState(null);

    const handleMouseEnter = (componentId) => {
        setHoveredComponent(componentId);
    };

    const handleMouseLeave = () => {
        setHoveredComponent(null);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleDragStart = (event, component) => {
        setDraggedComponent(component);
    };

    const handleDrop = (index) => {
        const clonedComponents = [...updatedComponents];
        clonedComponents.push(draggedComponent);
        setUpdatedComponents(clonedComponents);
        setDraggedComponent(null);
    };
    const handeleclicktodelete = (id) => {
        const deleteinput = [...updatedComponents];
        deleteinput.splice(id, 1);
        setUpdatedComponents(deleteinput);
    };
    const moveElement = (fromIndex, toIndex) => {
        const newData = [...updatedComponents];
        const element = newData[fromIndex];
        newData.splice(fromIndex, 1);
        newData.splice(toIndex, 0, element);
        setUpdatedComponents(newData);
    };

    const moveUp = (id) => {
        const index = updatedComponents.findIndex((item) => item.id === id);
        if (index >= 0) {
            moveElement(index, index - 1);
        }
    };

    const moveDown = (id) => {
        const index = updatedComponents.findIndex((item) => item.id === id);
        if (index >= 0) {
            moveElement(index, index + 1);
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    padding: "0px",
                }}
            >
                <Header updatedComponents={updatedComponents} />

                <Box
                    style={{
                        alignItems: "center",
                        display: "flex",
                        margin: "10px",
                        border: "0.5px solid gray",
                    }}
                >
                    <Box
                        style={{
                            height: "50rem",
                            width: "250px",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                        }}
                    >
                        <AddIcon cursor="pointer" onClick={handleOpenModal} />
                        <ModalComponent open={openModal} onClose={handleCloseModal} />
                    </Box>

                    <Box style={{ width: "-webkit-fill-available" }}>
                        <DroppebaleZone
                            onDrop={() => handleDrop(updatedComponents.length)}
                        >
                            <Box
                                style={{
                                    margin: "0px",
                                    justifyContent: "center",
                                    width: "800px",
                                    display: "flex",
                                }}
                            >
                                <AddIcon />
                            </Box>
                            {updatedComponents.map((item, index) => {
                                return (
                                    <Box
                                        key={item.id}
                                        draggable="true"
                                        onDragStart={(event) =>
                                            handleDragStart(event, item)
                                        }
                                        onClick={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                        style={{
                                            borderStyle:
                                                hoveredComponent === index
                                                    ? "dashed"
                                                    : "",

                                            borderColor: "blue",
                                        }}
                                    >
                                        {hoveredComponent === index ? (
                                            <Box>
                                                <DeleteIcon
                                                    onClick={() =>
                                                        handeleclicktodelete(index)
                                                    }
                                                >
                                                    delete
                                                </DeleteIcon>
                                                <ArrowUpwardIcon
                                                    onClick={() => moveUp(item.id)}
                                                >
                                                    Up
                                                </ArrowUpwardIcon>
                                                <ArrowDownwardIcon
                                                    onClick={() => moveDown(item.id)}
                                                >
                                                    Down
                                                </ArrowDownwardIcon>
                                            </Box>
                                        ) : (
                                            ""
                                        )}
                                        {item.element}
                                    </Box>
                                );
                            })}
                        </DroppebaleZone>
                    </Box>
                </Box>
            </Box>
            <RightSide
                componentsdata={componentsdata}
                handleDragStart={handleDragStart}
            />
        </Box>
    );
}
