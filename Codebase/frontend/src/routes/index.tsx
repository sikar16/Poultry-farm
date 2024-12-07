import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Nav from "../component/Nav";
import React from "react";

import NotFound from "../component/NotFound";
import Dashboard from "../layout/Admin/Dashboard";
import Layout from "../layout/layout"
import Home from "../feature/Home/home";
import Employee from "../layout/Employee-1/Employee"
import Footer from "../component/Footer"

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        {/* <Nav/> */}
            <Route
                path="/"
                element={<Home />}
            />
            <Route
                path="/edb"
                element={<Employee/>}
            />
            <Route
                path="/*"
                element={<NotFound />}
            />
            {/* <Footer/> */}

        </>
    ))