import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ForgotPassVerifyEmail from "./Pages/ForgotPassEmailVerify";
import ForgotPassVerifyOtp from "./Pages/ForgotPassOTPVerify";
import ForgotPasswordChangePass from "./Pages/ForgotPassChange";
import HomePage from "./Pages/HomePage";
import AccMailVer from "./Pages/AccMailVer";
import ViewProduct from "./Pages/ViewProduct";
import ListProduct from "./Pages/ListProduct";
import CategorySearch from "./Pages/CategorySearch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/acc-email-verify/:id" element={<AccMailVer />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-email-verify" element={<ForgotPassVerifyEmail />} />
      <Route path="/forgot-otp-verify" element={<ForgotPassVerifyOtp />} />
      <Route
        path="/forgot-change-pass"
        element={<ForgotPasswordChangePass />}
      />
      <Route path="/view-product/:id" element={<ViewProduct/>}   />
      <Route path="/list-product/:id" element={<ListProduct/>} />
      <Route path="/category-search/:id" element={<CategorySearch/>}/>
      
    </Routes>
  );
}

export default App;
