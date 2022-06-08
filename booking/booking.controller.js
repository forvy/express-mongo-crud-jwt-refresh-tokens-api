const express = require('express');
const router = express.Router();
const bookingService = require('./booking.service');

// routes
router.post('/cancelBooking', cancelBooking);

module.exports = router;

function cancelBooking(req, res, next) {
    bookingService.cancelBooking(req.body)
        .then(book => book ? res.json(book) : res.sendStatus(404))
        .catch(next);
}