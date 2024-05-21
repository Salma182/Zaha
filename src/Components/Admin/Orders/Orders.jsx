import React from "react";
import style from "./Orders.module.css";
import Table from "react-bootstrap/Table";

export default function Orders() {
  return (
    <>
      <h1 className="text-center bg-light text-dark rounded-3 fw-bold text-capitalize p-3 my-3">
        Orders
      </h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Code</th>
            <th>Order Name</th>
            <th>date</th>
            <th>Description</th>
            <th>type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Dress</td>
            <td>10-3-2024</td>
            <td width={300}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro,
              repellat?
            </td>
            <td>Lorem ipsum dolor sit.</td>
            <td>
              <div className="d-flex justify-content-evenly align-items-center">
                <div className="btn btn-success">Accept </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Dress</td>
            <td>10-3-2024</td>
            <td width={300}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro,
              repellat?
            </td>
            <td>Lorem ipsum dolor sit.</td>
            <td>
              <div className="d-flex justify-content-evenly align-items-center">
                <div className="btn btn-success">Accept </div>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
