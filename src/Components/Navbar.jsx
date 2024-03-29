import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";

import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LOGOUT_SUCCESS } from "../Redux/auth/auth.actiontype";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { user, auth, role, profile } = useSelector((store) => {
    return store.auth;
  });
  const news = useSelector((store) => {
    return store;
  });
  console.log(news);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log("last");
    try {
      const response = await axios.get(
        "https://surtiesserver.onrender.com/auth/logout"
      );

      dispatch({ type: LOGOUT_SUCCESS });
      console.log(response.data);
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };
  return (
    <>
      <Box>
        <Flex
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 2 }}
          borderStyle={"solid"}
          backgroundColor={"#d91e26"}
          borderBottom={"1px solid lightgrey"}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              _hover={{ backgroundColor: "transparent" }}
              icon={
                isOpen ? (
                  <CloseIcon color={"white"} w={3} h={3} />
                ) : (
                  <HamburgerIcon color={"white"} w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex
            ml={{ base: "0px", md: "40px" }}
            flex={{ base: 1 }}
            justify={{ base: "center", md: "start" }}
            gap={3}
          >
            <Text
              textAlign={useBreakpointValue({
                base: "center",
                md: "left",
              })}
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
            >
              <Link to="/">
                <Img
                  padding={"10px 0"}
                  width={"140px"}
                  src="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Layer%201%20copy%202.png?alt=media&token=51af1e21-b9ef-430a-97e8-0df099d2e048"
                />
              </Link>
            </Text>

            <Flex
              display={{ base: "none", md: "flex" }}
              alignItems={"center"}
              gap={"15px"}
              ml={10}
            >
              <Link to={"/news/catagory/top"}>
                <Text fontWeight={"700"} color={"white"}>
                  Top
                </Text>
              </Link>
              <Link to={"/news/catagory/latest"}>
                <Text fontWeight={"700"} color={"white"}>
                  Latest
                </Text>
              </Link>

              <Link to={"/about-us"}>
                <Text fontWeight={"700"} color={"white"}>
                  About
                </Text>
              </Link>
              <Link to={"/contact-us"}>
                <Text fontWeight={"700"} color={"white"}>
                  Contact
                </Text>
              </Link>
              <Link to={"/career"}>
                <Text fontWeight={"700"} color={"white"}>
                  Career
                </Text>
              </Link>
            </Flex>
          </Flex>

          <Stack
            ml={10}
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={{ base: 0, md: 6 }}
            pr={{ base: "0px", md: "60px" }}
          >
            <Box display="flex" gap={{ base: 0, md: 3 }}></Box>

            <Menu>
              <MenuButton color="white">
                <Flex
                  w={{ base: "auto", md: "260px" }}
                  gap={"5px"}
                  alignItems={"center"}
                >
                  <Text display={{ base: "none", md: "inline" }}>
                    {user ? user + "," : ""}
                  </Text>
                  <FaRegUserCircle
                    style={{ marginRight: "6%" }}
                    fontSize={"26px"}
                  />
                  <ChevronDownIcon />
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem>
                  {!auth ? (
                    <Link style={{ width: "100%" }} to="/admin">
                      <Box display="flex" gap={2}>
                        Login
                      </Box>
                    </Link>
                  ) : (
                    <Box w={"100%"} onClick={handleLogout}>
                      {" "}
                      <Text>Logout</Text>
                    </Box>
                  )}
                </MenuItem>
                {role == "admin" || role == "newsEditor" ? (
                  <MenuItem>
                    <Link to={"/admin"}>{role}</Link>
                  </MenuItem>
                ) : (
                  ""
                )}
                {auth ? (
                  <MenuItem>
                    <Link style={{ width: "100%" }} to={"/profile"}>
                      Profile
                    </Link>
                  </MenuItem>
                ) : (
                  ""
                )}
              </MenuList>
            </Menu>
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
      <Box
        w="100%"
        borderBottom="1px solid lightgrey"
        display={{ base: "none", md: "flex" }}
      ></Box>
    </>
  );
}

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue("white", "gray.800")} p={4}>
      <Box
        flexDirection={"column"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Box>
    </Stack>
  );
};

const MobileNavItem = ({ label, href }) => {
  return (
    <Stack>
      <Link to={href}>
        <Flex
          py={2}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Text fontWeight={600} color={"#d91e26"}>
            {label}
          </Text>
        </Flex>
      </Link>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Top",
    href: "/news/catagory/top",
  },
  {
    label: "Latest",
    href: "/news/catagory/latest",
  },

  {
    label: "About",
    href: "/about-us",
  },
  {
    label: "Contact",
    href: "/contact-us",
  },
  {
    label: "Career",
    href: "/career",
  },
];
