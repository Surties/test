import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import { CiShare2 } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookShareButton,
  InstapaperShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
function ShareOn() {
  const shareUrl = window.location.href;

  return (
    <Box >
      <Center marginTop={"20px"} fontSize={"18px"} gap={"4%"}>
        <CiShare2 fontSize={"22px"} />
        <Text>SHARE ON</Text>
      </Center>
      <Center padding={"20px 0px"} gap={"5%"}>
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <InstapaperShareButton url={shareUrl}>
          <FaInstagram color="purple" size={32} round={true} />
        </InstapaperShareButton>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </Center>
    </Box>
  );
}

export default ShareOn;
