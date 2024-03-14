// NewsletterSubscription.js
import { LuMailPlus } from "react-icons/lu";
import React, { useState } from "react";
import {
  FormControl,
  Input,
  Button,
  Box,
  Flex,
  Text,
  Center,
} from "@chakra-ui/react";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleChange = (event) => {
    setEmail(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postData(email);
    setSubscribed(true);
    setEmail("");
  };
  const postData = (email) => {
    axios
      .post("https://surtiesserver.onrender.com/email-list", { email })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <Box maxW="md" mx="auto">
      <>
        {subscribed ? (
          <Center color={"white"} fontWeight={"bold"} textAlign={"center"}>
            {" "}
            <Text>Thank you for subscribing!</Text>
          </Center>
        ) : (
          <>
            <Center
              flexDirection={"column"}
              textAlign={"center"}
              color={"white"}
            >
              <Text marginBottom={"20px"} fontWeight={"bold"} fontSize={"24px"}>
                Subscribe to Our Newsletter{" "}
              </Text>
              <Text>
                1. You will get important Updates of Surat on your Email.
                <br />
                2. You will also get Great offers and Coupons of Food, Movies,
                Gamezones, apparels and many More on Your Email.
              </Text>
            </Center>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Flex marginTop={"30px"}>
                  <Input
                    color={"white"}
                    _placeholder={{ color: "white" }}
                    placeholder="Your email address"
                    autoComplete="off"
                    borderRight={"none"}
                    pos={"static"}
                    focusBorderLeft="none"
                    name="email"
                    focusBorderColor="white"
                    borderRightRadius="0"
                    onChange={handleChange}
                  />

                  <Button
                    type="submit"
                    pos={"static"}
                    marginLeft={"-1px"}
                    border={"1px solid #E2E8F0"}
                    borderLeft={"none"}
                    borderLeftRadius="0"
                    color={"white"}
                    _hover={{ color: "#cb404d", backgroundColor: "white" }}
                    variant={"ghost"}
                  >
                    <LuMailPlus fontSize={"20px"} />
                  </Button>
                </Flex>
              </FormControl>
            </form>
          </>
        )}
      </>
    </Box>
  );
};

export default Newsletter;
