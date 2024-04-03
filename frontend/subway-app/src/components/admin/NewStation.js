import React, { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import "../../styles/admin/product.css";

function NewStation() {
  const [formData, setFormData] = useState({
    name: "",
    lat: "",
    lng: "",
    city: "rome",
    status: "active",
    closing_at: "",
    openning_at: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("admintoken");
      console.log(formData)
      const response = await fetch("http://localhost:8000/api/createadminstation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.status === "success") {
        alert("created successfully");
        window.location.href = "/admin";
      } else {
        alert(data.message);
        window.location.href = "/admin_login";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newUser">
          <h1 className="newUserTitle">New Station</h1>
          <form className="productForm" onSubmit={handleSubmit}>
            <div className="productFormLeft">
              <label>Station Name</label>
              <input
                type="text"
                name="name"
                placeholder="name"
                onChange={handleChange}
                required
              />
              <label>Latitude</label>
              <input
                type="text"
                name="lat"
                placeholder="Latitude"
                onChange={handleChange}
                required
              />
              <label>Longitude</label>
              <input
                type="text"
                name="lng"
                placeholder="Longitude"
                onChange={handleChange}
                required
              />
              <label>City</label>
              <select name="city" onChange={handleChange} defaultValue="rome" required>
                <option value="rome">Rome</option>
                <option value="newyork">New York</option>
              </select>
              <label>Status</label>
              <select
                name="status"
                onChange={handleChange}
                defaultValue="active"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="underconstruction">Under Construction</option>
              </select>
              <label htmlFor="timeInput">Oppening Hours</label>
              <input
                type="time"
                name="openning_at"
                placeholder="Opening at"
                onChange={handleChange}
                required
              />
              <label htmlFor="timeInput">Closing Hours</label>
              <input
                type="time"
                name="closing_at"
                placeholder="Closing at"
                onChange={handleChange}
                required
              />
              <button className="productButton">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewStation;
