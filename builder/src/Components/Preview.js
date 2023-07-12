import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";

const Preview = () => {
    const updatedComponents = useSelector((state) => state.updatedComponents.values);

    return (
        <div>
            <Header />

            <div className="grid grid-cols-4 gap-2">
                {updatedComponents &&
                    updatedComponents.length > 0 &&
                    updatedComponents.map((item, index) => {
                        return <div key={index}>{item.element}</div>;
                    })}
            </div>
        </div>
    );
};

export default Preview;
