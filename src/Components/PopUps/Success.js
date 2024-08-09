import React from "react";
import { Modal } from "react-bootstrap";

const Success = () => {
  return (
    <div>
      <Modal show={true} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Student added successfully</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-primary">Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Success;
