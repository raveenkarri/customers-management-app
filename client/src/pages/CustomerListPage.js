import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerList from "../components/CustomerList";
import "./CustomerListPage.css";

function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("ASC");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(false);

  const fetchCustomers = () => {
    axios
      .get("http://localhost:5000/api/customers", {
        params: { search, sortBy, order, page, limit },
      })
      .then((res) => {
        setCustomers(res.data.data);
        setHasMore(res.data.data.length >= limit);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, sortBy, order, page, limit]);

  return (
    <div className="customer-list-container">
      <h2>Customer List</h2>

      {/* Controls */}
      <div className="customer-controls">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="id">ID</option>
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
          <option value="phone_number">Phone</option>
        </select>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </div>

      {/* Customer List */}
      <CustomerList customers={customers} refresh={fetchCustomers} />


      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={!hasMore}>
          Next
        </button>
      </div>
    </div>
  );
}

export default CustomerListPage;
