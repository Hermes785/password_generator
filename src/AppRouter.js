import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GeneratePassword from "././Components/GeneratePaswword";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GeneratePassword />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter