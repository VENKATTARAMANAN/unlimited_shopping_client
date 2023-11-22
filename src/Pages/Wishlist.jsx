import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { url } from "../Api/Api";
import { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Center,
  HStack,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import loginlottie from "../assets/nodata.json";
import Lottie from "lottie-react";


const Wishlist = () => {
  const [data, setData] = useState([]);
  // const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const getWishlistdata = async () => {
    try {
      const token = localStorage.getItem("AuthToken");
      const { data, status } = await axios.post(`${url}/product/get-wishlist`, {
        token,
      });
      if (status === 200) {
        setData(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlistdata();
  }, []);

  const deleteWishlist = async (datas) => {
    const token=localStorage.getItem("AuthToken");
    try {
        const {data, status} = await axios.delete(`${url}/product/remove-wishlist/${datas}`, {
            headers: {
              Authorization: token
            }
          });
      if (status === 200) {
        // setLoading(false)
        getWishlistdata();
        toast({
          description: data.data,
          status: "success",
          duration: 1500,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar>
        {false}
       
          {data.length === 0 ? 
          <Box style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
            <Lottie
              style={{ height: "350px" }}
              animationData={loginlottie}
              loop={true}
            />
            <Text style={{fontSize:"30px",fontWeight:"bold"}}>No WishList Available</Text>
          </Box>
          
            : 
            <Box
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {data.map((data, index) => (
            <Box
              key={index}
              style={{
                width: "250px",
                height: "300px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                margin: "20px",
              }}
            >
              <Center>
                <Image
                  src={data.image1}
                  w={"200px"}
                  h={"150px"}
                  mt={"10px"}
                  onClick={() => navigate(`/view-product/${data.productid}`)}
                />
              </Center>
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
              <Center>
                <HStack gap={20} mt={10}>
                  <DeleteIcon
                    style={{ fontSize: "30px", cursor: "pointer" }}
                    onClick={() => deleteWishlist(data.productid)}
                  />
                </HStack>
              </Center>
            </Box>
             
          ))}
          </Box>
          }
       
      </Navbar>
      <Footer />
    </>
  );
};

export default Wishlist;
