import React, { useState } from "react";

function DroppebaleZone({ onDrop, children }) {
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = () => {
        setIsDraggingOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDraggingOver(false);
        onDrop();
    };

    return (
        <div
            className={`drop-area ${isDraggingOver ? "dragging-over" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                height: "50rem",
                borderLeft: "0.5px solid grey",
                overflow: "scroll",
                width: "-webkit-fill-available",
                padding: "12px",
                backgroundColor: isDraggingOver ? "#a9e9ff" : "",
            }}
        >
            <div style={{ display: "inline-grid", gap: "10px", width: "100%" }}>
                {children}
            </div>
        </div>
    );
}

export default DroppebaleZone;
