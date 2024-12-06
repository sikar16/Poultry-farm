import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Nav from "../component/Nav";
import React from "react";
import Home from "../component/Home";
import NotFound from "../component/NotFound";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/"
                element={<Nav />}
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