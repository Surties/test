import React from "react";
import DetailNewsComponent from "../Components/DetailNewsComponent";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function DetailNews() {
  const { id } = useParams();

  return (
    <div>
      <Helmet>
        <title>News-{id}-Surtie's Digital Media </title>
        <meta name="Home" content={`Get all the content of the news ${id}`} />
      </Helmet>
      <DetailNewsComponent para={id} />
    </div>
  );
}

export default DetailNews;
