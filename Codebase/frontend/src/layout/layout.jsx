// Layout.jsx
// import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../component/Nav"
import Footer from "../component/Footer"

const Layout = () => {
  return (
    <div>
      <Nav/>
      <main>
        <Outlet /> {/* This is where the page content will be rendered */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
