import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Nav from "../component/Nav";
import React from "react";

import NotFound from "../component/NotFound";
import Dashboard from "../layout/Admin/DashboardAd.jsx";
import Layout from "../layout/layout"
import Home from "../layout/Home/Home";
import Employee from "../layout/Employee-1/Employee1.jsx"
import Footer from "../component/Footer"
import About from "../feature/Common/About";
import Services from "../feature/Common/Services";
import Contact from "../feature/Common/Contact";
import Login from "../feature/Login";
import Register from "../feature/Register";
import DashboardSA from "../layout/SuperAdmin/DashboardSA";
import FarmDataForm from "../layout/Admin/FarmDataForm.jsx";

import DashboardAd from "../layout/Admin/DashboardAd.jsx";
import ListNewAdmin from "../layout/SuperAdmin/ListNewAdmin.jsx";
import Employee1 from "../layout/Employee-1/Employee1.jsx";
import Employee2 from "../layout/Employee-2/Employee2.jsx";

export const router = createBrowserRouter(

    createRoutesFromElements(
        <>


            <Route
                path="/"
                element={<Home />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            { /**SuperAdmin */}


            <Route path="/supAdmin/" element={<ListNewAdmin />} />


            { /**isFarmWorker */}
            <Route path="/farmWorker" element={<Employee1 />} />


            { /**isPoultrySpecialist */}
            <Route path="/poultrySpecialist" element={<Employee2 />} />




            { /**Admin */}

            <Route path="/admin">
                <Route path="/admin/" element={<DashboardAd />} />
                <Route path="/admin/addFarmData" element={<FarmDataForm />} />
                <Route path="/admin/user" element={<p>User or employee</p>} />
                <Route path="/admin/add_user" element={<p>Add user</p>} />
                <Route path="/admin/health" element={<p>Health</p>} />
                <Route path="/admin/add_vaccine" element={<p>Add vaccine Health</p>} />
                <Route path="/admin/report" element={<p>report</p>} />
                <Route path="/admin/report/broilers" element={<p>broilers</p>} />
                <Route path="/admin/report/layers" element={<p>layers</p>} />
                <Route path="/admin/report/hatchlings" element={<p>hatchlings</p>} />
            </Route >






        </>
    ))