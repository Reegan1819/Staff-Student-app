import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./StudentCommon.css";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import StudentTable from "./StudentTable";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon } from "@mui/material";
import { green } from "@mui/material/colors";

const StudentDashboard = () => {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    email: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student.name || !student.age || !student.email) {
      toast.error("Please fill all the fields");
      return;
    }
    axios
      .post("http://localhost:3001/students", student)
      .then((response) => {
        console.log(response.data);
        if (response.status === 201) {
          toast.success("Student added successfully", {
            position: "bottom-center",
            autoClose: 2000,
          });
        }
        setUpdated((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to add student");
      });

    setStudent({
      name: "",
      age: "",
      email: "",
    });
    setShowModal(false);
  };

  return (
    <>
      <div className="row dashboard">
        <div className="col-md-4 nav-bar">
          <Nav defaultActiveKey="/" className="flex-column">
            <h4 style={{ color: "white", fontSize: "16px" }}>
              Student Dashboard
            </h4>
            <Nav.Link style={{ color: "white" }} href="/">
              Home
            </Nav.Link>
            {/* <Nav.Link eventKey="link-1" style={{ color: "white" }}>
              Link
            </Nav.Link>
            <Nav.Link eventKey="link-2" style={{ color: "white" }}>
              Link
            </Nav.Link> */}
          </Nav>
        </div>
        <div className="col-md-10">
          <header className="header">
            <div className="row">
              <div className="col-md-6">
                <h3>Student Dashboard</h3>
              </div>
              <div
                className="col-md-6"
                style={{ textAlign: "end", marginTop: "20px" }}
              >
                <Link to="/" style={{ color: "black" }}>
                  Home
                </Link>
              </div>
            </div>
          </header>
          <div className="d-flex justify-content-end btn">
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Add Student
            </Button>
          </div>
          <div className="mt-3">
            <StudentTable updated={updated} />
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label> Student Name*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={student.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Age*</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                name="age"
                value={student.age}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address*</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={student.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{ position: "relative", left: "40%" }}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StudentDashboard;
