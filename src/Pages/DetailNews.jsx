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

function DetailNews() {
  const { id } = useParams();
  const [responseData, setResponseData] = useState([]);
  const [articleData, setArticleData] = useState({ imgs: [] });
  const [loading, setLoading] = useState(false);
  const [error1, setError] = useState(false);
  const fetchData2 = () => {
    setLoading(true);
    axios
      .get(`https://surtiesserver.onrender.com/news/${id}`)
      .then((response) => {
        setArticleData(response.data);
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
  useEffect(() => {
    fetchData();
    patchData();
    fetchData2();
  }, [id]);
  return (
    <div>
      <Helmet>
        <title>{articleData.heading}</title>
        <meta name="description" content={articleData.subHeading} />

        <meta
          property="og:url"
          content="http://surties.in/news/id/65effbe93557007c2c8a3079"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={articleData.heading} />
        <meta property="og:description" content={articleData.article} />
        <meta property="og:image" content={articleData.thumbnail} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="surties.in" />
        <meta
          property="twitter:url"
          content={`http://surties.in/news/id/${articleData._id}`}
        />
        <meta name="twitter:title" content={articleData.heading} />
        <meta name="twitter:description" content={articleData.heading} />
        <meta name="twitter:image" content={articleData.thumbnail} />
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
          <Box backgroundColor={"#d91e26"} width={{ base: "100%", md: "20%" }}>
            <StickyBox offsetTop={20} offsetBottom={20}>
              <Sidebar />
            </StickyBox>
          </Box>
          <Flex
            w={{ base: "100%", md: "50%" }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Box>
              <DetailNewsComponent articleData={articleData} para={id} />
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
                  You Might Also Enjoy{" "}
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
