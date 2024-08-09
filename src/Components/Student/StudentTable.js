import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Edit from "./Edit";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Pagination } from "react-bootstrap";

function StudentTable({ updated }) {
  const [studentData, setStudentData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [updatedData, setUpdatedData] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [firstPage, setFirstPage] = useState(0);
  const [lastPage, setLastPage] = useState(5);

  function handlePage(e) {
    setPage(e.target.innerText);
    setFirstPage((e.target.innerText - 1) * limit);
    setLastPage(e.target.innerText * limit);
  }

  const handlePrevPage = () => {
    if ((page || Number(page)) === 1) return;
    setPage(page - 1);
    setFirstPage(firstPage - limit);
    setLastPage(lastPage - limit);
  };

  const handleNextPage = () => {
    if ((page || Number(page)) === Math.ceil(studentData.length / limit))
      return;
    setPage(page + 1);
    setFirstPage(firstPage + limit);
    setLastPage(lastPage + limit);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/students");
      const data = await response.json();
      setStudentData(data);
    };
    fetchData();
  }, [updated, updatedData]);

  console.log(studentData);

  const handleDelete = async (id) => {
    const response = await axios.delete(`http://localhost:3001/students/${id}`);
    if (response.status === 200) {
      toast.success("Student deleted successfully", {
        position: "bottom-center",
        autoClose: 2000,
      });
    } else {
      toast.error("Failed to delete student");
    }
    setStudentData(studentData.filter((student) => student.id !== id));
  };
  const items = [];

  const pageLength = Math.ceil(studentData.length / limit);

  for (let number = 1; number <= pageLength; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={handlePage}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handleEdit = async (id) => {
    const response = await axios.get(`http://localhost:3001/students/${id}`);
    setEditData(response.data);

    setIsEdit(true);
  };

  console.log(page, pageLength, (Number(page) || page) === pageLength);

  return (
    <div>
      {studentData?.length > 0 ? (
        <>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email Id</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentData?.slice(firstPage, lastPage).map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.email}</td>
                  <td>NA</td>
                  <td>
                    <EditIcon
                      style={{ cursor: "pointer", color: "blue" }}
                      fontSize="small"
                      key={`edit-${student.id}`}
                      onClick={() => handleEdit(student.id)}
                    />

                    <DeleteIcon
                      style={{ cursor: "pointer", color: "black" }}
                      fontSize="small"
                      key={`delete-${student.id}`}
                      onClick={() => handleDelete(student.id)}
                    />
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
              onClick={() => handlePrevPage()}
              disabled={(Number(page) || page) === 1}
            />
            {items}
            <Pagination.Next
              onClick={() => handleNextPage()}
              disabled={(Number(page) || page) === pageLength ? true : false}
            />
          </Pagination>
        </>
      ) : (
        <h3>No Student Data</h3>
      )}
      <Edit
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        editData={editData}
        setEditData={setEditData}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
      />
    </div>
  );
}

export default StudentTable;
