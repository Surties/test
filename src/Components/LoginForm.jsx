import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  Text,
  Center,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
// import OAuth from "./OAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from "../Redux/auth/auth.actiontype";
import axios from "axios";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message1 } = useSelector((store) => {
    return store.auth;
  });
  const { auth } = useSelector((store) => {
    return store.auth;
  });
  const [Info, setInfo] = useState({
    email: "",
    pass: "12345",
  });
  const handleChange = (event) => {
    setInfo({
      ...Info,
      [event.target.name]: event.target.value,
    });

    if (event.target.name === "pass") {
      setIsValidPassword(event.target.value.length >= 8);
    }
    if (event.target.name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValidEmail(emailRegex.test(event.target.value));
    }
  };
  const submit = async () => {
    setLoading(true);
    if ((isValidEmail, isValidPassword)) {
      await login();
    }
  };
  const login = async () => {
    try {
      dispatch({
        type: LOGIN_LOADING,
      });
      const res = await axios.post(
        "https://surtiesserver.onrender.com/auth/signin",
        Info
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
     
      setLoading(false);
      if (res.data.role === "admin" && "newsEditor") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth]);
  return (
    <Flex
      minH={{ base: "0vh", md: "30vh", lg: "100vh" }}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack w={"500px"} spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl pos={"static"} id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                autoComplete="off"
                pos={"static"}
                required
                name="email"
                onChange={handleChange}
                focusBorderColor={isValidEmail ? "green.400" : "#d91e26"}
                placeholder="Email"
                type="email"
              />
            </FormControl>
            <FormControl pos={"static"} id="password" isRequired>
              <FormLabel>Password</FormLabel>

              <Flex>
                <Input
                  autoComplete="off"
                  borderRight={"none"}
                  pos={"static"}
                  focusBorderLeft="none"
                  name="pass"
                  focusBorderColor={isValidPassword ? "green.400" : "#d91e26"}
                  borderRightRadius="0"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                />

                <Button
                  pos={"static"}
                  marginLeft={"-1px"}
                  border={"1px solid #E2E8F0"}
                  borderLeft={"none"}
                  borderLeftRadius="0"
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? (
                    <ViewIcon color={"#d91e26"} />
                  ) : (
                    <ViewOffIcon color={"#d91e26"} />
                  )}
                </Button>
              </Flex>
            </FormControl>
            {false ? (
              <Center>
                <Text color={"red"}>{""}</Text>
              </Center>
            ) : null}
            <Stack spacing={10}>
              <Button
                isLoading={loading}
                isDisabled={!isValidEmail || !isValidPassword}
                onClick={submit}
                loadingText={"signin..."}
                pos={"static"}
                bg={"#d91e26"}
                color={"white"}
                _hover={{
                  bg: "yellow",
                  color: "#d91e26",
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Text textAlign={"center"} color={"red"}>
              {message1}{" "}
            </Text>
            <Box display={"flex"} gap={"6px"}>
              <Text>Don't Have Account </Text>
              <Link to="/signup">
                <Text color={"#d91e26"}>
                  {" "}
                  <b>Create One</b>
                </Text>
              </Link>
            </Box>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Link to={"/reset-pass"}>
                <Text color={"#d91e26"}>Forgot password?</Text>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
