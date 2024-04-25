import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function NewsCard({ data }) {
  console.log(data);
  return (
    <Link to={`/news/id/${data._id}`}>
      {" "}
      <Flex
        boxShadow={
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"
        }
        overflow={"hidden"}
        alignItems={"center"}
        flexDirection={"column"}
        borderRadius={"6px"}
        h={"350px"}
        backgroundColor={"#E2E8F0"}
      >
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box overflow={"hidden"} h={"160px"}>
            <img src={data.thumbnail} alt="" />
          </Box>
          <Box p={"10px"}>
            <Text
              marginTop={{ base: "-30", md: 0 }}
              fontWeight={{ base: "600", md: "700" }}
              textTransform={"capitalize"}
              fontSize={{ base: "14px", md: "18px" }}
            >
              {data.heading.length <= 40
                ? data.heading
                : data.heading.slice(0, 40) + "..."}
            </Text>
            <Text fontSize={{ base: "12px", md: "14px" }}>
              {!data.article.length <= 200 ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.article.slice(0, 200) + " ",
                  }}
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: data.article }} />
              )}
              {<b style={{ color: "#d91e26" }}>Read more</b>}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Link>
  );
}

export default NewsCard;
