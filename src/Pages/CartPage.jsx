import React from "react";
import Navbar from "../Components/Navbar";
import { Box, Text } from "@chakra-ui/react";
import emptycart from "../assets/emptycart.json";
import Lottie from "lottie-react";

const CartPage = () => {
   
  return (
    <>
      <Navbar>
        {false}
        <Box>
        <Box style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
            <Lottie
              style={{ height: "350px" }}
              animationData={emptycart}
              loop={true}
            />
            <Text style={{fontSize:"30px",fontWeight:"bold"}}>Your Cart is Empty</Text>
          </Box>
        </Box>
      </Navbar>
    </>
  );
};

export default CartPage;
