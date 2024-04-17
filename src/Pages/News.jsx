import React, { useEffect, useState } from "react";
import ImageSlider from "../Components/ImageSlider";
import axios from "axios";
import StickyBox from "react-sticky-box";

import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import CategorizedNews from "../Components/CategorizedNews";
import Sidebar from "../Components/Sidebar";
import { LOGIN_LOADING } from "../Redux/auth/auth.actiontype";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import BreakingNews from "../Components/BreakingNews";
axios.defaults.withCredentials = true;

function News() {
  const [slides, setSlides] = useState([{ img: "" }]);
  const [loading, setLoading] = useState(true);
  const [error1, setError] = useState(false);
  const [first, SetFirst] = useState(true);
  const [breakingNews, setBreakingNews] = useState([
    { thumbnail: "", heading: "" },
    { thumbnail: "", heading: "" },
  ]);
  const [news, setNews] = useState([{ documents: [] }]);
  const [loading2, setLoading2] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://surtiesserver.onrender.com/news/breaking-news"
      );
      setSlides(response.data);
    } catch (error) {
      setError(!!error1);
    } finally {
      setLoading(false);
    }
  };
  const getNews = () => {
    setLoading2(true);
    axios
      .get("https://surtiesserver.onrender.com/news/grouped")
      .then((response) => {
        setNews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading2(false);
        console.error("Error:", error.message);
      });
  };

  const getUser = () => {
    if (first) {
      dispatch({
        type: LOGIN_LOADING,
      });
      axios
        .get("https://surtiesserver.onrender.com/auth/signin-token", {
          withCredentials: true,
        })
        .then((res) => {
          SetFirst(false);

          navigate("/");
        })
        .catch((err) => {});
    } else SetFirst(true);
  };
  const breakingNewsFun = () => {
    axios
      .get("https://surtiesserver.onrender.com/news/breaking-news")
      .then((res) => {
        console.log(res.data);
        setBreakingNews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
    getNews();
    getUser();
    breakingNewsFun();
  }, []);
  return (
    <>
      <Helmet>
        <title>Surties Surat's No. 1 Digital channel</title>
        <meta name="title" content="Surties Surat's No. 1 Digital channel" />
        <meta
          name="description"
          content="Surtie's is a digital news media house based in surat which provide news about surat city in gurati and English"
        />
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
        />
        <link
          rel="apple-touch-icon"
          href="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://surtie.in" />
        <meta
          property="og:title"
          content="Surties Surat's No. 1 Digital channel "
        />
        <meta
          property="og:description"
          content="Surtie's is a digital news media house based in surat which provide news about surat city in gurati and English"
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
        />
        <meta
          property="twitter:title"
          content="Surties Surat's No. 1 Digital channel "
        />
        <meta
          property="twitter:description"
          content="Surtie's is a digital news media house based in surat which provide news about surat city in gurati and English"
        />
        <meta
          property="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
        />
      </Helmet>{" "}
      <Flex flexDirection={{ base: "column", md: "row" }}>
        <Box backgroundColor={"#E2E8F0"} width={{ base: "100%", md: "20%" }}>
          <StickyBox offsetTop={20} offsetBottom={20}>
            <Sidebar />
          </StickyBox>
        </Box>
        <Box w={{ base: "100%", md: "76%" }}>
          <Flex marginTop={"20px"} justifyContent={"center"}>
            <Box>
              {loading ? (
                <Center mt={"20px"}>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="#d91e26"
                    size="xl"
                  />
                </Center>
              ) : (
                <ImageSlider slides={slides} />
              )}
            </Box>
          </Flex>
          <>
            {loading ? (
              <></>
            ) : (
              <>
                <Box
                  marginLeft={"5%"}
                  marginTop={"20px"}
                  marginBottom={"-30px"}
                  fontWeight={"bold"}
                  color={"#d91e26"}
                >
                  <Text>Top News</Text>
                </Box>
                <BreakingNews data={breakingNews} />
              </>
            )}
          </>
          {!loading ? (
            !loading2 ? (
              <Center mt={"20px"}>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="#d91e26"
                  size="xl"
                />
              </Center>
            ) : (
              <Box ml={"20px"}>
                {news.map((el, index) => {
                  return (
                    <CategorizedNews
                      key={index}
                      catagory={el.category}
                      data={el.documents}
                      cata={el.category}
                    />
                  );
                })}
              </Box>
            )
          ) : (
            ""
          )}
        </Box>
      </Flex>
    </>
  );
}

export default News;
