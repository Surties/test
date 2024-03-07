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
  const { catagory } = useParams();

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`https://surtiesserver.onrender.com/news?filter=${catagory}`)
      .then((res) => {
        setData(res.data.newsItems);
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
        />
      </Helmet>
      <Box
        display={{ base: "flex", md: "flex" }}
        gap={"2%"}
        flexDirection={{ base: "column", md: "row" }}
        clear={"both"}
      >
        <Box
          backgroundColor={"#cb404d"}
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
                color="#cb404d"
                size="xl"
              />
            </Flex>
          </>
        ) : (
          <Grid
            templateColumns={{
              base: "repeat(1,1fr)",
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
