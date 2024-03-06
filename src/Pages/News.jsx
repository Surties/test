import React, { useEffect, useState } from "react";
import ImageSlider from "../Components/ImageSlider";
import axios from "axios";
import StickyBox from "react-sticky-box";

import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import CategorizedNews from "../Components/CategorizedNews";
import Sidebar from "../Components/Sidebar";
import { LOGIN_LOADING } from "../Redux/auth/auth.actiontype";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;
const containerStyles = {
  width: "90%",
};

function News() {
  const [slides, setSlides] = useState([{ img: "" }]);
  const [loading, setLoading] = useState(true);
  const [error1, setError] = useState(false);
  const [first, SetFirst] = useState(true);
  const [news, setNews] = useState([{ documents: [] }]);
  const [loading2, setLoading2] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://surtiesserver.onrender.com/slider"
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
          console.log(res.data);
          navigate("/");
        })
        .catch((err) => {});
    } else SetFirst(true);
  };

  useEffect(() => {
    fetchData();
    getNews();
    getUser();
  }, []);
  return (
    <Flex flexDirection={{ base: "column", md: "row" }}>
      <Box backgroundColor={"#cb404d"} width={{ base: "100%", md: "20%" }}>
        <StickyBox offsetTop={20} offsetBottom={20}>
          <Sidebar />
        </StickyBox>
      </Box>
      <Box w={{ base: "100%", md: "76%" }}>
        <Flex mt={"30px"} justifyContent={"center"}>
          <div style={containerStyles}>
            {loading ? (
              <Center mt={"20px"}>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="#cb404d"
                  size="xl"
                />
              </Center>
            ) : (
              <ImageSlider slides={slides} />
            )}
          </div>
        </Flex>
        {!loading ? (
          !loading2 ? (
            <Center mt={"20px"}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#cb404d"
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
  );
}

export default News;
