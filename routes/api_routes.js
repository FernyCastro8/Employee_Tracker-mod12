const router = require('express').Router();
const staff = require('../models/staff');


//  Select all from staffs - return all staffs
router.get('/staff', (req, res) => {
    staff.findAll().then(staffs => {
        res.send(staffs);
    });
});

// Create a new staff line up
router.post('/staff', (req, res) => {
    const staffData = req.body;
});


module.exports = router;


