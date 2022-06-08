const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    booking_no: Number, 
    booking_date: Date, 
    schedule_date: Date, 
    booking_duration: Number, 
    room_no: Number, 
    total_price: Number, 
    status: String, 
    created_at: { type: Date, default: Date.now },
    created_by: String, 
    updated_at: Date,
    updated_by: String
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

module.exports = mongoose.model('Booking', schema);