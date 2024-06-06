import React, { useEffect, useState } from "react";
import style from "./CallbacksForDashboard.module.css";
import { Table } from "react-bootstrap";
import axios from "axios";
import Loading from "../../Loading/Loading";

export default function CallbacksForDashboard() {
  const [CallBackes, setCallBackes] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  
  async function getCallBackes() {
    setLoading(true)
    try{
      let { data } = await axios.get(
        `https://zahaback.com/api/userData/allCallbacks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false)
      console.log(data.allCallbacks.data);
      setCallBackes(data.allCallbacks.data);
    }catch(e){
  
  }
}

  useEffect(() => {
    getCallBackes();
  }, []);
  
  return (
    <>
      <h1 className="text-center bg-color text-dark rounded-3 fw-bold text-capitalize p-3 my-3">
        Callbacks
      </h1>
      {loading ? <Loading /> : <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Country</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Type</th>
            <th>Date</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        {CallBackes.length > 0 ? (
          <tbody>
            {CallBackes.map((callback, index) => (
              <tr key={callback.id}>
                <td>{index + 1}</td>
                <td>{callback.name}</td>
                <td>{callback.Country}</td>
                <td>{callback.email}</td>
                <td>{callback.phone}</td>
                <td>{callback.type}</td>
                <td>{callback.created_at.slice(0, 10)}</td>
                {/* <td>
                  <button className="btn btn-success w-100">Done</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        ) : (
          ""
        )}
      </Table>}
      
    </>
  );
}
