import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Button, Badge } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const ImageSlider = ({ slides }) => {
  console.log(slides);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);
  const slideStyles = {
    width: "100%",
    paddingTop: "30%",
    display: "flex",
    color: "white",
    borderRadius: "12px",
  };

  const slideStylesWithBackground = {
    ...slideStyles,
    backgroundImage: `url(${
      slides ? slides[currentIndex].thumbnail : "https://placehold.co/600x400"
    })`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Link to={`/news/id/${slides[currentIndex]._id}`}>
      <Badge w={"120px"} ml="1" fontSize="0.8em" colorScheme="red">
        Breaking News
      </Badge>
      <Box style={slideStylesWithBackground}>
        <Flex
          height={"80%"}
          justifyContent={"space-between"}
          m={"0px 20px"}
          alignItems={"center"}
        >
          <Button
            border={"1px solid #FAF5FF"}
            backgroundColor={"transparent"}
            onClick={handlePrev}
            color="#FAF5FF"
            _hover={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              color: "black",
              border: "1px solid rgba(255, 255, 255, 0.4)",
            }}
          >
            <FaArrowLeft />
          </Button>
          <Button
            backgroundColor={"transparent"}
            onClick={handleNext}
            border={"1px solid #FAF5FF"}
            color="#FAF5FF"
            _hover={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              color: "black",
              border: "1px solid rgba(255, 255, 255, 0.4)",
            }}
          >
            <FaArrowRight />
          </Button>
        </Flex>
        <Text padding={"20px"} fontSize="3xl" fontWeight="bold">
          {slides[currentIndex].heading}
        </Text>
      </Box>
    </Link>
  );
};

export default ImageSlider;
