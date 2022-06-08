const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    source_id: {type: Schema.Types.ObjectId, ref: 'Booking'}, 
    amount: Number, 
    created_at: { type: Date, default: Date.now },
    created_by: String, 
    updated_at: Date,
    updated_by: String
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

module.exports = mongoose.model('Income', schema);