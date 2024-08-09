import axios from "axios";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const EditStaffDetail = ({
  updatedData,
  setUpdatedData,
  isEdit,
  setIsEdit,
  editData,
  setEditData,
  setIsUpdated,
}) => {
  const handleChange = (e) => {
    e.preventDefault();
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editData.name || !editData.age || !editData.email) {
      toast.error("Please fill all the fields");
      return;
    }
    const response = await axios.put(
      `http://localhost:3001/Staffs/${editData.id}`,
      editData
    );
    if (response.status === 200) {
      toast.success("Staff updated successfully", {
        position: "bottom-center",
        autoClose: 2000,
      });
      setIsUpdated((prev) => !prev);
    } else {
      toast.error("Failed to update staff");
    }
    setUpdatedData((prev) => !prev);
    setIsEdit(false);
  };

  return (
    <div>
      <Modal show={isEdit} onHide={() => setIsEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={editData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Age"
                name="age"
                value={editData.age}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={editData.email}
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

export default EditStaffDetail;
