import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const AddStaffDetail = ({ showModal, setShowModal, setUpdated }) => {
  const [staff, setStaff] = useState({
    name: "",
    age: "",
    email: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setStaff({
      ...staff,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!staff.name || !staff.age || !staff.email) {
      toast.error("Please fill all the fields");
      return;
    }

    const response = await axios.post("http://localhost:3001/Staffs", staff);
    if (response.status === 201) {
      toast.success("Staff added successfully", {
        position: "bottom-center",
        autoClose: 2000,
      });
      setUpdated((prev) => !prev);
    } else {
      toast.error("Failed to add staff");
    }

    console.log(staff);
    setStaff({
      name: "",
      age: "",
      email: "",
    });

    setShowModal(false);
  };

  return (
    <div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={staff.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Age"
                name="age"
                value={staff.age}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={staff.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddStaffDetail;
