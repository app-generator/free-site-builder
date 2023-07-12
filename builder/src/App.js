import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Preview from "./Components/Preview";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navbar />} />
                <Route path="/preview" element={<Preview />} />
            </Routes>
        </>
    );
}

export default App;
