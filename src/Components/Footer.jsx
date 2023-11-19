import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box height={"100%"} bgColor={"rgb(19,26,34)"} p={5}>
        <Heading fontSize={"15px"} color={"white"} textDecoration={"underline"}>Popular Searches</Heading>
        <Text color={"white"}>
          Girls T-Shirts | Sandals | Headphones | Babydolls | Blazers
          For Men | Handbags | Ladies Watches | Bags | Sport Shoes | Reebok Shoes | Puma
          Shoes
        </Text>
        <br />
        <Heading style={{display:"flex",justifyContent:"center"}} fontSize={"15px"} color="white">© 2023 www.unlimited shopping.com. All rights reserved.</Heading>
      </Box>
    </>
  );
};

export default Footer;
