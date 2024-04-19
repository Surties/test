import React, { useEffect, useState } from "react";
import DetailNewsComponent from "../Components/DetailNewsComponent";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import Sidebar from "../Components/Sidebar";
import StickyBox from "react-sticky-box";
import ShareOn from "../Components/ShareOn";
import axios from "axios";
import RecommendNews from "../Components/RecommendedNews";
import CategorizedNews from "../Components/CategorizedNews";

function DetailNews() {
  const { id } = useParams();
  const [responseData, setResponseData] = useState([]);
  const [articleData, setArticleData] = useState({ imgs: [] });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [error1, setError] = useState(false);
  const fetchData2 = () => {
    setLoading(true);
    axios
      .get(`https://surtiesserver.onrender.com/news/${id}`)
      .then((response) => {
        setArticleData(response.data);
        setCategory(response.data.catagory);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        setError(!error1);
      });
  };
  const patchData = () => {
    setLoading(true);
    axios
      .patch(`https://surtiesserver.onrender.com/news/topweek/${id}`)
      .then((response) => {})
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://surtiesserver.onrender.com/news/topweek"
      );
      setResponseData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData3 = async () => {
    try {
      const response = await axios.get(
        `https://surtiesserver.onrender.com/news?filter=${category}`
      );
      setData(response.data.newsItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    patchData();
    fetchData2();
    fetchData3();
  }, [id]);
  return (
    <div>
      <Helmet>
        <title>{articleData.heading}</title>
        <meta
          name="news_keywords"
          content={articleData.heading}
          itemprop="keywords"
        />
        <meta
          name="description"
          content={articleData.article}
          itemprop="description"
        />
        <meta name="section" content="surat" itemprop="articleSection" />
        <meta
          name="url"
          content={`https://surties.in/news/id/${articleData._id}`}
          itemprop="url"
        />
        <link href={articleData.heading} rel="amphtml" />
        <link href="https://surties.in" rel="publisher" />

        <meta name="keywords" content={articleData.heading} />
        <meta name="robots" content="max-image-preview:large" />
        <meta property="og:title" content={articleData.subHeading} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={articleData.thumbnail} />
        <meta property="og:image:secure_url" content={articleData.thumbnail} />
        <meta property="og:image:width" content="630" />
        <meta property="og:image:height" content="473" />
        <meta
          property="og:url"
          content={`https://surties.in/news/id/${articleData._id}`}
        />
        <meta property="og:site_name" content="surties.in" />
        <meta property="og:description" content={articleData.heading} />
        <meta property="fb:app_id" content="213741912058651" />

        <meta property="al:android:app_name" content="surties" />

        <meta property="al:ios:app_store_id" content="377869410" />
        <meta property="al:ios:app_name" content="surties" />

        <meta property="al:ipad:app_store_id" content="390847563" />
        <meta property="al:ipad:app_name" content="Surties" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@surties" />
        <meta name="twitter:url" content={articleData.heading} />
        <meta name="twitter:title" content={articleData.heading} />
        <meta name="twitter:description" content={articleData.heading} />
        <meta name="twitter:image" content={articleData.thumbnail} />
        <meta name="twitter:app:url:iphone" content="" />
        <meta name="twitter:app:url:googleplay" content="" />
        <meta property="snapchat:sticker" content={articleData.thumbnail} />
        <link rel="preload" as="image" href={articleData.thumbnail} />
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta property="taboola-category" content="news" />

        <meta property="taboola:title" content={articleData.heading} />

        <link rel="canonical" href={articleData.heading} />
        <link
          itemprop="mainEntityOfPage"
          href={`https://surties.in/news/id/${articleData._id}`}
        />
        <link
          rel="apple-touch-icon"
          href="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
        />
      </Helmet>
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
        <Flex flexDirection={{ base: "column", md: "row" }}>
          <Box backgroundColor={"#E2E8F0"} width={{ base: "100%", md: "20%" }}>
            <StickyBox offsetTop={20} offsetBottom={20}>
              <Sidebar />
            </StickyBox>
          </Box>
          <Flex
            w={{ base: "100%", md: "50%" }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Box>
              <DetailNewsComponent
                articleData={articleData}
                category={category}
                data={data}
              />
            </Box>
          </Flex>

          <Box backgroundColor="#ffffff" width={{ base: "100%", md: "30%" }}>
            <StickyBox offsetTop={20} offsetBottom={20}>
              <ShareOn />
              <Box p={"10px"}>
                <Text
                  color={"#d91e26"}
                  fontWeight={"bold"}
                  marginBottom={"15px"}
                >
                  You Might Also Instersted
                </Text>
                <RecommendNews data={responseData} />
              </Box>
            </StickyBox>
          </Box>
        </Flex>
      )}
    </div>
  );
}

export default DetailNews;
