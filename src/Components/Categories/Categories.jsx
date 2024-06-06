import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { Pagination } from 'react-bootstrap';
import Loading from "../Loading/Loading";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [name, setName] = useState("");
  const [categoryIdToUpdate, setCategoryIdToUpdate] = useState("");
  const [loading,setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1); 
  const [isHome, setIsHome] = useState(false);
  const [updatedName, setupdatedName] = useState("");
  const [updatedIshome, setupdatedIshome] = useState(false);
  const token = localStorage.getItem('token');
  
  async function getAllCategories(page = 1) {
    setLoading(true)
    try {
      let { data } = await axios.get(
        `https://zahaback.com/api/category/all?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(data.category.data);
      setCurrentPage(data.category.current_page);
      setLastPage(data.category.last_page);
      setLoading(false)

      // setIsHome(data.category.data.is_home === "true");
      console.log(data)
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const handleCheckboxChange = (e) => {
    setIsHome(e.target.checked);
  };

  async function addCategory() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("is_home", isHome);
    

    try {
      await axios.post(
        `https://zahaback.com/api/category/create`,
         formData ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      Swal.fire({
        icon: "success",
        title: "Category added successfully",
      }).then(() =>{
        setShowAddModal(false);
        getAllCategories(currentPage);
        window.location.reload();
    })
    } catch (error) {
      console.error("Error adding category:", error);
    }
  }

  async function deleteCategory(id) {
    try {
      await axios.get(
        `https://zahaback.com/api/category/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Category deleted successfully",
      }).then(() =>{
        getAllCategories(currentPage);
        window.location.reload();
    })
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }

  
  async function updateCategory() {
    const formData = new FormData();
    formData.append('name', updatedName);
    formData.append('is_home', updatedIshome);
    
    try {
      await axios.post(
        `https://zahaback.com/api/category/update/${categoryIdToUpdate}`,
        formData ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Category updated successfully",
      }).then(() =>{
        setShowUpdateModal(false);
        getAllCategories(currentPage);
        window.location.reload();
    })
    } catch (error) {
      console.error("Error updating category:", error);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []); // Reload categories when currentPage changes


  useEffect(() => {
    if (categories) {
      setupdatedName(name || '');
      setupdatedIshome(isHome || false);
    }
  }, [categories]);

  ///
  let items = [];
  for (let number = 1; number <= lastPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => getAllCategories(number)}
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
  //

  return (
    <>
      <h1 className="text-center bg-color text-dark rounded-3 fw-bold text-capitalize p-3 my-3">
        All Categories
      </h1>
{loading ? <Loading />:  <div className="container">
        <div className="row g-3">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div className="col-md-3" key={category.id}>
                <div className="bg-opacity-25 p-2 rounded-3 text-center text-capitalize fw-bolder">
                  <h3>{category.name}</h3>
                  <p className="h6 my-2">Category id : {category.id}</p>
                  <div className="buttons">
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
                          deleteCategory(category.id);
                        }
                      });
                    }}
                  >
                    Delete
                  </button>
                  
                  <button
                    className="editBtn"
                    onClick={() => {
                      setCategoryIdToUpdate(category.id);
                      setShowUpdateModal(true);
                    }}
                  >
                    Edit
                  </button>
                    </div>

                </div>
              </div>
            ))
          ) : (
            <p className="h2 text-center p-2 bg-dark text-white">
              No Categories yet
            </p>
          )}
          <div className="Btn">
          <button
            className="addBtn"
            onClick={() => setShowAddModal(true)}
          >
            Add Category
          </button>
          </div>
    
        </div>
      </div>
}
     
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="categoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter category name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <div>
            <label htmlFor="is_home">Is Home:</label>
            <input
              type="checkbox"
              id="is_home"
              checked={isHome}
              onChange={handleCheckboxChange}
            />
          </div>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={addCategory}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>

 {/* update Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="categoryNameUpdate">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={updatedName}
              onChange={(e) => setupdatedName(e.target.value)}
            />
          </Form.Group>

          <div>
            <label htmlFor="is_home">Is Home:</label>
            <input
              type="checkbox"
              id="is_home"
              checked={updatedIshome}
              onChange={handleCheckboxChange}
            />
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>

        <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={updateCategory}>
          Update Category
        </Button>
      </Modal.Footer>
    </Modal>

      <div className="my-2 d-flex justify-content-center">
        {paginationBasic}
      </div>
    </>
  );
}
