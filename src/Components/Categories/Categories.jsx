import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { Pagination } from 'react-bootstrap';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [name, setName] = useState("");
  const [categoryIdToUpdate, setCategoryIdToUpdate] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  async function getAllCategories(page = 1) {
    try {
      let { data } = await axios.get(
        `https://zahaback.com/api/category/all?page=${page}`,
        {
          headers: {
            Authorization: `Bearer tmTqMwqaJf0gGEQWE5kQAkfn37ITr46RpjVCfHWha266e4cc`,
          },
        }
      );
      setCategories(data.category.data);
      setCurrentPage(data.category.current_page);
      setLastPage(data.category.last_page);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function addCategory() {
    try {
      await axios.post(
        `https://zahaback.com/api/category/create`,
        { name },
        {
          headers: {
            Authorization: `Bearer tmTqMwqaJf0gGEQWE5kQAkfn37ITr46RpjVCfHWha266e4cc`,
          },
        }
      );
      setShowAddModal(false);
      getAllCategories(currentPage);
      Swal.fire({
        icon: "success",
        title: "Category added successfully",
      });
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
            Authorization: `Bearer tmTqMwqaJf0gGEQWE5kQAkfn37ITr46RpjVCfHWha266e4cc`,
          },
        }
      );
      getAllCategories(currentPage);
      Swal.fire({
        icon: "success",
        title: "Category deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }

  async function updateCategory() {
    try {
      await axios.post(
        `https://zahaback.com/api/category/update/${categoryIdToUpdate}`,
        { name },
        {
          headers: {
            Authorization: `Bearer tmTqMwqaJf0gGEQWE5kQAkfn37ITr46RpjVCfHWha266e4cc`,
          },
        }
      );
      setShowUpdateModal(false);
      getAllCategories(currentPage);
      Swal.fire({
        icon: "success",
        title: "Category updated successfully",
      });
    } catch (error) {
      console.error("Error updating category:", error);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []); // Reload categories when currentPage changes

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
      <h1 className="text-center bg-light text-dark rounded-3 fw-bold text-capitalize p-3 my-3">
        All Categories
      </h1>

      <div className="container">
        <div className="row g-3">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div className="col-md-3" key={category.id}>
                <div className="bg-danger bg-opacity-25 p-2 rounded-3 text-center text-capitalize fw-bolder">
                  <h3>{category.name}</h3>
                  <p className="h6 my-2">Category id : {category.id}</p>
                  <button
                    className="btn btn-danger mx-2"
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
                    className="btn btn-warning mx-2"
                    onClick={() => {
                      setCategoryIdToUpdate(category.id);
                      setShowUpdateModal(true);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="h2 text-center p-2 bg-dark text-white">
              No Categories yet
            </p>
          )}
          <button
            className="btn btn-success my-3"
            onClick={() => setShowAddModal(true)}
          >
            Add Category
          </button>
        </div>
      </div>

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
                placeholder="Enter category name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
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
