import React from "react";
import Navbar from "../Components/Navbar";
import { Box } from "@chakra-ui/react";
import { TimePicker } from "antd";
const format = "HH:mm";

const CartPage = () => {
    const onChange = (time, timeString) => {
        console.log( timeString);
      };
  return (
    <>
      <Navbar>
        {true}
        <Box>
        <TimePicker use12Hours format="h:mm a" onChange={onChange} />
        </Box>
      </Navbar>
    </>
  );
};

export default CartPage;
