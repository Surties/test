import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { Box, Center, Flex, Grid, Spinner } from "@chakra-ui/react";
import axios from "axios";
import NewsCard from "../Components/NewsCard";
import StickyBox from "react-sticky-box";
import { Helmet } from "react-helmet";
function CatagoryPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const { catagory } = useParams();
  const [totalPages, setTotalPages] = useState(1);
  const fetchData = () => {
    setLoading(true);
    axios
      .get(
        `https://surtiesserver.onrender.com/news?page=${pageNumber}&filter=${catagory}`
      )
      .then((res) => {
        setData(res.data.newsItems);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    setPageNumber(pageNumber + 1);
  };
  useEffect(() => {
    fetchData();
    if (pageNumber != totalPages) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [catagory]);
  return (
    <>
      <Helmet>
        <title>News-{catagory}-Surtie's Digital Media </title>
        <meta
          name={catagory}
          content={`Get news all the news of ${catagory}`}
        />{" "}
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
        />
        <link
          rel="apple-touch-icon"
          href="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
        />
      </Helmet>
      <Box
        display={{ base: "flex", md: "flex" }}
        gap={"2%"}
        flexDirection={{ base: "column", md: "row" }}
        clear={"both"}
      >
        <Box
          backgroundColor={"#E2E8F0"}
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

export default CatagoryPage;
