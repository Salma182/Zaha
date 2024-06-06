import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";

export default function SubCategory() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const [categoryId, setCategoryId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [selectedSubcategoryName, setSelectedSubcategoryName] = useState("");
  const [selectedSubcategoryStatus, setSelectedSubcategoryStatus] =
    useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading,setLoading] = useState(false)

  async function getSubCategories(pageNumber = 1) {
    setLoading(true)
    try {
      const { data } = await axios.get(
        `https://zahaback.com/api/subcategory/all?page=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer tmTqMwqaJf0gGEQWE5kQAkfn37ITr46RpjVCfHWha266e4cc`,
          },
        }
      );
      setProducts(data.SubCategory.data);
      setCurrentPage(data.SubCategory.current_page);
      setLastPage(data.SubCategory.last_page);
      setLoading(false)

    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }

  async function getCategories() {
    try {
      let allCategories = [];
      let pageNumber = 1;
      let totalPages = 1;

      while (pageNumber <= totalPages) {
        const { data } = await axios.get(
          `https://zahaback.com/api/category/all?page=${pageNumber}`,
          {
            headers: {
              Authorization: `Bearer tmTqMwqaJf0gGEQWE5kQAkfn37ITr46RpjVCfHWha266e4cc`,
            },
          }
        );
        console.log(data);
        totalPages = data.category.last_page;

        allCategories = allCategories.concat(data.category.data);

        pageNumber++;
      }

      setCategories(allCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function addSubCategory() {
    if (!name || !status || !categoryId) {
      Swal.fire({
        icon: "error",
        title: "Please fill all fields!",
      });
      return;
    }

    try {
      const { data } = await axios.post(
        `https://zahaback.com/api/subcategory/create`,
        { name, status, category_id: categoryId },
        {
          headers: {
            Authorization: `Bearer tmTqMwqaJf0gGEQWE5kQAkfn37ITr46RpjVCfHWha266e4cc`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "SubCategory created successfully",
      }).then(() =>{
        setShowAddModal(false);
        getSubCategories(currentPage);
        window.location.reload();
    })
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  }

  async function updateSubCategory() {
    if (!selectedSubcategoryName || !selectedSubcategoryStatus || !categoryId) {
      Swal.fire({
        icon: "error",
        title: "Please fill all fields!",
      });
      return;
    }

    try {
      await axios.post(
        `https://zahaback.com/api/subcategory/update/${selectedSubcategoryId}`,
        {
          name: selectedSubcategoryName,
          status: selectedSubcategoryStatus,
          category_id: categoryId,
        },
        {
          headers: {
            Authorization: `Bearer tmTqMwqaJf0gGEQWE5kQAkfn37ITr46RpjVCfHWha266e4cc`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Subcategory updated successfully",
      }).then(() =>{
        setShowUpdateModal(false);
        getSubCategories(currentPage);
        window.location.reload();
    })
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  }

  async function deleteSubCategory(id) {
    try {
      await axios.get(
        `https://zahaback.com/api/subcategory/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer tmTqMwqaJf0gGEQWE5kQAkfn37ITr46RpjVCfHWha266e4cc`,
          },
        }
      );
      getSubCategories();
      Swal.fire({
        icon: "success",
        title: "Subcategory deleted successfully",
      }).then(() =>{
        getSubCategories(currentPage);
        window.location.reload();
    })
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  }

  useEffect(() => {
    getSubCategories();
    getCategories();
  }, []);

  const paginationItems = [];
  for (let i = 1; i <= lastPage; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => getSubCategories(i)}
      >
        {i}
      </Pagination.Item>
    );
  }
console.log(products)
  return (
    <>
      <h1 className="text-center bg-color text-dark rounded-3 fw-bold text-capitalize p-3 my-3">
        SubCategory
      </h1>

      {loading ? <Loading /> :
      <div className="container">
      <div className="row g-3">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-md-3" key={product.id}>
              <div className="item bg-light border border-3 text-center p-2 rounded-3 bg-opacity-50 fw-bold ">
                <p className="my-1">Name: {product.name}</p>
                <p className="my-1">Status: {product.status}</p>
                <p className="my-1">ID: {product.id}</p>

                <div className="buttons">
                <button
                  className="deleteBtn"
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Yes, delete it!",
                      cancelButtonText: "No, cancel!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteSubCategory(product.id);
                      }
                    });
                  }}
                >
                Delete
                </button>
                <button
                  className="editBtn"
                  onClick={() => {
                    setSelectedSubcategoryId(product.id);
                    setSelectedSubcategoryName(product.name);
                    setSelectedSubcategoryStatus(product.status);
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
            No Subcategories yet
          </p>
        )}
      </div>
    </div>}
      

      <div className="Btn">
      <button
        className="addBtn"
        variant="success"
        onClick={() => setShowAddModal(true)} >
        Add Sub Category
      </button>
</div>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Subcategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="subCategoryName">
              <Form.Label>Enter Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name..."
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="subCategoryStatus">
              <Form.Label>Select Status</Form.Label>
              <Form.Select
                aria-label="Select Status"
                onChange={(e) => setStatus(e.target.value)}
                defaultValue="active"
              >
                <option value="active">Active</option>
                <option value="hidden">Hidden</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="subCategoryCategory">
              <Form.Label>Select Category</Form.Label>
              <Form.Select
                aria-label="Select Category"
                onChange={(e) => setCategoryId(e.target.value)}
                defaultValue=""
              >
                <option>Select a category...</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={addSubCategory}>
            Add Subcategory
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Subcategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="updateSubCategoryName">
              <Form.Label>Enter Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name..."
                value={selectedSubcategoryName}
                onChange={(e) => setSelectedSubcategoryName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="updateSubCategoryStatus">
              <Form.Label>Select Status</Form.Label>
              <Form.Select
                aria-label="Select Status"
                defaultValue="active"
                value={selectedSubcategoryStatus}
                onChange={(e) => setSelectedSubcategoryStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="hidden">Hidden</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="updateSubCategoryCategory">
              <Form.Label>Select Category</Form.Label>
              <Form.Select
                aria-label="Select Category"
                defaultValue=""
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option>Select a category...</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={updateSubCategory}>
            Update Subcategory
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="my-2 d-flex justify-content-center">
        <Pagination>{paginationItems}</Pagination>
      </div>
    </>
  );
}
