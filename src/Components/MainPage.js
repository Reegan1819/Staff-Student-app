import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { STAFF_DASHBOARD, STUDENT_DASHBOARD } from "./Router/endPoints";
import "./Student/StudentCommon.css";

const MainPage = () => {
  const url =
    "https://as1.ftcdn.net/v2/jpg/07/13/17/42/1000_F_713174201_Wr8GG0q1cDnTR442qJXNBsnrphHcQdZj.jpg";
  return (
    <div>
      <img
        src={url}
        alt="Background"
        style={{ width: "100%", height: "100vh" }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Link to={STAFF_DASHBOARD}>
          <Button
            style={{ marginRight: "100px", width: "100px" }}
            className="staff-btn"
          >
            Staff
          </Button>
        </Link>
        <Link to={STUDENT_DASHBOARD}>
          <Button variant="primary" style={{ width: "100px" }}>
            Student
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
