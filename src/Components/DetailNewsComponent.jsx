import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function DetailNewsComponent({ para }) {
  const [articleData, setArticleData] = useState({ imgs: [] });
  const [loading, setLoading] = useState(false);
  const [error1, setError] = useState(false);
  const fetchData = () => {
    setLoading(true);
    axios
      .get(`https://surtiesserver.onrender.com/news/${para}`)
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
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
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
        <Box p={5}>
          <Center>
            <img src={articleData.thumbnail} alt="Thumbnail" mt={4} mb={4} />
          </Center>

          <Text fontSize="4xl" fontWeight="bold">
            {articleData.heading}
          </Text>
          <Text fontSize="xl" color="gray.500">
            {articleData.subHeading}
          </Text>
          <Text fontSize="md" color="gray.500">
            Author: {articleData.author} | Date:{articleData.date}
          </Text>

          <Text fontSize="xl" fontWeight="bold">
            Article
          </Text>
          <Text fontSize="md" whiteSpace="pre-line">
            {articleData.article}
          </Text>

          <Text fontSize="xl" fontWeight="bold" mt={4}>
            Image Gallery
          </Text>
          {articleData.imgs.map((img, index) => {
            return <img key={img + index} alt={index} src={img} />;
          })}
        </Box>
      )}
    </div>
  );
}

export default DetailNewsComponent;
