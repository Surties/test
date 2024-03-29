import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Button, Badge } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const ImageSlider = ({ slides }) => {
  
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

  return (
    <>
      <Flex
        alignContent={"center"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"10px"}
      >
        <Button
          width={{ base: "10px", md: "auto" }}
          border={"1px solid black"}
          backgroundColor={"transparent"}
          onClick={handlePrev}
          color="black"
          _hover={{
            backgroundColor: "RGBA(0, 0, 0, 0.08)",
            color: "black",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          }}
        >
          <FaArrowLeft />
        </Button>
        <Link to={`/news/id/${slides[currentIndex]._id}`}>
          <Box
            h={{ base: "200px", md: "350px" }}
            color={"white"}
            borderRadius={"12px"}
            backgroundImage={`url(${slides[currentIndex].thumbnail})`}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="100% 100%"
            paddingTop={{ base: "120px", md: "275px" }}
          >
            <Text
              borderBottomLeftRadius={"12px"}
              borderBottomRightRadius={"12px"}
              padding={"20px"}
              fontSize={{ base: "14px", md: "24px" }}
              fontWeight="bold"
              color={"white"}
              backgroundColor={"RGBA(0, 0, 0, 0.64)"}
            >
              {slides[currentIndex].heading.slice(0, 69) + "..."}
            </Text>
          </Box>
        </Link>
        <Button
          width={{ base: "10px", md: "auto" }}
          backgroundColor={"transparent"}
          onClick={handleNext}
          border={"1px solid black"}
          color="black"
          _hover={{
            backgroundColor: "RGBA(0, 0, 0, 0.08)",
            color: "black",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          }}
        >
          <FaArrowRight />
        </Button>
      </Flex>
    </>
  );
};

export default ImageSlider;
