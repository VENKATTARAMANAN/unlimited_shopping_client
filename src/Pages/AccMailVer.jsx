import React, { useEffect } from "react";
import Lottie from "lottie-react";
import emailverify from "../assets/emailverify.json";
import { Box, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { url } from "../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";
import { useState } from "react";

const AccMailVer = () => {
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  console.log(param);
  const getData = async () => {
    try {
      setLoading(true);
      const { data, status } = await axios.post(
        `${url}/user/acc-email-verify`,
        param
      );
      if (status === 200) {
        setLoading(false);
        toast({
          description: data.data,
          status: "success",
          duration: 1500,
          position: "top-right",
          isClosable: true,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Spin spinning={loading} size="large">
        <Box mt={50}>
          <Lottie
            style={{ height: "350px" }}
            animationData={emailverify}
            loop={true}
          />
          <p
            style={{
              textAlign: "center",
              fontSize: "30px",
              color: "blueviolet",
              fontWeight: "bold",
            }}
          >
            Email Verified SuccessFully
          </p>
        </Box>
      </Spin>
    </>
  );
};

export default AccMailVer;
