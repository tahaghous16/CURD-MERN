import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await fetch("http://localhost:8000");

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setData(result);
    }
  };

  //Delete Handle

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8000/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setError("Data Deleted !");

      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
  };

  //getdata
  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div className="container my-5 pt-5">
      {error && (
        <div className="alert alert-danger text-center mx-auto w-75">
          {error}
        </div>
      )}
      <h2 className="text-center mb-4 text-primary fw-bold">All Posts</h2>
      <div className="row d-flex justify-content-center g-4">
        {data.length > 0 ? (
          data.map((ele) => (
            <div key={ele._id} className="col-md-4">
              <div className="card custom-card">
                <div className="card-body text-center p-4">
                  <h5 className="card-title fw-bold text-dark">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                  <h6 className="card-subtitle mb-3 text-muted">
                    {ele.age} years old
                  </h6>
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/${ele._id}`}
                      className="btn btn-outline-primary w-45"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-outline-danger w-45"
                      onClick={() => handleDelete(ele._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No data available</p>
        )}
      </div>
    </div>
  );
};

export default Read;
