import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const baseURL = "http://localhost:2000/";

const RouteUrl = () => {
  // const navigate = useNavigate();
  const [url, setUrl] = useState();

  const redirect = async () => {
    let res = [];
    const host = window.location.host;
    if (url.includes(host)) {
      const id = url.slice(-6);

      res = await axios.post(
        baseURL + "reqlurl",
        { url: id },
        {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      window.open(res.data.lurl);
    } else {
      res = await axios.post(
        baseURL + "reqsurl",
        { url: url },
        {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
          },
        }
      );

      window.open("https://" + host + "/" + res.data.surl);
    }
  };
  return (
    <>
      <Stack gap={2} className="col-md-5 mx-auto">
        <Form.Control
          size="lg"
          type="text"
          placeholder="Enter url for redirect"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
        <div style={{ textAlign: "right", padding: "5px" }}>
          <Button variant="outline-secondary" type="button" onClick={redirect}>
            Redirect
          </Button>
        </div>
      </Stack>
    </>
  );
};

export default RouteUrl;
