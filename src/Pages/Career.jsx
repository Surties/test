import React from "react";
import CareerForm from "../Components/CareerForm";
import { Helmet } from "react-helmet";

function Career() {
  return (
    <div>
      <Helmet>
        <title>Career-Surtie's Digital Media </title>
        <meta name="Home" content="Start your career with us" />
      </Helmet>
      <CareerForm />
    </div>
  );
}

export default Career;
