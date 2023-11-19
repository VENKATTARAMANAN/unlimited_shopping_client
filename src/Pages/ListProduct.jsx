import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { url } from "../Api/Api";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  HStack,
  Image,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Rate } from "antd";

const ListProduct = () => {
  let params = useParams();
  let seardata = params.id.trim();
  const [filtereddata, setFilteredData] = useState([]);
  const searchProd = async () => {
    try {
      setFilteredData([]);
      const { data, status } = await axios.get(`${url}/product/alldata`);
      if (status === 200) {
        if (seardata === "all") {
          setFilteredData(data.data);
        } else {
          const value = data.data.filter((product) =>
            product.name.toLowerCase().includes(seardata)
          );
          setFilteredData(value);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // -----------side search filter data------------//

  const handleChange = async (checkedValues) => {
    try {
      setFilteredData([]);
      const { data, status } = await axios.post(`${url}/product/srh-fil-cat`, {
        checkval: checkedValues,
      });
      if (status === 200) {
        setFilteredData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const starRating = async (checkedValues) => {
    try {
      setFilteredData([]);
      const { data, status } = await axios.post(`${url}/product/star-rating`, {
        checkval: checkedValues,
      });
      if (status === 200) {
        setFilteredData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const brandfilter = async (checkedValues) => {
    try {
      setFilteredData([]);
      const { data, status } = await axios.post(`${url}/product/brand-filter`, {
        checkval: checkedValues,
      });
      if (status === 200) {
        setFilteredData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // -----------side search filter data end------------//

  useEffect(() => {
    searchProd();
  }, [seardata]);

  return (
    <>
      <Navbar>
        <Box className="list-prod">
          <Box>
            <Box style={{ width: "250px", margin: "10px" }}>
              <Text style={{ fontWeight: "Bold" }}>Search/Filters</Text>
              <hr />

              <Text style={{ fontWeight: "Bold", marginTop: "15px" }}>
                Category
              </Text>
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
              <Text style={{ fontWeight: "Bold", marginTop: "15px" }}>
                Brand
              </Text>
              <hr />
              <Box>
                <CheckboxGroup colorScheme="green" onChange={brandfilter}>
                  <Stack spacing={2} direction={"column"} ml={"10px"}>
                    <Checkbox value={"samsung"}>Samsung</Checkbox>
                    <Checkbox value={"apple"}>Apple</Checkbox>
                    <Checkbox value={"poco"}>Poco</Checkbox>
                    <Checkbox value={"mi"}>Mi</Checkbox>
                    <Checkbox value={"puma"}>Puma</Checkbox>
                    <Checkbox value={"nike"}>Nike</Checkbox>
                    <Checkbox value={"addidas"}>Addidas</Checkbox>
                    <Checkbox value={"asus"}>Asus</Checkbox>
                    <Checkbox value={"lenovo"}>lenovo</Checkbox>
                    <Checkbox value={"oneplus"}>Oneplus</Checkbox>
                    <Checkbox value={"other"}>Other</Checkbox>
                  </Stack>
                </CheckboxGroup>
              </Box>
            </Box>
          </Box>
          <Box style={{ margin: "10px" }}>
            <Text>Search results</Text>
            <Box>
              {filtereddata.map((data, index) => (
                <HStack spacing={3} key={index}>
                  <Box>
                    <Image
                      src={data.image1}
                      style={{ width: "200px", height: "200px" }}
                    />
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

export default ListProduct;
