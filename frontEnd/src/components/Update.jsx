import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  //Get single User
  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:8000/${id}`);

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setError("");
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  //Edit User

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = { name, email, age };
    const response = await fetch(`http://localhost:8000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setError("");
      navigate("/all");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ height: "100vh", paddingTop: "80px" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "12px", marginTop: "-30px" }}
      >
        <span className="d-block text-center fw-bold text-warning fs-4 mb-4">
          Edit Your Details
        </span>

        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Age</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-warning w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
