import React, { useEffect, useState } from "react";
import style from "./Questions.module.css";
import { Table } from "react-bootstrap";
import axios from "axios";
import Loading from "../../Loading/Loading";

export default function Questions() {
  const [Questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getQuestions() {
    setLoading(true)
    try{
      let { data } = await axios.get(
        `https://zahaback.com/api/userData/allQuestions`,
        {
          headers: {
            Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
          },
        }
      );
      console.log(data.allQuestions.data);
      setQuestions(data.allQuestions.data);
      setLoading(false)
    }catch(e){
    
  }
}

  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <>
      <h1 className="text-center bg-light text-dark rounded-3 fw-bold text-capitalize p-3 my-3">
        Questions
      </h1>
      {loading ? <Loading /> :  <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Questions.map((Questions, index) => (
            <tr key={Questions.id}>
              <td>{index + 1}</td>
              <td>{Questions.client_name}</td>
              <td>{Questions.client_email}</td>
              <td>{Questions.client_phone}</td>
              <td>{Questions.created_at}</td>
              <td>{Questions.message}</td>
              <td>
                <button className="btn btn-success w-100">Done</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>}
     
    </>
  );
}
