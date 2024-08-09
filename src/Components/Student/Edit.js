import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const Edit = ({
  isEdit,
  setIsEdit,
  editData,
  setEditData,
  updatedData,
  setUpdatedData,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setIsEdit(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic to handle form submission here
    setIsEdit(false);
    const response = await axios.put(
      `http://localhost:3001/students/${editData.id}`,
      editData
    );

    if (response.status === 200) {
      toast.success("Student updated successfully", {
        position: "bottom-center",

        autoClose: 2000,
      });
    } else {
      toast.error("Failed to update student");
    }

    setUpdatedData(!updatedData);

    handleClose();
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Modal show={isEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Add your form fields here */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={editData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                name="age"
                value={editData.age}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={editData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Edit;
