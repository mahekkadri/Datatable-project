
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  const API = "http://localhost:3000/students";

  const [allData, setAllData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPages, setDataPerPages] = useState(5);

  useEffect(() => {
    fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllData(data);
      })
  }, []);


  let totalPages = Math.ceil(allData.length / dataPerPages);

  let lastIndex = currentPage * dataPerPages;

  let firstIndex = lastIndex - dataPerPages;

  let currentData = allData.slice(firstIndex, lastIndex);


  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="text-center mb-4 fw-bold">Student Data</h2>

        <div className="table-responsive">

          <table className="table table-striped table-hover table-bordered mb-0">

            <thead className="table-dark">
              <tr>
                <th>ROLL NO.</th>
                <th>NAME</th>
                <th>DSA</th>
                <th>MATHS</th>
                <th>DSAF</th>
                <th>NETWORKING</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.dsa}</td>
                  <td>{student.maths}</td>
                  <td>{student.dsaf}</td>
                  <td>{student.networking}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>


        <div className="d-flex justify-content-between align-items-center border border-top-0 px-2 py-2">

          <div className="d-flex align-items-center gap-2">

            <span>Rows per Page</span>

            <select
              className="form-select"
              style={{ width: "70px" }}
              value={dataPerPages}
              onChange={(e) => {
                setDataPerPages(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>

          </div>

          <div>
            {firstIndex + 1}-{lastIndex} of {allData.length}
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            > ← </button>

            <button
              className="btn btn-outline-secondary"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            > → </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default App;