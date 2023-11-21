import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Carousel } from "antd";
import mobile from "../assets/mobile.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.webp";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import Footer from "../Components/Footer";
import { url } from "../Api/Api";
import axios from "axios";
import { useState } from "react";
import { Rate } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import CategoryList from "../Components/CategoryList";
import { Spin } from "antd";

const HomePage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [prodata, setProData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const contentStyle = {
    height: "300px",
    width: "100%",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const token = localStorage.getItem("AuthToken");

  // ---------------get wishlist data ------------------

  const getWishlist = async () => {
    try {
      const { data, status } = await axios.post(
        `${url}/product/get-wishlist`,
       {token}
      );
      if (status === 200) {
        setWishlist(data.data);
        sessionStorage.setItem("wishlength", data.data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  // ------------------------------------------------

  const getAllProductData = async () => {
    try {
      setLoading(true)
      const { data, status } = await axios.get(`${url}/product/alldata`);
      if (status === 200) {
        setLoading(false)
        setProData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const wishlistIds = wishlist?.map((prod) => prod.productid);

  const handleAddorRemovewishlist = async (prodData) => {
    try {
      setLoading(true)
      if(wishlistIds?.includes(prodData._id)) {
        const {data, status} = await axios.delete(`${url}/product/remove-wishlist/${prodData._id}`, {
          headers: {
            Authorization: token
          }
        });
        if(status === 200) {
          setLoading(false)
          getAllProductData();
          toast({
            description: data.data,
            status: "success",
            duration: 1500,
            position: "top-right",
            isClosable: true,
          });
        }
      } else {
        setLoading(true)
        const { data, status } = await axios.post(`${url}/product/add-wishlist`, {
          data: prodData,
          token: token,
        });
        if (status === 200) {
          setLoading(false)
          toast({
            description: data.data,
            status: "success",
            duration: 1500,
            position: "top-right",
            isClosable: true,
          });
        }
      }
      getWishlist();
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    getAllProductData();
  }, []);

  return (
    <>
     <Spin spinning={loading} size="xl">
      <Navbar>
        {true}
        <Box className="side-search">
        <CategoryList />
        </Box>
        <Box>
          <Carousel autoplay>
            <div>
              <img src={mobile} style={contentStyle} />
            </div>
            <div>
              <img src={image2} style={contentStyle} />
            </div>
            <div>
              <img src={image3} style={contentStyle} />
            </div>
            <div>
              <img src={image4} style={contentStyle} />
            </div>
            <div>
              <img src={image5} style={contentStyle} />
            </div>
          </Carousel>
        </Box>
        <Box>
          <Heading
            style={{
              textAlign: "center",
              fontSize: "25px",
              textDecoration: "underline",
            }}
          >
            All Products
          </Heading>
        </Box>
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {prodata.map((data, index) => (
            <Box
              key={index}
              style={{
                height: "380px",
                width: "250px",
                margin: "20px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                borderRadius: "5px",
              }}
            >
              <Image
                src={data.image1}
                onClick={() => navigate(`/view-product/${data._id}`)}
                style={{ width: "250px", height: "250px" }}
              />
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <HStack spacing={3}>
                  <Rate allowHalf value={data.ratings} />
                  {"  "}
                  <Text>{data.ratings}</Text>
                </HStack>
              </Box>
              <Heading
                style={{
                  fontSize: "15px",
                  textAlign: "center",
                  fontWeight: "bold",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  padding: "3px",
                }}
              >
                {data.name}
              </Heading>
              <HStack
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Price:{data.price}
                </Text>
                <Box onClick={() => handleAddorRemovewishlist(data)}>
                  {wishlistIds?.includes(data._id) ? (
                    <Tooltip label="Remove from wishlist">
                    <HeartFilled style={{ color: "red", cursor: "pointer",fontSize:"30px"}} /></Tooltip>
                  ) : (
                    <Tooltip label="Add to wishlist">
                    <HeartOutlined cursor={"pointer"} style={{fontSize:"30px"}} /></Tooltip>
                  )}
                </Box>
              </HStack>
            </Box>
          ))}
        </Box>
      </Navbar>
      <Footer />
      </Spin>
    </>
  );
};

export default HomePage;
