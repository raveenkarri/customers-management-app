
const db = require('../db');

// Create Customer
const createCustomer = (req, res) => {
    const { first_name, last_name, phone_number } = req.body;
    if (!first_name || !last_name || !phone_number) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = `INSERT INTO customers (first_name, last_name, phone_number) VALUES (?, ?, ?)`;
    db.run(sql, [first_name, last_name, phone_number], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message, message: "Error while inserting" });
        }
        res.json({
            message: "Customer added successfully",
            data: { id: this.lastID, first_name, last_name, phone_number }
        });
    });
};

// Get All Customers
const getCustomers = (req, res) => {
  const { search, sortBy = "id", order = "ASC", page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  let sql = "SELECT * FROM customers";
  let params = [];

  if (search) {
    sql += " WHERE first_name LIKE ? OR last_name LIKE ? OR phone_number LIKE ?";
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  sql += ` ORDER BY ${sortBy} ${order} LIMIT ? OFFSET ?`;
  params.push(Number(limit), Number(offset));

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "success", data: rows });
  });
};

// Get Single Customer
const getCustomerById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM customers WHERE id = ?";
    db.get(sql, [id], (err, row) => {
        if (err) return res.status(400).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Customer not found" });
        res.json({ message: "success", data: row });
    });
};

// Update Customer
const updateCustomer = (req, res) => {
    const { first_name, last_name, phone_number } = req.body;
    const { id } = req.params;

    const sql = "SELECT * FROM customers WHERE id = ?";
    db.get(sql, [id], (err, row) => {
        if (err) return res.status(400).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Customer not found" });

        const updatedRow = {
            first_name: first_name ?? row.first_name,
            last_name: last_name ?? row.last_name,
            phone_number: phone_number ?? row.phone_number
        };

        const updateSql = "UPDATE customers SET first_name=?, last_name=?, phone_number=? WHERE id=?";
        db.run(updateSql, [updatedRow.first_name, updatedRow.last_name, updatedRow.phone_number, id], function (err) {
            if (err) return res.status(400).json({ error: err.message, message: "Error while Updating" });
            res.json({ message: "Customer Updated successfully", data: { id, ...updatedRow } });
        });
    });
};

// Delete Customer
const deleteCustomer = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM customers WHERE id = ?";

    db.run(sql, [id], function (err) {
        if (err) return res.status(400).json({ error: err.message, message: "Error while deleting!" });
        if (this.changes === 0) return res.status(404).json({ message: "Customer Not Found" });
        res.status(200).json({ message: "Account Deleted Successfully!" });
    });
};

module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
