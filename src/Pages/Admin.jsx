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
        <title>Admin-Surtie's Digital Media</title>
        <meta name="Home" content="Privilege access to admin and newseditor" />
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
        />
        <link
          rel="apple-touch-icon"
          href="https://firebasestorage.googleapis.com/v0/b/surtieswebapplication.appspot.com/o/Surties%20Zomato%20Red%20Logo%203.png?alt=media&token=a7f9e6f9-4eb3-4b65-8134-9fd72fc6f3ed"
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
