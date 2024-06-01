import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";

export default function Coupon() {
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShow = () => setShow(true);
  const [Coupon, setCoupon] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);

  let items = [];
  for (let number = 1; number <= lastPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => getCoupon(number)}
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

  async function getCoupon(page = 1) {
    setLoading(true)
    try{
      let { data } = await axios.get(
        `https://zahaback.com/api/coupon/all?page=${page}`,
        {
          headers: {
            Authorization: `Bearer tmTqMwqaJf0gGEQWE5kQAkfn37ITr46RpjVCfHWha266e4cc`,
          },
        }
      );
      setCoupon(data.coupon.data);
      setCurrentPage(data.coupon.current_page);
      setLastPage(data.coupon.last_page);
      setLoading(false)
    }catch(e){
      console.log(e)
 
  }
  }
  async function addCoupon() {
    const formData = new FormData();
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);

    try {
      let { data } = await axios.post(
        `https://zahaback.com/api/coupon/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer tmTqMwqaJf0gGEQWE5kQAkfn37ITr46RpjVCfHWha266e4cc`,
          },
        }
      );

      if (data.message === "coupon created successfully") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        getCoupon(currentPage);
        setShow(false); // Close the modal after adding coupon
        setDiscount(""); // Reset discount state
        setPrice(null); // Reset price state
        setStartDate(""); // Reset start date state
        setEndDate(""); // Reset end date state
      }
    } catch (error) {
      console.error("Error adding coupon:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

  async function deleteCoupon(id) {
    try {
      let { data } = await axios.get(
        `https://zahaback.com/api/coupon/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer tmTqMwqaJf0gGEQWE5kQAkfn37ITr46RpjVCfHWha266e4cc`,
          },
        }
      );

      if (data.message === "coupon deleted successfully") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        getCoupon(currentPage);
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

  async function updateCoupon(id) {
    try {
      let { data } = await axios.post(
        `https://zahaback.com/api/coupon/update/${id}`,
        {
          discount,
          price,
        },
        {
          headers: {
            Authorization: `Bearer tmTqMwqaJf0gGEQWE5kQAkfn37ITr46RpjVCfHWha266e4cc`,
          },
        }
      );

      if (data.message === "coupon updated successfully") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        getCoupon(currentPage);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: data.error,
          showConfirmButton: false,
          timer: 2000,
        });
      }
      setShowUpdate(false);
    } catch (error) {
      console.error("Error updating coupon:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }

  useEffect(() => {
    getCoupon();
  }, []);

  const handleShowUpdate = (coupon) => {
    setSelectedCoupon(coupon);
    setDiscount(coupon.discount);
    setPrice(coupon.price);
    setShowUpdate(true);
  };

  return (
    <>
      <h1 className="text-center bg-light text-dark rounded-3 fw-bold text-capitalize p-3 my-3">
        Coupon
      </h1>
      {loading ? <Loading /> :  <div className="container">
        <div className="row g-3">
          {Coupon.length > 0 &&
            Coupon.map((coupon) => (
              <div className="col-md-3" key={coupon.id}>
                <div className="item text-start border border-3 rounded-3 p-3">
                  <p className="my-0">
                    <span className="fw-bold text-capitalize">start at</span>:{" "}
                    {coupon.start_date ? coupon.start_date.slice(0, 10) : ""}
                  </p>
                  <p className="mb-0 mt-2">
                    <span className="fw-bold text-capitalize">End at</span>:{" "}
                    {coupon.end_date ? coupon.end_date.slice(0, 10) : ""}
                  </p>
                  <p className="mb-0 mt-2">
                    <span className="fw-bold text-capitalize">Price</span>:{" "}
                    {coupon.price}
                  </p>
                  <p className="mb-0 mt-2">
                    <span className="fw-bold text-capitalize">Discount</span>:{" "}
                    {coupon.discount}
                  </p>
                  <div>

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
                          deleteCoupon(coupon.id);
                        }
                      });
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="editBtn"
                    onClick={() => handleShowUpdate(coupon)}
                  >
                    Edit
                  </button>
                </div>
                

                    </div>
             
                </div>
              </div>
            ))}
        </div>
      </div> }
     

      <div className="Btn">
      <button className="addBtn" variant="success" onClick={handleShow}>
              Add Coupon
            </button>
      </div>
 

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="discount">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addCoupon}>
            Add Coupon
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="discount">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
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
          <Button variant="primary" onClick={() => updateCoupon(selectedCoupon.id)}>
            Update Coupon
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="my-2 d-flex justify-content-center">
        {paginationBasic}
      </div>
    </>
  );
}