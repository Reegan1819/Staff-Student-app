import React, { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import StaffTable from "./StaffTable";
import AddStaffDetail from "./AddStaffDetail";

const StaffDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [updated, setUpdated] = useState(false);

  return (
    <div className="row dashboard">
      <div className="col-md-4 nav-bar">
        <Nav defaultActiveKey="/home" className="flex-column">
          <h4 style={{ color: "white", fontSize: "16px" }}>Staff Dashboard</h4>
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
              <h3>Staff Dashboard</h3>
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
            Add Staff
          </Button>
        </div>
        <div className="mt-3">
          <StaffTable updated={updated} />
        </div>
      </div>
      <AddStaffDetail
        showModal={showModal}
        setShowModal={setShowModal}
        setUpdated={setUpdated}
        updated={updated}
      />
    </div>
  );
};

export default StaffDashboard;
