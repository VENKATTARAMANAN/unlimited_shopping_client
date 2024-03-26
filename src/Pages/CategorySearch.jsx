import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../Api/Api";
import { useState } from "react";
import { Rate } from "antd";
import { Spin } from "antd";
import { Pagination } from 'antd';

const CategorySearch = () => {
  const params = useParams();
  const navigate=useNavigate();
  const parmsdata = params.id;
  const [productdata, setProductData] = useState([]);
  const [backupdata,setBackUpData]=useState([])
  const [loading, setLoading] = useState(false);

// -------------getall product data-----------------//

  const searchProd = async () => {
    try {
      setLoading(true);
      setProductData([]);
      const { data, status } = await axios.get(`${url}/product/alldata`);
      if (status === 200) {
        setLoading(false);
        setBackUpData(data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    searchProd();
  },[])

  useEffect(()=>{
if(productdata.length === 0){
setProductData(backupdata);
}
  },[productdata,backupdata])
// -------------getall product data end-----------------//

  const getdata = async () => {
    try {
      setLoading(true);
      setProductData([]);
      const { data, status } = await axios.get(
        `${url}/product/get-catwise-data/${parmsdata}`
      );
      if (status === 200) {
        setLoading(false);
        setProductData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // -------------side search filter functionality------------//

  const handleChange = async (checkedValues) => {
    try {
      setLoading(true);
      setProductData([]);
      const { data, status } = await axios.post(`${url}/product/srh-fil-cat`, {
        checkval: checkedValues,
      });
      if (status === 200) {
        setLoading(false);
        setProductData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const starRating = async (checkedValues) => {
    try {
      setLoading(true);
      setProductData([]);
      const { data, status } = await axios.post(`${url}/product/star-rating`, {
        checkval: checkedValues,
      });
      if (status === 200) {
        setLoading(false);
        setProductData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const brandfilter = async (checkedValues) => {
    try {
      setLoading(true);
      setProductData([]);
      const { data, status } = await axios.post(`${url}/product/brand-filter`, {
        checkval: checkedValues,
      });
      if (status === 200) {
        setLoading(false);
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
      <Spin spinning={loading} size="large">
        <Navbar>
          {true}
          <Box className="list-prod">
            <Box className="side-search">
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
                      <Checkbox value={"others"}>Others</Checkbox>
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
                {productdata.map((data, index) => (
                  <HStack spacing={3} key={index}>
                    <Box>
                      <Image
                        src={data.image1}
                        style={{ width: "200px", height: "200px" }}
                        onClick={() => navigate(`/view-product/${data._id}`)}
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
      </Spin>
    </>
  );
};

export default CategorySearch;
