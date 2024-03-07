import React from "react";
import SignupForm from "../Components/SignupForm";
import { Helmet } from "react-helmet";

function Signup() {
  return (
    <div>
      <Helmet>
        <title>Signup-Surtie's Digital Media </title>
        <meta name="Signup" content="Create new Account" />
      </Helmet>
      <SignupForm />
    </div>
  );
}

export default Signup;
