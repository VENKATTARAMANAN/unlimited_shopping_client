import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const [category, setCategory] = useState(" ");
const navigate=useNavigate();
  useEffect(() => {
      if (category !== " ") {
        navigate(`/category-search/${category}`)   
      }
  }, [category]);

  return (
    <>
      <Box
        height={"40px"}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgb(35,47,62)",
        }}
      >
        <HStack spacing={5} color={"white"} ml={"20px"} cursor={"pointer"}>
          <Text onClick={() => setCategory("mobiles")}>Mobiles</Text>
          <Text onClick={() => setCategory("laptops")}>Laptops</Text>
          <Text onClick={() => setCategory("shoes")}>Shoes</Text>
          <Text onClick={() => setCategory("watches")}>Watches</Text>
          <Text onClick={() => setCategory("clothes")}>Clothes</Text>
          <Text onClick={() => setCategory("cameras")}>Cameras</Text>
          <Text onClick={() => setCategory("others")}>Others</Text>
        </HStack>
      </Box>
    </>
  );
};

export default CategoryList;
