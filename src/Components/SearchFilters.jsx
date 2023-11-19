import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { url } from "../Api/Api";
import axios from "axios";

const SearchFilters = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = async (checkedValues) => {
    console.log({val:checkedValues});
    try {
const {data,status}=await axios.post(`${url}/product/srh-fil-cat`,{checkval:checkedValues})
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Box style={{ width: "250px", margin: "10px" }}>
        <Text style={{ fontWeight: "Bold" }}>Search/Filters</Text>
        <hr />
        <Text style={{ fontWeight: "Bold", marginTop: "15px" }}>Prices</Text>
        <hr />
        <Box mt={2}>
          <form onSubmit={handleSubmit}>
            <HStack spacing={2}>
              <Input required placeholder="min" />
              <Input placeholder="max" />
              <Button
                type="submit"
                style={{
                  borderRadius: "10px",
                  background: "white",
                  boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                }}
              >
                go
              </Button>
            </HStack>
          </form>
        </Box>
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
          <CheckboxGroup colorScheme="green">
            <Stack direction={"column"} ml={"10px"}>
              <Checkbox>4star & above</Checkbox>
              <Checkbox>3star & above</Checkbox>
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
    </>
  );
};

export default SearchFilters;
