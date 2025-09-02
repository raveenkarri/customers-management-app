const express = require('express');
const router = express.Router();
const { 
    createAddress, 
    getAddressesByCustomer, 
    updateAddress, 
    deleteAddress 
} = require('../controllers/addressController');

router.post('/customers/:id/addresses', createAddress);
router.get('/customers/:id/addresses', getAddressesByCustomer);
router.put('/addresses/:addressId', updateAddress);
router.delete('/addresses/:addressId', deleteAddress);

module.exports = router;
