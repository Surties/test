import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { Box, Button, Center, Flex, Grid, Spinner } from "@chakra-ui/react";
import axios from "axios";
import NewsCard from "../Components/NewsCard";
import StickyBox from "react-sticky-box";
import { Helmet } from "react-helmet";
function CatagoryPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const { catagory } = useParams();

  
   const [currentPage, setcurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const handleClick = () => {
     if (currentPage < totalPages) {
       fetchData(currentPage + 1);
       setcurrentPage(currentPage + 1);
     }
   };
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
  
  useEffect(() => {
    fetchData();
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
          <>
            {" "}
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
            {loading ? (
              ""
            ) : (
              <>
                {" "}
                {totalPages == currentPage ? (
                  ""
                ) : (
                  <Flex
                    justifyContent={"center"}
                    p={"20px"}
                    alignItems={"center"}
                    mt={"3%"}
                    mr={"2.4%"}
                  >
                    <Box
                      h={"0.5px"}
                      w={"30%"}
                      border={"1px solid #718096 "}
                      opacity={"0.5"}
                    ></Box>
                    <Button
                      disabled={currentPage == totalPages}
                      height={"30px"}
                      fontSize={"12px"}
                      padding={"10px 18px"}
                      backgroundColor={"white"}
                      color={"black"}
                      borderRadius={"40px"}
                      border={"1px solid grey"}
                      _hover={{
                        color: "white",
                        backgroundColor: "#d91e26",
                        border: "1px solid #d91e26",
                      }}
                      onClick={handleClick}
                    >
                      View More
                    </Button>
                    <Box
                      h={"0.5px"}
                      w={"30%"}
                      border={"1px solid #718096 "}
                      opacity={"0.5"}
                    ></Box>
                  </Flex>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
}

export default CatagoryPage;
