// CustomerFormPage.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './CustomerFormPage.css'

function CustomerFormPage() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const { id } = useParams(); // for edit
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`https://customers-management-app.onrender.com/api/customers/${id}`)
        .then(res => {
          setFirstName(res.data.data.first_name);
          setLastName(res.data.data.last_name);
          setPhoneNumber(res.data.data.phone_number);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { first_name, last_name, phone_number };

    if (id) {
      axios.put(`https://customers-management-app.onrender.com/api/customers/${id}`, payload)
        .then(() => navigate("/"))
        .catch(err => console.error(err));
    } else {
      axios.post("https://customers-management-app.onrender.com/api/customers", payload)
        .then(() => navigate("/"))
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="customer-form-container">
      <h2>{id ? "Edit Customer" : "Add Customer"}</h2>
      <form className="customer-form" onSubmit={handleSubmit}>
        <input value={first_name} onChange={(e)=>setFirstName(e.target.value)} placeholder="First Name" required/>
        <input value={last_name} onChange={(e)=>setLastName(e.target.value)} placeholder="Last Name" required/>
        <input value={phone_number} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder="Phone Number" required/>
        <button type="submit">{id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
}

export default CustomerFormPage;
