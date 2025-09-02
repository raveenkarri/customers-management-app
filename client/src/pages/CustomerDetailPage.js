import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AddressList from "../components/AddressList";
import AddressForm from "../components/AddressForm";
import "./CustomerDetailPage.css";

function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    fetchCustomer();
    fetchAddresses();
  }, [id]);

  const fetchCustomer = () => {
    axios
      .get(`http://localhost:5000/api/customers/${id}`)
      .then((res) => setCustomer(res.data.data))
      .catch((err) => console.error(err));
  };

  const fetchAddresses = () => {
    axios
      .get(`http://localhost:5000/api/customers/${id}/addresses`)
      .then((res) => setAddresses(res.data.data))
      .catch((err) => console.error(err));
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      await axios
        .delete(`http://localhost:5000/api/addresses/${addressId}`)
        .then(fetchAddresses)
        .catch((err) => console.error(err));
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleEditCustomer = () => {
    navigate(`/customers/${id}/edit`);
  };

  return (
    <div className="customer-detail-container">
      {customer && (
        <>
          <h2>
           Full Name: {customer.first_name} {customer.last_name}
          </h2>
          <p className="customer-info">📞 Phone: {customer.phone_number}</p>

          {/* Edit Customer Button */}
          <button
            className="action-btn edit-customer-btn"
            onClick={handleEditCustomer}
          >
            ✏️ Edit Customer
          </button>

          <h3>Addresses</h3>
          {addresses.length === 1 && <h3>Only One Address!</h3>}

          <AddressList
            addresses={addresses}
            onEditAddress={handleEditAddress}
            onDeleteAddress={handleDeleteAddress}
          />

          {/* Address Form for Add/Edit */}
          {showAddressForm ? (
            <AddressForm
              customerId={id}
              address={editingAddress}
              onSuccess={() => {
                setShowAddressForm(false);
                setEditingAddress(null);
                fetchAddresses();
              }}
            />
          ) : (
            <button
              className="action-btn add-address-btn"
              onClick={() => setShowAddressForm(true)}
            >
              ➕ Add Address
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default CustomerDetailPage;
