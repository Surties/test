import React from "react";
import LoginForm from "../Components/LoginForm";
import { Helmet } from "react-helmet";

function Login() {
  return (
    <div>
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
      <LoginForm />
    </div>
  );
}

export default Login;
