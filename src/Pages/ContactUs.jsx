import React from "react";
import ContactPageComp from "../Components/ContactPageComp";
import {  Center, Flex } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

function ContactUs() {
  return (
    <>
      <Helmet>
        <title>Contact-Surtie's Digital Media </title>
        <meta name="Contact" content="Get in touch" />
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
        />
        <link
          rel="apple-touch-icon"
          href="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
        />
      </Helmet>
      <Flex
        p={"20px"}
        background={"#d91e26"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={{ base: "column", md: "row" }}
        gap={"20px"}
      >
        <Center w={{ base: "100%", md: "49%" }}>
          {" "}
          <ContactPageComp />
        </Center>

        <Center
          justifyContent={"center"}
          alignItems={"center"}
          w={{ base: "100%", md: "49%" }}
          mb={"40px"}
        >
          <iframe
            width="85%"
            height="550"
            frameborder="0"
            scrolling="yes"
            marginheight="0"
            marginwidth="0"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=106,%20SNS%20SYNERGY,%20Surat%20-%20Dumas%20Rd,%20near%20CENTRAL%20MALL,%20Surat,%20Gujarat%20395007+(Surties%20)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
            <a href="https://www.gps.ie/">gps trackers</a>
          </iframe>
        </Center>
      </Flex>
    </>
  );
}

export default ContactUs;
