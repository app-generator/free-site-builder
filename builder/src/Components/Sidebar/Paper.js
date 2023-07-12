import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import carImges from "../ImageCard/sidebar-profile-asteria-dashboard.png";

const style = {
    position: 'absolute',
    marginTop: '9rem !important',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -29%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '7px',
    boxShadow: 28,
};

const ModalComponent = ({ open, onClose }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            style={{ overflow: 'scroll' }}
        >
            <Box sx={style}>
                <Box>
                    <h4 style={{
                        margin: 0,
                        padding: "22px",
                        borderBottom: "1px solid grey",
                        justifyContent: "center",
                        display: "grid"
                    }}
                    >
                        Change Sidebar
                    </h4>
                </Box>
                <Box style={{ display: "flex", flexWrap: "wrap", gap: "77px", margin: "40px" }}>
                    <img style={{ maxWidth: "170px" }} src={carImges} alt='sidebar' />
                    <img style={{ maxWidth: "170px" }} src={carImges} alt='sidebar' />
                    <img style={{ maxWidth: "170px" }} src={carImges} alt='sidebar' />
                    <img style={{ maxWidth: "170px" }} src={carImges} alt='sidebar' />
                    <img style={{ maxWidth: "170px" }} src={carImges} alt='sidebar' />
                    <img style={{ maxWidth: "170px" }} src={carImges} alt='sidebar' />
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalComponent;
