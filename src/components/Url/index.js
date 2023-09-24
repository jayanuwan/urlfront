import React, { useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import axios from "axios";

const Url = () => {
  const [url, setUrl] = useState(),
    onInput = ({ target: { url } }) => setUrl(url);
  const [list, setList] = useState([]);

  const baseURL = "http://localhost:2000/";

  useEffect(() => {
    axios.get(baseURL + "all").then((response) => {
      console.log(response.data);
      setList(response.data);
    });
  }, [url]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);

    const data = JSON.stringify({ url: e.target[0].value });
    console.log(data);
    const res = await axios.post(baseURL + "save", data, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    });
    res.status === 200
      ? setUrl(e.target[0].value)
      : console.log("error saving urls");

    console.log(res);
  };
  return (
    <>
      <Stack gap={2} className="col-md-5 mx-auto">
        <Form onSubmit={onFormSubmit}>
          <Form.Control
            size="lg"
            type="text"
            placeholder="enter long url"
            onChange={onInput}
            value={url}
          />
          <div style={{ textAlign: "right", padding: "5px" }}>
            <Button variant="outline-secondary" type="submit">
              Save
            </Button>
          </div>
        </Form>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Long URL</th>
              <th>Short URL</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((item) => {
                return (
                  <tr key={item.surl}>
                    <td>{item.lurl}</td>
                    <td>{item.surl}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Stack>
    </>
  );
};

export default Url;
