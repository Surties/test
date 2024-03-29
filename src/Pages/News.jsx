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
import NewsLetter from "../Components/NewsLetter";
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
  const data = {
    name: "Surtie's-surat no.1  digital media",
    short_name: "Surtie's",
    description:
      "Surtie's is a digital news media house based in surat which provide news about surat city in gurati and English",
    icons: [
      {
        src: "https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed",
        type: "image/png",
      },
      {
        src: "https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed",
        type: "image/png",
      },
    ],
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#d91e26",
  };

  return (
    <>
      <Helmet>
        <title>Surtie's Digital Media</title>
        <meta name="title" content="Surtie's Digital Media" />
        <meta
          name="description"
          content="Surties is a digital news media house based in Surat providing news in Gujarati and English."
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://surties.in/news/id/660310b481d2b4376b8e0656"
        />
        <meta property="og:title" content="Surtie's Digital Media" />
        <meta
          property="og:description"
          content="Surties is a digital news media house based in Surat providing news in Gujarati and English."
        />
        <meta
          property="og:image"
          content="https://metatags.io/images/meta-tags.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://surties.in/news/id/660310b481d2b4376b8e0656"
        />
        <meta property="twitter:title" content="Surtie's Digital Media" />
        <meta
          property="twitter:description"
          content="Surties is a digital news media house based in Surat providing news in Gujarati and English."
        />
      </Helmet>
      <Flex flexDirection={{ base: "column", md: "row" }}>
        <Box backgroundColor={"#d91e26"} width={{ base: "100%", md: "20%" }}>
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
