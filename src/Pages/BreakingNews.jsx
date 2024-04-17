import React, { useEffect, useState } from "react";

import Sidebar from "../Components/Sidebar";
import { Box, Flex, Grid, Spinner } from "@chakra-ui/react";
import axios from "axios";
import NewsCard from "../Components/NewsCard";
import StickyBox from "react-sticky-box";

function BreakingNews() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`https://surtiesserver.onrender.com/news/breaking-news`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {/* <Helmet>
        <title>News-top news-Surtie's Digital Media </title>

        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
        />
        <link
          rel="apple-touch-icon"
          href="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
        />
      </Helmet> */}
      <Box
        display={{ base: "flex", md: "flex" }}
        gap={"2%"}
        flexDirection={{ base: "column", md: "row" }}
        clear={"both"}
      >
        <Box
          backgroundColor={"#d91e26"}
          mb={"20px"}
          width={{ base: "100%", md: "20%" }}
        >
          <StickyBox offsetTop={20} offsetBottom={20}>
            <Sidebar />
          </StickyBox>
        </Box>
        {loading ? (
          <>
            <Flex
              w={{ base: "100%", md: "75%" }}
              justifyContent={"center"}
              mt={"20px"}
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#d91e26"
                size="xl"
              />
            </Flex>
          </>
        ) : (
          <Grid
            templateColumns={{
              base: "repeat(2,1fr)",
              md: "repeat(4, 1fr)",
              lg: '"repeat(4, 1fr)',
            }}
            gap={{ base: "15px", md: "5px" }}
            w={{ base: "100%", md: "75%" }}
            justifyContent={"center"}
          >
            {data.map((el) => {
              return <NewsCard data={el} key={el._id} />;
            })}
          </Grid>
        )}
      </Box>
    </>
  );
}

export default BreakingNews;