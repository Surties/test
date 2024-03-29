import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

function ResetPage() {
  const [email, setEmail] = useState("");
  const handleClick = () => {
    console.log("last");
    axios
      .post("http://localhost:8080/auth/reset-pass", { email })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Center
      alignItems={{ base: "flex-start", md: "center" }}
      p={8}
      h={"100vh"}
      backgroundColor={"#d91e26"}
    >
      <Center
        w={"400px"}
        bg={useColorModeValue("gray.50", "gray.800")}
        borderRadius={"12px"}
        flexDirection={"column"}
      >
        <Center
          p={6}
          alignItems={{ base: "inline", md: "center" }}
          justify={"center"}
        >
          <FormControl w={"300px"} pos={"static"} id="email" isRequired>
            <FormLabel color={"black"}>Email address</FormLabel>
            <Input
              _placeholder={{ color: "black" }}
              autoComplete="off"
              pos={"static"}
              required
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              focusBorderColor="#d91e26"
              placeholder="Email"
              type="email"
            />
          </FormControl>
        </Center>
        <Center p={6} bg={useColorModeValue("gray.50", "gray.800")}>
          <Button
            onClick={handleClick}
            color={"#d91e26"}
            _hover={{ backgroundColor: "#d91e26", color: "white" }}
          >
            Reset Password
          </Button>
        </Center>
      </Center>
    </Center>
  );
}

export default ResetPage;
