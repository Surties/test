import { Box, Center, Flex, Text, useDisclosure } from "@chakra-ui/react";

import {
  FacebookEmbed,
  InstagramEmbed,
  XEmbed,
  YouTubeEmbed,
} from "react-social-media-embed";

import { useRef } from "react";
import ImgGalleryModel from "./ImgGalleryModel";
import CategorizedNews2 from "./CategortiesNews2";

function DetailNewsComponent({ articleData, category, data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const handleClick = () => {
    onOpen();
  };
  return (
    <Center flexDirection={"column"} p={5}>
      <Text
        marginTop={"10px"}
        fontSize="28px"
        lineHeight={"29px"}
        fontWeight="bold"
        color={"#d91e26"}
        marginBottom={"10px"}
      >
        {articleData.heading}
      </Text>
      {console.log(articleData)}
      <ImgGalleryModel
        finalRef={finalRef}
        isOpen={isOpen}
        onOpen={onOpen}
        data={[
          ...articleData.imgs.map((imgObj) => imgObj.img),
          articleData.thumbnail,
        ]}
        onClose={onClose}
      />
      <Center
        alignItems={"flex-end"}
        onClick={handleClick}
        overflow={"hidden"}
        w={{ base: "360px", md: "600px" }}
        h={{ base: "220px", md: "400px" }}
      >
        <img src={articleData.thumbnail} alt="Thumbnail" mt={4} mb={4} />
      </Center>
      <Text marginTop={"10px"} fontSize="md" color="gray.500">
        Author: {articleData.author} | Date:{articleData.date}
      </Text>
      <Text
        marginTop={{ base: "10px", md: "10px" }}
        lineHeight={"20px"}
        fontSize="xl"
        color="gray.600"
      >
        {articleData.subHeading}
      </Text>
      <Text marginTop={"10px"} fontSize="md" whiteSpace="pre-line">
        <div dangerouslySetInnerHTML={{ __html: articleData.article }} />
      </Text>
      <Center gap={"10px"} flexDirection={"column"}>
        {articleData.imgs.map((el, index) => {
          return (
            <Box overflow={"hidden"} w={{ base: "360px", md: "600px" }}>
              {" "}
              <img
                onClick={handleClick}
                key={el.img + index}
                alt={index}
                src={el.img}
              />
              <Text marginTop={"10px"} fontSize="md" whiteSpace="pre-line">
                <div dangerouslySetInnerHTML={{ __html: el.content }} />
              </Text>
            </Box>
          );
        })}
      </Center>
      <Center
        alignItems={"center"}
        flexDirection={"column"}
        marginTop={"40px"}
        w={{ base: "100%", md: "80%" }}
      >
        {articleData.instaLink ? (
          <InstagramEmbed url={articleData.instaLink} width={328} />
        ) : (
          ""
        )}
        {articleData.twitterLink ? (
          <>
            <XEmbed url={articleData.twitterLink} width={325} />
          </>
        ) : (
          ""
        )}
        {articleData.youtubeLink ? (
          <YouTubeEmbed
            url={articleData.youtubeLink}
            width={425}
            height={320}
          />
        ) : (
          ""
        )}
        {articleData.facebookLink ? (
          <FacebookEmbed url={articleData.facebookLink} width={325} />
        ) : (
          ""
        )}
        <Flex>
          <CategorizedNews2 cata={category} catagory={category} data={data} />
        </Flex>
      </Center>
    </Center>
  );
}

export default DetailNewsComponent;
