import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ContactUs from "../Pages/ContactUs";
import AboutUs from "../Pages/AboutUs";
import News from "../Pages/News";
import Career from "../Pages/Career";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Admin from "../Pages/Admin";
import PrivateRoutes from "../Components/PrivateRoutes";
import UnAuthorized from "../Components/UnAuthorized";
import DetailNews from "../Pages/DetailNews";

import CatagoryPage from "../Pages/CatagoryPage";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
function AllRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <News />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoutes>
              <>
                <Navbar />
                <Admin />
              </>
            </PrivateRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <Signup />
            </>
          }
        />
        <Route
          path="/contact-us"
          element={
            <>
              <Navbar />
              <ContactUs />
            </>
          }
        />
        <Route
          path="/about-us"
          element={
            <>
              <Navbar />
              <AboutUs />
            </>
          }
        />
        <Route
          path="/career"
          element={
            <>
              <Navbar />
              <Career />
            </>
          }
        />

        <Route
          path="/news/id/:id"
          element={
            <>
              <Navbar />
              <DetailNews />
            </>
          }
        />
        <Route
          path="/unauthorized"
          element={
            <>
              <UnAuthorized />
            </>
          }
        />
        <Route
          path="/news/catagory/:catagory"
          element={
            <>
              <Navbar />
              <CatagoryPage />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route
          path="/404"
          element={
            <Box backgroundColor={"#cb404d"}>
              <Flex
                direction="column"
                align="center"
                justify="center"
                h="100vh"
              >
                <img
                  width={"160px"}
                  src="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Layer%201%20copy%202.png?alt=media&token=51af1e21-b9ef-430a-97e8-0df099d2e048"
                  alt=""
                />
                <Heading color="white" mb="4">
                  404 - Page Not Found
                </Heading>

                <Text color={"white"} mb="4">
                  The page you are looking for does not exist.
                </Text>
                <Link to="/">
                  <Button colorScheme="red">Go to Home</Button>
                </Link>
              </Flex>{" "}
            </Box>
          }
        />
      </Routes>
    </>
  );
}

export default AllRoutes;
