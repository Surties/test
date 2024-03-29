import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from "./Redux/auth/auth.actiontype";

import AllRoutes from "./Routes/AllRoutes";
import "./App.css";
import { Helmet } from "react-helmet";
axios.defaults.withCredentials = true;
function App() {
  const dispatch = useDispatch();
  const getUser = () => {
    dispatch({
      type: LOGIN_LOADING,
    });
    axios
      .get("https://surtiesserver.onrender.com/auth/signin-token", {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_ERROR,
          payload: err.response.data.msg,
        });
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  console.log("last");
  return (
    <>
      <Helmet>
        <title>Surtie's Digital Media</title>
        <meta name="title" content="Surtie's Digital Media" />
        <meta
          name="description"
          content="Surties is a digital news media house based in Surat providing news in Gujarati and English."
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://surties.in/news/id/660310b481d2b4376b8e0656"
        />
        <meta property="og:title" content="Surtie's Digital Media" />
        <meta
          property="og:description"
          content="Surties is a digital news media house based in Surat providing news in Gujarati and English."
        />
        <meta
          property="og:image"
          content="https://metatags.io/images/meta-tags.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://surties.in/news/id/660310b481d2b4376b8e0656"
        />
        <meta property="twitter:title" content="Surtie's Digital Media" />
        <meta
          property="twitter:description"
          content="Surties is a digital news media house based in Surat providing news in Gujarati and English."
        />
      </Helmet>
      <AllRoutes />
    </>
  );
}

export default App;
