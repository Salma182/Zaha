import React from "react";
import style from "./ImgForInsta.module.css";
import { Table } from "react-bootstrap";
import img from "../../../Images/model.jpg";

export default function ImgForInsta() {
  return (
    
    <>
      <h1 className="text-center bg-light text-dark rounded-3 fw-bold text-capitalize p-3 my-3">
        Image For Instagram
      </h1>
      <Table className="text-center" striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>image</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width={100}>1</td>
            <td className="text-center" width={100}>
              <img src={img} height={80} alt="product" />
            </td>
            <td className={style.cont}>
              <div className={`${style.btnContainer} w-75`}>
                <div className="btn btn-danger w-50">Delete Image</div>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="btn btn-primary w-100 my-3">Add Image</div>
    </>
  );
}
