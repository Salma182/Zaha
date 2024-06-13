import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from "./ProductDetails.module.css";
import Swal from 'sweetalert2';


const NotifyMeModal = ({ productId}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [emailError, setEmailError] = useState('');


  const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/i;

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

   const Notifyme = async () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    const formData = new FormData();
    formData.append("email", email);

    setLoading(true);
    try {
      const { data } = await axios.post(
        `https://zahaback.com/api/userproduct/${productId}/notify-me`,
        formData
      
      );
      if (data.message === "You will be notified when the product is available.") 
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 2000,
        });
      //console.log('Notification request sent successfully', data);
      setShowModal(false); // Close the modal on success
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className={style.notify}
        onClick={() => setShowModal(true)}
      >
        Notify me when is Available
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)}   dialogClassName="custom-modal-margin" >
        <Modal.Header closeButton  >
          <Modal.Title >Notify Me</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
              />
              {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <div className="d-flex justify-content-end w-100">
            <Button
              variant="secondary"
              onClick={() => setShowModal(false)}
              className="mx-3"
            >
              Close
            </Button>
            <Button
              variant="success"
              onClick={Notifyme}
              disabled={loading}
              className="px-5 btn-sm"
            >
              {loading ? 'Submitting...' : 'Send'}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NotifyMeModal;
