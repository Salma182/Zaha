import React, { useState } from "react";
import style from "./ImgForInsta.module.css";
import { Table } from "react-bootstrap";
import img from "../../../Images/model.jpg";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

export default function ImgForInsta() {

  const[img, setImg]=useState([])
const[Name, setName]=useState('')
const [showAddModal, setShowAddModal] = useState(false);
const [showUpdateModal, setShowUpdateModal] = useState(false);
const [slideName, setSlideName] = useState("");
const [lastPage, setLastPage] = useState(1);
const [imageFile, setImageFile] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
const [editingSlide, setEditingSlide] = useState(null);
const [editingImage, setEditingImage] = useState(null);
const [updatedName, setUpdatedName] = useState("");

const handleCloseAddModal = () => {
  setShowAddModal(false);
  setSlideName("");
  setImageFile(null);
};

const handleShowAddModal = () => setShowAddModal(true);

const handleCloseUpdateModal = () => {
  setShowUpdateModal(false);
  setEditingSlide(null);
  setUpdatedName("");
  setEditingImage(null); 
};

const handleShowUpdateModal = () => setShowUpdateModal(true);

const handleUpdateImage = (e) => {
  setEditingImage(e.target.files[0]);
  handleShowUpdateModal();
}

const handleEditSlide = (slide) => {
  setEditingSlide(slide);
  setUpdatedName(slide.name);
  handleShowUpdateModal();
};

const handleImageChange = (e) => {
  setImg(e.target.files[0]);
};


  async function AddImage() {
    const formData = new FormData();
    formData.append("name", Name);
    formData.append("path", img);


    try{
    const{data}= await axios.post(`https://zahaback.com/api/customerlink/create`,
    {  
      headers: {
        Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
      },
    }
    )
    console.log(data)
  }catch(e) {
    console.error(e)
  }
}

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
            <div className="w-50 buttons"> 
                  <button
                    className="deleteBtn"
                    onClick={() => {
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
                          // deleteSlide(img.id);
                        }
                      });
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="editBtn"
                    onClick={() => handleEditSlide(img)}
                  >
                    Edit
                  </button>

                  </div>
                  
            </td>
          </tr>
        </tbody>
      </Table>
      <div onClick={handleShowAddModal} className="btn btn-primary w-100 my-3">Add Image</div>


      {/* Add Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="slideName">
              <Form.Label>Slide Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={AddImage}>
            Add Slide
          </Button>
        </Modal.Footer>
      </Modal>

      {/* update Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Slide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="updatedName">
              <Form.Label>Slide Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter updated name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleUpdateImage} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={""}>
            Update Slide
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}
