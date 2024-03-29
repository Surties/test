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

export default CatagoryPage;
