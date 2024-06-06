import React, { useEffect, useState } from "react";
import style from "./ImgForInsta.module.css";
import { Table } from "react-bootstrap";
import img from "../../../Images/model.jpg";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import Pagination from "react-bootstrap/Pagination";
import Loading from "../../Loading/Loading";
import { Link } from "react-router-dom";

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
const[data ,setData]=useState([]);
const [loading,setLoading] = useState(false)
const token = localStorage.getItem('token');

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
  handleShowUpdateModal(true);
}

const handleEditSlide = (slide) => {
  setEditingSlide(slide);
  setEditingImage(slide.path)
  setUpdatedName(slide.name);
  handleShowUpdateModal(false);
};

const handleImageChange = (e) => {
  setImg(e.target.files[0]);
};

async function getImages(page = 1){
  setLoading(true)
  try{
    const{data}= await axios.get(`https://zahaback.com/api/customerlink/all?page=${page}`,
    {  
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    )
    setCurrentPage(data.link.current_page);
    setLastPage(data.link.last_page);
    console.log(data)
    setData(data.link.data)
  }catch(e){
    console.error(e)
  }finally{
    setLoading(false)

  }

}

  async function AddImage() {    
    const formData = new FormData();
    formData.append("name", Name);
    formData.append("path", img);

    try{
    const{data}= await axios.post(`https://zahaback.com/api/customerlink/create`,
    formData,
    {  
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    ) 
    if (data.message === "customerlink created successfully") {
      handleCloseAddModal();
      Swal.fire({
        icon: "success",
        title: "customerlink created successfully",
      });
    }
    console.log("images", data)
  }catch(e) {
    console.error(e)
  }
}


async function updateImage() {    
  const formData = new FormData();
  if (updatedName) {
    formData.append("name",  updatedName);  }
  
  if (editingImage) {
    formData.append('path', editingImage);
  }

  try{
  const{data}= await axios.post(`https://zahaback.com/api/customerlink/update/${editingSlide.id}`,
  formData,
  {  
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  ) 
  if (data.message === "customerlink updated successfully") {
    handleCloseAddModal();
    setShowUpdateModal(false);
    Swal.fire({
      icon: "success",
      title: "customerlink updated successfully",
    }).then(() =>{
      setShowUpdateModal(false);
      getImages(currentPage);
      window.location.reload();
    })
  }

  console.log(data)
}catch(e) {
  console.error(e)
}
}

async function deleteImage(link) {    
  try{
  const{data}= await axios.get(`https://zahaback.com/api/customerlink/delete/${link}`,
  {  
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  ) 
  if (data.message === "Customer link deleted successfully") {
    handleCloseAddModal();
    setShowUpdateModal(false);
    Swal.fire({
      icon: "success",
      title: "Customer link deleted successfully",
    }).then(() =>{
      getImages(currentPage);
      window.location.reload();
    })
  }
  console.log(data)
}catch(e) {
  console.error(e)
}
}
let items = [];
for (let number = 1; number <= lastPage; number++) {
  items.push(
    <Pagination.Item
      key={number}
      active={number === currentPage}
      onClick={() => getImages(number)}
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

useEffect(() => {
  getImages();
}, []);



  return (
    <>
      <h1 className="text-center bg-color text-dark rounded-3 fw-bold text-capitalize p-3 my-3">
        Instagram Images
      </h1>

      {loading ? <Loading /> : ( <Table className="text-center" striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Link</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((link,index)=>
              <tr>
              <td width={50}>{index  +1}</td>
              <td className="text-center" width={50}>
                <img src={link.path} height={80} alt="product" />
              </td>
               <td> <Link to={link.name}> {link.name} </Link></td>
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
                            deleteImage(link.id)
                          }
                        });
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="editBtn"
                      onClick={() => handleEditSlide(link)}
                    >
                      Edit
                    </button>
  
                    </div>
                    
              </td>
            </tr>
            )
     ) :""}
        
        </tbody>

        
      </Table>)}
     
      <div onClick={handleShowAddModal} className="btn btn-primary w-100 my-3">Add Image</div>

      <div className="my-2 d-flex justify-content-center">
        {paginationBasic}
      </div>

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
              <Form.Control type="file" onChange={e => handleUpdateImage(e)} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={updateImage}>
            Update Slide
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}
