import React from "react";
import loginlottie from "../assets/login-lottie.json";
import Lottie from "lottie-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { url } from "../Api/Api";
import axios from "axios";
import { useState } from "react";
import { Spin } from "antd";

const formvalidate = yup.object({
  name:yup.string().required("Please enter the name"),
  email: yup.string().required("Please enter the email"),
  password: yup
    .string()
    .required("Please enter the password")
    .min(8, "Please enter the 8 digit password"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        name:"",
        email: "",
        password: "",
      },
      validationSchema: formvalidate,
      onSubmit: async () => {
        try {
          setLoading(true);
          const { data, status } = await axios.post(
            `${url}/user/signup`,
            values
          );
          if (status === 201) {
            setLoading(false);
            toast({
              description: "SuccessFully Registered",
              status: "success",
              duration: 1500,
              position: "top-right",
              isClosable: true,
            });
            navigate("/");
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
          toast({
            description: error.response.data.message,
            status: "error",
            duration: 1500,
            position: "top-right",
            isClosable: true,
          });
        }
      },
    });
  return (
    <>
      <Spin spinning={loading} size="large">
        <Box
          style={{
            backgroundImage:
              "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
          }}
          height="100vh"
          gap={10}
          display={"grid"}
          gridTemplateColumns={"auto auto"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            ml={10}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <form onSubmit={handleSubmit}>
              <Heading textAlign={"center"} fontSize={30} mb={5}>
                Unlimited Shopping-Register
              </Heading>
              <FormControl>
              <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <div style={{ color: "crimson" }}>{errors.name}</div>
                ) : (
                  <></>
                )}
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <div style={{ color: "crimson" }}>{errors.email}</div>
                ) : (
                  <></>
                )}
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <div style={{ color: "crimson" }}>{errors.password}</div>
                ) : (
                  <></>
                )}
                <Box mt={5}>
                  {" "}
                  <Button
                    type="submit"
                    w={"100%"}
                    style={{
                      backgroundColor: "rgb(239,185,76)",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    Register
                  </Button>
                </Box>
                <Box mt={2} textDecoration={"underline"}>
                  <Link to="/">Already have account? Login</Link>
                </Box>
              </FormControl>
            </form>
          </Box>
          <div className="lottie-image">
            <Lottie
              style={{ height: "350px" }}
              animationData={loginlottie}
              loop={true}
            />
          </div>
        </Box>
      </Spin>
    </>
  );
};

export default SignUp;
