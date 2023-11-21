import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import Unlimited from "../assets/UnlimitedShopping.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { url } from "../Api/Api";
import { useState } from "react";
import { Spin } from "antd";

const formvalidate = yup.object({
  otp: yup.string().required("Please enter the captcha code"),
});

const ForgotPassVerifyOtp = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    useFormik({
      initialValues: {
        otp: "",
        token: localStorage.getItem("resetAuth"),
      },
      validationSchema: formvalidate,
      onSubmit: async () => {
        try {
          setLoading(true);
          const { data, status } = await axios.post(
            `${url}/forgot-pass/forgot-verOtp`,
            values
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
            navigate("/forgot-change-pass");
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
          toast({
            description: error.response.data.data,
            status: "error",
            duration: 1500,
            position: "top-right",
            isClosable: true,
          });
        }
      },
    });

  useEffect(() => {
    const Auth = localStorage.getItem("resetAuth");
    if (!Auth) {
      navigate("/forgot-email-verify");
    }
  }, []);

  return (
    <>
      <Spin spinning={loading} size="large">
        <Box
          style={{
            backgroundImage:
              "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
          }}
          height="100vh"
          display={"grid"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box backgroundColor={"white"} p={5} borderRadius={10} width={350}>
            <Box display={"flex"} justifyContent={"center"} mb={0}>
              <Image src={Unlimited} alt="logo" w={150} h={150} />
            </Box>
            <Box>
              <Text>
                To continue, complete this verification step. We've sent an
                "Capcha Code" to your email. Please enter it below to complete
                verification.
              </Text>
            </Box>
            <Box mt={3}>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel>Captcha Code</FormLabel>
                  <Input
                    name="otp"
                    id="otp"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.otp}
                  />
                  {errors.otp && touched.otp ? (
                    <div style={{ color: "crimson" }}>{errors.otp}</div>
                  ) : (
                    <></>
                  )}
                  <Box display={"flex"} justifyContent={"center"} mt={3}>
                    <Button
                      style={{
                        backgroundColor: "rgb(239,185,76)",
                        color: "#000",
                        fontWeight: "bold",
                      }}
                      type="submit"
                    >
                      Continue
                    </Button>
                  </Box>
                </FormControl>
              </form>
            </Box>
          </Box>
        </Box>
      </Spin>
    </>
  );
};

export default ForgotPassVerifyOtp;
