import React from "react";
import SignupForm from "../Components/SignupForm";
import { Helmet } from "react-helmet";

function Signup() {
  return (
    <div>
      <Helmet>
        <title>Signup-Surties Digital Media </title>
        <meta name="Signup" content="Create new Account" />
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
        />
        <link
          rel="apple-touch-icon"
          href="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
        />
      </Helmet>
      <SignupForm />
    </div>
  );
}

export default Signup;
