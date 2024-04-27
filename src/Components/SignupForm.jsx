import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,

  Stack,
  Button,
  Text,
  useColorModeValue,
  FormHelperText,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";


import { useDispatch } from "react-redux";

import axios from "axios";
import {
  SIGNUP_ERROR,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
} from "../Redux/auth/auth.actiontype";
const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    pass: "",
    name: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleChange = (event) => {
    const { value, name } = event.target;

    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
    if (name === "firstName") {
      setNameError(value ? "" : "first name is required");
    }

    if (name === "lastName") {
      setAgeError(value ? "" : "Last name is required");
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(value) ? "" : "Invalid email format");
    }

    if (name === "pass") {
      setPasswordError(
        value.length >= 8 ? "" : "Password must be at least 8 characters"
      );
    }
  };

  const postData = async () => {
    if (
      passwordError === "" &&
      emailError === "" &&
      nameError === "" &&
      ageError === ""
    ) {
      signup(contactInfo);
    } else {
      setMessage("All input field is required");
    }
  };
  const signup = async (user) => {
    setLoading(true);
    try {
      dispatch({
        type: SIGNUP_LOADING,
      });
      const { data } = await axios.post(
        "https://surtiesserver.onrender.com/auth/signup",
        user
      );
      setLoading(false);
      setMessage(data.msg);
      navigate("/login");
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      setLoading(false);
      setMessage(error.response.data.error);
      dispatch({
        type: SIGNUP_ERROR,
        payload: error.response.data.error,
      });
    }
  };

  return (
    <Flex
      minH={{ base: "0vh", md: "30vh", lg: "100vh" }}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl pos={"static"} id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                onChange={handleChange}
                pos={"static"}
                focusBorderColor={ageError ? "#d91e26" : "green.400"}
                name="name"
                type="text"
              />
              <FormHelperText color="#d91e26">{ageError}</FormHelperText>
            </FormControl>

            <FormControl pos={"static"} id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                pos={"static"}
                focusBorderColor={emailError ? "#d91e26" : "green.400"}
                onChange={handleChange}
                name="email"
                type="email"
              />
              <FormHelperText color="#d91e26">{emailError}</FormHelperText>
            </FormControl>

            <FormControl pos={"static"} id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Flex>
                <Input
                  borderRight={"none"}
                  pos={"static"}
                  focusBorderColor={passwordError ? "#d91e26" : "green.400"}
                  focusBorderLeft="none"
                  name="pass"
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
              <FormHelperText color="#d91e26">{passwordError}</FormHelperText>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                isDisabled={
                  !!(nameError || ageError || emailError || passwordError) ||
                  loading
                }
                isLoading={loading}
                pos={"static"}
                loadingText="Submitting"
                size="lg"
                bg={"#d91e26"}
                color={"white"}
                _hover={{
                  bg: "yellow",
                  color: "#d91e26",
                }}
                onClick={postData}
              >
                Sign up
              </Button>
              <Text color={"red"} textAlign={"center"}>
                {message}
              </Text>
              {/* <OAuth /> */}
            </Stack>

            <Box display={"flex"} gap={"6px"}>
              <Text>Already Have Account </Text>
              <Link to="/login">
                <Text color={"#d91e26"}>
                  <b>Login</b>
                </Text>
              </Link>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default SignupForm;
