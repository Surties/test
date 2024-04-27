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
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email) {
      postData(email);
      setSubscribed(true);
      setEmail("");
    }
    return;
  };
  const postData = (email) => {
    axios
      .post("https://surtiesserver.onrender.com/email-list", { email })
      .then((response) => {
     
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <Box maxW="md" mx="auto">
      <>
        {subscribed ? (
          <Center color={"black"} fontWeight={"bold"} textAlign={"center"}>
            {" "}
            <Text>Thank you for subscribing!</Text>
          </Center>
        ) : (
          <>
            <Center
              flexDirection={"column"}
              textAlign={"center"}
              color={"black"}
            >
              <Text marginBottom={"10px"} fontWeight={"bold"} fontSize={"18px"}>
                Subscribe to Our Newsletter{" "}
              </Text>
            </Center>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Flex marginTop={"10px"}>
                  <Input
                    color={"black"}
                    border={"1px solid black"}
                    _placeholder={{ color: "black" }}
                    placeholder="Your email address"
                    autoComplete="off"
                    borderRight={"none"}
                    pos={"static"}
                    focusBorderLeft="none"
                    name="email"
                    focusBorderColor="black"
                    borderRightRadius="0"
                    onChange={handleChange}
                  />

                  <Button
                    type="submit"
                    pos={"static"}
                    marginLeft={"-1px"}
                    border={"1px solid black"}
                    borderLeft={"none"}
                    borderLeftRadius="0"
                    color={"black"}
                    _hover={{ color: "#E2E8F0", backgroundColor: "black" }}
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
