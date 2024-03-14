import { Box, Center, Spinner, Text } from "@chakra-ui/react";

import { InstagramEmbed } from "react-social-media-embed";

function DetailNewsComponent({ para, articleData }) {
  return (
    <Center flexDirection={"column"} p={5}>
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
      <Center marginTop={"40px"} w={{ base: "100%", md: "80%" }}>
        <InstagramEmbed url={articleData.instaLink || ""} width={"100%"} />
      </Center>
    </Center>
  );
}

export default DetailNewsComponent;
