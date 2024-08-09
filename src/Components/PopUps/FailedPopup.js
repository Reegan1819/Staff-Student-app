import React from "react";
import { Modal } from "react-bootstrap";

const FailedPopup = () => {
  return (
    <div className="failed-popup">
      <Modal show={true} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Failed</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Failed to add student</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-primary">Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FailedPopup;
