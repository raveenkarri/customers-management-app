import React, { useEffect, useState } from "react";
import axios from "axios";
import './AddressForm.css'

function AddressForm({ customerId, address, onSuccess }) {
  const [address_details, setAddressDetails] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin_code, setPinCode] = useState("");

  useEffect(() => {
    if (address) {
      setAddressDetails(address.address_details);
      setCity(address.city);
      setState(address.state);
      setPinCode(address.pin_code);
    }
  }, [address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { address_details, city, state, pin_code };

    try {
      if (address) {
        // Update existing address
        await axios.put(`https://customers-management-app.onrender.com/api/addresses/${address.id}`, payload);
      } else {
        // Add new address
        await axios.post(`https://customers-management-app.onrender.com/api/customers/${customerId}/addresses`, payload);
      }

      if (!address) {
        setAddressDetails("");
        setCity("");
        setState("");
        setPinCode("");
      }

      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <input
        value={address_details}
        onChange={(e) => setAddressDetails(e.target.value)}
        placeholder="Address Details"
        required
      />
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        required
      />
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="State"
        required
      />
      <input
        value={pin_code}
        onChange={(e) => setPinCode(e.target.value)}
        placeholder="Pin Code"
        required
      />
      <button type="submit">{address ? "Update" : "Add"} Address</button>
    </form>
  );
}

export default AddressForm;
