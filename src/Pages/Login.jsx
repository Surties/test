import React from "react";
import LoginForm from "../Components/LoginForm";
import { Helmet } from "react-helmet";

function Login() {
  return (
    <div>
      <Helmet>
        <title>Login-Surtie's Digital Media </title>
        <meta name="Login" content="Login into your account" />
      </Helmet>
      <LoginForm />
    </div>
  );
}

export default Login;
