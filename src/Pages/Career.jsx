import React from "react";
import CareerForm from "../Components/CareerForm";
import { Helmet } from "react-helmet";

function Career() {
  return (
    <div>
      <Helmet>
        <title>Career-Surtie's Digital Media </title>
        <meta name="Home" content="Start your career with us" />
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
        />
        <link
          rel="apple-touch-icon"
          href="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
        />
      </Helmet>
      <CareerForm />
    </div>
  );
}

export default Career;
