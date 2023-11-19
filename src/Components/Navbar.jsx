import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Unlimited from "../assets/Mainpage.png";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";
import { Badge } from "antd";
import { useState } from "react";
import { url } from "../Api/Api";
import axios from "axios";

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const [searchkey, SetSearchKey] = useState(" ");
  const wishlength= sessionStorage.getItem("wishlength");

  const logOut = () => {
    const logout = localStorage.removeItem("AuthToken");
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchkey === " ") {
      navigate(`/list-product/all`);
    } else {
      navigate(`/list-product/${searchkey}`);
      SetSearchKey(" ");
    }
  };

  const getWishlistdata = async () => {
    try {
      const token=localStorage.getItem("AuthToken");
      const {data,status}=await axios.post(`${url}/product/get-wishlist`,{token})
      if(status === 200){
        sessionStorage.setItem("wishlength", data.data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlistdata();
  }, []);

  return (
    <>
      <Box className="pos">
        <Box
          height={"60px"}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgb(19,25,33)",
          }}
        >
          <Box ml={5}>
            <Image
              src={Unlimited}
              width={"150px"}
              height={"50px"}
              onClick={() => navigate("/homepage")}
            />
          </Box>
          <Box
            mr={"20px"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HStack spacing={"30px"}>
              <Box className="side-search">
                <form onSubmit={handleSubmit}>
                  <InputGroup borderRadius={5} size="sm">
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Search2Icon color="gray.600" />}
                    />
                    <Input
                      type="text"
                      value={searchkey}
                      onChange={(e) => SetSearchKey(e.target.value)}
                      placeholder="Search..."
                      border="1px solid white"
                      backgroundColor={"white"}
                    />
                    <InputRightAddon p={0} border="none">
                      <Button
                        size="sm"
                        borderLeftRadius={0}
                        borderRightRadius={3.3}
                        border="1px solid white"
                        type="submit"
                      >
                        Search
                      </Button>
                    </InputRightAddon>
                  </InputGroup>
                </form>
              </Box>
              <Box>
                <Badge count={wishlength} overflowCount={999}>
                  <HeartOutlined style={{ fontSize: "30px", color: "white" }} />
                </Badge>
              </Box>
              <Box>
                <Badge count={1} overflowCount={999}>
                  <ShoppingCartOutlined
                    style={{ fontSize: "30px", color: "white" }}
                  />
                </Badge>
              </Box>
              <Box>
                <Menu>
                  <MenuButton>
                    <Avatar bg="teal.500" width={10} height={10} />
                  </MenuButton>
                  <MenuList
                    mt={3}
                    boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
                  >
                    <MenuItem>Welcome</MenuItem>
                    <MenuItem onClick={() => logOut()}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </HStack>
          </Box>
        </Box>
      </Box>
      <main>{children}</main>
    </>
  );
};

export default Navbar;
