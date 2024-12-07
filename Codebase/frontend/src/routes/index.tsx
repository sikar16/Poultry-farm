import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Nav from "../component/Nav";
import React from "react";
import Home from "../component/Home";
import NotFound from "../component/NotFound";
import Dashboard from "../layout/Admin/Dashboard";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/"
                element={<Dashboard />}
            />
            <Route
                path="/home"
                element={<Home />}
            />
            <Route
                path="/*"
                element={<NotFound />}
            />

        </>
    ))