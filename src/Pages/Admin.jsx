import React, { useState } from "react";
import AdminNewsForm from "../Components/AdminNewsForm";
import { Box, Button, Center } from "@chakra-ui/react";
import NewsSlider from "../Components/NewsSlider";
import UpdateNews from "../Components/UpdateNews";
import AdminUserControl from "../Components/AdminUserControl";
import AdminAccess from "../Components/AdminAccess";
import NewsEditorAccess from "../Components/NewsEditorAccess";
import { Helmet } from "react-helmet";

function Admin() {
  const [activeComponent, setActiveComponent] = useState(
    <NewsEditorAccess>
      <AdminNewsForm />
    </NewsEditorAccess>
  );
  const renderComponent = (component) => {
    setActiveComponent(component);
  };
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
      <Box mt={"50px"}>
        <Center
          display={"grid"}
          gridTemplateColumns={{
            base: "repeat(2,44%)",
            md: "repeat(2,36%)",
            lg: "repeat(4,180px)",
          }}
          mt={"50px"}
          gap={"10px"}
        >
          <Button
            backgroundColor={"transparent"}
            onClick={() =>
              renderComponent(
                <AdminAccess>
                  <AdminUserControl />
                </AdminAccess>
              )
            }
          >
            Admin Control
          </Button>
          <Button
            backgroundColor={"transparent"}
            onClick={() =>
              renderComponent(
                <NewsEditorAccess>
                  <NewsSlider />
                </NewsEditorAccess>
              )
            }
          >
            News Slider
          </Button>
          <Button
            backgroundColor={"transparent"}
            onClick={() =>
              renderComponent(
                <NewsEditorAccess>
                  <AdminNewsForm />
                </NewsEditorAccess>
              )
            }
          >
            Upload News
          </Button>
          <Button
            backgroundColor={"transparent"}
            onClick={() =>
              renderComponent(
                <NewsEditorAccess>
                  <UpdateNews />
                </NewsEditorAccess>
              )
            }
          >
            Upadate News
          </Button>
        </Center>

        <Center>{activeComponent && <div>{activeComponent}</div>}</Center>
      </Box>
    </>
  );
}

export default Admin;
