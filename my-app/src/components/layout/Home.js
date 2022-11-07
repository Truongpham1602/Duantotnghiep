import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Test/header";
import Footer from "../Test/Footer";

const Home = () => {





    return (
        <>
            <Header/>
            <Outlet />
            <Footer/>
        </>
    )
}

export default Home;