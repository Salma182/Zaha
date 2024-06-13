import React, { useEffect, useState } from "react";
import style from "./EsimateArea.module.css";
import { Table } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { date } from "yup";
import Loading from "../../Loading/Loading";

export default function EsimateArea() {
  const handleShowUpdate = (area) => {
    setSelectedArea(area);
    setShowUpdate(true);
    setCity(area.city);
    setPrice(area.price);
  };
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShow = () => setShow(true);
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(null);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [Area, setArea] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token'); 

  let items = [];
  for (let number = 1; number <= lastPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => getArea(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  const paginationBasic = (
    <div>
      <Pagination size="sm">{items}</Pagination>
    </div>
  );

  async function getArea(page = 1) {
    setLoading(true)
    try{
      let { data } = await axios.get(
        `https://zahaback.com/api/area/all?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setArea(data.area.data);
      setCurrentPage(data.area.current_page);
      setLastPage(data.area.last_page);
      setLoading(false)

    }catch(e){ 
   
  }
}

  async function createArea() {
    const formData = new FormData();
    formData.append("city", city);
    formData.append("price", price);

    try {
      let { data } = await axios.post(
        `https://zahaback.com/api/area/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.message === "area created successfully") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        getArea(currentPage);
        setShow(false);
      }
    } catch (error) {
      console.error("Error creating area:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

  async function deleteArea(id) {
    try {
      let { data } = await axios.get(
        `https://zahaback.com/api/area/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.message === "area deleted successfully") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        getArea(currentPage);
      }
    } catch (error) {
      console.error("Error deleting area:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

  async function updateArea(id) {
    try {
      let { data } = await axios.post(
        `https://zahaback.com/api/area/update/${id}`,
        {
          city,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.message === "area updated successfully") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        getArea(currentPage);
      }
    } catch (error) {
      console.error("Error updating area:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    setShowUpdate(false);
  }

  useEffect(() => {
    getArea();
  }, []);

  return (
    <>
      <h1 className="text-center bg-color text-dark rounded-3 fw-bold text-capitalize p-3 my-3">
        Area Estimate
      </h1>
      {loading ? <Loading /> :  <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>City</th>
            <th>Price</th>
            <th>Edit</th>
          </tr>
        </thead>
        {Area.length > 0 ? (
          <tbody>
            {Area.map((area, index) => (
              <tr key={area.id}>
                <td>{index + 1}</td>
                <td>{area.city}</td>
                <td>{area.price}</td>
              <td className={`text-center `}>
                  <Button
                    onClick={() => handleShowUpdate(area)}
                    variant="primary me-2 mb-2 w-25"

                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteArea(area.id);
                        }
                      })
                    }
                    variant="danger me-2 mb-2 w-25"

                  >
                    delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          ""
        )}
      </Table> }
     
      <div className="Btn">
        <button className="addBtn" variant="success" onClick={handleShow}>
        Add Area
            </button>
        </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Area</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter New Area</Form.Label>
              <Form.Control
                type="text"
                placeholder="cairo..."
                autoFocus
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createArea}>
            Add Area
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Update Area</Form.Label>
              <Form.Control
                type="text"
                placeholder="cairo..."
                autoFocus
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Enter Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Close
          </Button>
          <Button variant="primary" onClick={() => updateArea(selectedArea.id)}>
            Update Area
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="my-2 d-flex justify-content-center">
        {paginationBasic}
      </div>
    </>
  );
}