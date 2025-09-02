import React from "react";
import "./AddressList.css";

function AddressList({ addresses, onEditAddress, onDeleteAddress }) {
  // Confirm before deleting
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (confirmDelete) {
      onDeleteAddress(id);
    }
  };

  return (
    <div className="address-list">
      <h3 className="list-title">📍 Saved Addresses</h3>
      {addresses.length === 0 ? (
        <p className="no-address">No addresses found.</p>
      ) : (
        <ul>
          {addresses.map((a, index) => (
            <li key={a.id} className="address-item">
              <div className="address-header">
                <span className="address-label">Address {index + 1}</span>
              </div>
              <div className="address-body">
                <p>
                  <strong>Details:</strong> {a.address_details}
                </p>
                <p>
                  <strong>City:</strong> {a.city}
                </p>
                <p>
                  <strong>State:</strong> {a.state}
                </p>
                <p>
                  <strong>Pin Code:</strong> {a.pin_code}
                </p>
              </div>
              <div className="btn-group">
                <button className="edit-btn" onClick={() => onEditAddress(a)}>
                  ✏️ Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(a.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AddressList;
