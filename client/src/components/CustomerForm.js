import React, { useState, useEffect } from "react"

function CustomerForm({ initialData, onSubmit }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Last Name:</label>
        <input
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Phone Number:</label>
        <input
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Save</button>
    </form>
  );
}

export default CustomerForm;
