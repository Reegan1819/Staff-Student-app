import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import EditStaffDetail from "./EditStaffDetail";

const StaffTable = ({ updated }) => {
  const [staffData, setStaffData] = useState([]);
  const [updatedData, setUpdatedData] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [isDeleted, setIsDeleted] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [firstPage, setFirstPage] = useState(0);
  const [lastPage, setLastPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/Staffs");
      const data = await response.json();
      setStaffData(data);
    };
    fetchData();
  }, [updated, isDeleted, isUpdated]);

  const handleDelete = async (id) => {
    const response = await axios.delete(`http://localhost:3001/Staffs/${id}`);
    if (response.status === 200) {
      toast.success("Staff deleted successfully", {
        position: "bottom-center",
        autoClose: 2000,
      });
    } else {
      toast.error("Failed to delete staff");
    }
    setIsDeleted((prev) => !prev);
    setUpdatedData((prev) => !prev);
  };

  const handleEdit = (staff) => {
    setIsEdit(true);
    setEditData(staff);
  };

  const handlePage = (e) => {
    console.log(e.target.innerText);
    setPage(e.target.innerText);
    setFirstPage((e.target.innerText - 1) * limit);
    setLastPage(e.target.innerText * limit);
  };

  const handlePrevPage = () => {
    if ((page || Number(page)) === 1) return;
    setPage(page - 1);
    setFirstPage(firstPage - limit);
    setLastPage(lastPage - limit);
  };

  const handleNextPage = () => {
    if ((page || Number(page)) === Math.ceil(staffData.length / limit)) return;
    setPage(page + 1);
    setFirstPage(firstPage + limit);
    setLastPage(lastPage + limit);
  };

  const items = [];

  const pageLength = Math.ceil(staffData.length / 5);
  for (let number = 1; number <= pageLength; number++) {
    items.push(
      <Pagination.Item key={number} onClick={handlePage}>
        {number}
      </Pagination.Item>
    );
  }

  console.log(
    page,
    pageLength,
    (Number(page) || page) === pageLength,
    typeof page,
    typeof Number(page),
    typeof pageLength
  );

  return (
    <div>
      {staffData.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {staffData.slice(firstPage, lastPage).map((staff, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{staff.name}</td>
                  <td>{staff.age}</td>
                  <td>{staff.email}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(staff)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(staff.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "20px",
            }}
          >
            <Pagination.Prev
              onClick={handlePrevPage}
              disabled={(page || Number(page)) === 1}
            />
            {items}
            <Pagination.Next
              onClick={handleNextPage}
              disabled={(page || Number(page)) === pageLength}
            />
          </Pagination>
        </>
      ) : (
        <div>No staff data</div>
      )}

      <EditStaffDetail
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        editData={editData}
        setEditData={setEditData}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
      />
    </div>
  );
};

export default StaffTable;
