
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './CustomerList.css'


function CustomerList({ customers, refresh }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`https://customers-management-app.onrender.com/api/customers/${id}`);
        refresh(); // refresh the list after deletion
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <table className="customer-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((c,i) => (
          <tr key={c.id}>
            <td>{i + 1}</td>
            <td>{c.first_name}</td>
            <td>{c.last_name}</td>
            <td>{c.phone_number}</td>
            <td>
              
              <Link to={`/customers/${c.id}`} className="link-customer-list">View</Link>{" "}
              <Link to={`/customers/${c.id}/edit`} className="link-customer-list">Edit</Link>{" "}
              <button onClick={() => handleDelete(c.id)} className="link-customer-list">Delete</button>

              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomerList;
