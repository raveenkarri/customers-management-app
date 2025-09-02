
const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customerRoutes');
const addressRoutes = require('./routes/addressRoutes')

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api', addressRoutes)

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app