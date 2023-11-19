import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Box, Button, Checkbox, CheckboxGroup, HStack, Image, Input, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../Api/Api";
import { useState } from "react";
import { Rate } from "antd";

const CategorySearch = () => {
  const params = useParams();
  const parmsdata=params.id;
  const [productdata, setProductData] = useState([]);

  const getdata = async () => {
    try {
      setProductData([]);
      const { data, status } = await axios.get(
        `${url}/product/get-catwise-data/${parmsdata}`
      );
      if (status === 200) {
        setProductData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

// -------------side search filter functionality------------//

const handleSubmit = (e) => {
  e.preventDefault();
};

const handleChange = async (checkedValues) => {
  try {
    setProductData([]);
    const { data, status } = await axios.post(`${url}/product/srh-fil-cat`, {
      checkval: checkedValues,
    });
    if (status === 200) {
      setProductData(data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

const starRating = async (checkedValues) => {
  try {
    setProductData([]);
    const { data, status } = await axios.post(`${url}/product/star-rating`, {
      checkval: checkedValues,
    });
    if (status === 200) {
      setProductData(data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

// -------------side search filter functionality end------------//
  useEffect(() => {
    getdata();
  }, [parmsdata]);
  return (
    <>
      <Navbar>
        <Box className="list-prod">
          <Box>
          <Box style={{ width: "250px", margin: "10px" }}>
        <Text style={{ fontWeight: "Bold" }}>Search/Filters</Text>
        <hr />
        <Text style={{ fontWeight: "Bold", marginTop: "15px" }}>Category</Text>
        <hr />
        <Box>
          <CheckboxGroup colorScheme="green" onChange={handleChange}>
            <Stack direction={"column"} ml={"10px"}>
              <Checkbox value={"mobiles"}>Mobiles</Checkbox>
              <Checkbox value={"laptops"}>Laptops</Checkbox>
              <Checkbox value={"clothes"}>Clothes</Checkbox>
              <Checkbox value={"cameras"}>Cameras</Checkbox>
              <Checkbox value={"shoes"}>Shoe</Checkbox>
              <Checkbox value={"watches"}>Watches</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
        <Text style={{ fontWeight: "Bold", marginTop: "15px" }}>
          Customer Ratings
        </Text>
        <hr />
        <Box>
          <CheckboxGroup colorScheme="green" onChange={starRating}>
            <Stack direction={"column"} ml={"10px"}>
              <Checkbox value={"4"}>4star & above</Checkbox>
              <Checkbox value={"1"}>1star & above</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
        <Text style={{ fontWeight: "Bold", marginTop: "15px" }}>Brand</Text>
        <hr />
        <Box>
          <CheckboxGroup colorScheme="green">
            <Stack spacing={2} direction={"column"} ml={"10px"}>
              <Checkbox>Samsung</Checkbox>
              <Checkbox>Apple</Checkbox>
              <Checkbox>Poco</Checkbox>
              <Checkbox>Mi</Checkbox>
              <Checkbox>Puma</Checkbox>
              <Checkbox>Nike</Checkbox>
              <Checkbox>Addidas</Checkbox>
              <Checkbox>Asus</Checkbox>
              <Checkbox>lenovo</Checkbox>
              <Checkbox>Oneplus</Checkbox>
              <Checkbox>Other</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
      </Box>

          </Box>
          <Box style={{ margin: "10px" }}>
            <Text>Search results</Text>
            <Box>
              {productdata.map((data,index) => (
                <HStack spacing={3} key={index}>
                  <Box>
                    <Image src={data.image1} style={{width:"200px",height:"200px"}}/>
                  </Box>
                  <Box>
                    <Text>{data.name}</Text>
                    <HStack spacing={3}>
                <Rate allowHalf value={data.ratings} />
                {"  "}
                <Text>{data.ratings}</Text>
              </HStack>
                    <Text>Price:{data.price}</Text>
                  </Box>
                </HStack>
              ))}
            </Box>
          </Box>
        </Box>
      </Navbar>
      <Footer />
    </>
  );
};

export default CategorySearch;
