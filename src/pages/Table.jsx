import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const SampleTable = ({ user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://authnastedformapi.onrender.com/getformdata")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Table striped bordered hover className="w-50 m-auto mt-5">
      <thead>
        <tr>
          <th>User</th>
          <th>Sector</th>
          <th>Agree To Terms</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr key={d.id}>
            <td>{d.name}</td>
            <td>{d.sector}</td>
            <td>{d.checkbox ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SampleTable;
