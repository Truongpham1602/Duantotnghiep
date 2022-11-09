import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../HOME/header";
import Footer from "../HOME/Footer";

const Home = () => {





    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Home;