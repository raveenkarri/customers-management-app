const db = require('../db');

// Add a new address for a customer
const createAddress = (req, res) => {
    const { id } = req.params;
    const { address_details, city, state, pin_code } = req.body;

    if (!address_details || !city || !state || !pin_code) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = `
        INSERT INTO addresses (customer_id, address_details, city, state, pin_code)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.run(sql, [id, address_details, city, state, pin_code], function (err) {
        if (err) return res.status(400).json({ error: err.message });

        res.json({
            message: "Address added successfully",
            data: {
                id: this.lastID,
                customer_id: id,
                address_details,
                city,
                state,
                pin_code
            }
        });
    });
};

// Get all addresses for a specific customer
const getAddressesByCustomer = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM addresses WHERE customer_id = ?";
    db.all(sql, [id], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "success", data: rows });
    });
};

// Update a specific address
const updateAddress = (req, res) => {
    const { addressId } = req.params;
    const { address_details, city, state, pin_code } = req.body;

    const sql = "SELECT * FROM addresses WHERE id = ?";
    db.get(sql, [addressId], (err, row) => {
        if (err) return res.status(400).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Address not found" });

        const updatedRow = {
            address_details: address_details ?? row.address_details,
            city: city ?? row.city,
            state: state ?? row.state,
            pin_code: pin_code ?? row.pin_code
        };

        const updateSql = `
            UPDATE addresses
            SET address_details=?, city=?, state=?, pin_code=?
            WHERE id=?
        `;
        db.run(updateSql, [updatedRow.address_details, updatedRow.city, updatedRow.state, updatedRow.pin_code, addressId], function (err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ message: "Address updated successfully", data: { id: addressId, ...updatedRow } });
        });
    });
};

// Delete a specific address
const deleteAddress = (req, res) => {
    const { addressId } = req.params;
    const sql = "DELETE FROM addresses WHERE id = ?";

    db.run(sql, [addressId], function (err) {
        if (err) return res.status(400).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "Address not found" });

        res.json({ message: "Address deleted successfully" });
    });
};


module.exports = {
    createAddress,
    getAddressesByCustomer,
    updateAddress,
    deleteAddress
};
