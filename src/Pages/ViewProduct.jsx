import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../Api/Api";
import { useState } from "react";
import { Rate } from "antd";
import CategoryList from "../Components/CategoryList";

const ViewProduct = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [previewImg, setPreviewImg] = useState();
  const getProductData = async () => {
    try {
      const { data, status } = await axios.get(
        `${url}/product/get-product/${params.id}`
      );
      if (status === 200) {
        setData(data.data);
        setPreviewImg(data.data.image1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  console.log(data);
  return (
    <>
      <Navbar>
       <CategoryList/>
        <Box className="product-page">
          <Box>
            {/* ----------- Image preview start ----------- */}
            <Box
              display="flex"
              alignItems="center"
              flexDir="column"
              justifyContent="center"
              gap={5}
            >
              <Box>
                <Image
                  w="439px"
                  h="377px"
                  border="3px solid #d3d3d3"
                  src={previewImg}
                />
              </Box>
              <Box display="flex" alignItems="center" gap={5}>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDir="column"
                  justifyContent="center"
                >
                  <Image
                    w="100px"
                    h="100px"
                    border="3px solid #d3d3d3"
                    src={data.image1}
                    cursor="pointer"
                    onClick={() => setPreviewImg(data.image1)}
                  />
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDir="column"
                  justifyContent="center"
                >
                  <Image
                    w="100px"
                    h="100px"
                    border="3px solid #d3d3d3"
                    src={data.image2}
                    cursor="pointer"
                    onClick={() => setPreviewImg(data.image2)}
                  />
                </Box>
              </Box>
            </Box>
            {/* ----------- Image preview end ----------- */}
          </Box>
          <Box style={{width:"300px"}}>
            <VStack spacing={5}>
              <Heading style={{fontSize:"25px"}}>{data.name}</Heading>
              <Text>Brand:{data.brand}</Text>
              <HStack spacing={3}>
                <Rate allowHalf value={data.ratings} />
                {"  "}
                <Text>{data.ratings}</Text>
              </HStack>
              <Text style={{fontSize:"25px",fontWeight:"bold"}}>Price:{data.price}</Text>
              <Text>Description:{data.description}</Text>
              <Button
                style={{
                  backgroundColor: "rgb(239,185,76)",
                  color: "#000",
                  fontWeight: "bold",
                }}
              >
                Add to Cart
              </Button>
            </VStack>
          </Box>
        </Box>
      </Navbar>
      <Footer />
    </>
  );
};

export default ViewProduct;
