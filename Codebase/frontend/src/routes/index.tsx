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
import Home from "../layout/Home/Home";
import Employee from "../layout/Employee-1/Employee"
import Footer from "../component/Footer"
import About from "../feature/Common/About";
import Services from "../feature/Common/Services";
import Contact from "../feature/Common/Contact";
import Login from "../feature/Login";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>


            <Route
                path="/"
                element={<Home />}
            />
            <Route
                path="/about"
                element={<About />}
            />
            <Route
                path="/services"
                element={<Services />}
            />
            <Route
                path="/contact"
                element={<Contact />}
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<p>kkkkkk</p>} />
            <Route path="/" element={<Home />} />
            { /**SuperAdmin */}

            {/* <Route path="/supAdmin">
                <Route path="/supAdmin/" element={<p>Dashboard superAdmin</p>} />
            </Route> */}



            { /**Admin */}

            {/* <Route path="/Admin">
                <Route path="/admin/" element={<p>Dashboard superAdmin</p>} />
                <Route path="/admin/user" element={<p>User or employee</p>} />
                <Route path="/admin/add_user" element={<p>Add user</p>} />
                <Route path="/admin/health" element={<p>Health</p>} />
                <Route path="/admin/add_vaccine" element={<p>Add vaccine Health</p>} />
                <Route path="/admin/report" element={<p>report</p>} />
                <Route path="/admin/report/broilers" element={<p>broilers</p>} />
                <Route path="/admin/report/layers" element={<p>layers</p>} />
                <Route path="/admin/report/hatchlings" element={<p>hatchlings</p>} />
            </Route> */}




        </>
    ))