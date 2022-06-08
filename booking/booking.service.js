const db = require('_helpers/db');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    cancelBooking
};

async function cancelBooking(body) {
    try {
        let response = 'Booking canceled.';
        let refund = 0;
        await db.Booking.findOne({booking_no: body.booking_no, booking_date: body.booking_date, status: { $ne: 'Canceled'}}, function (err, book) {
            if(!book) {response = 'No Data found'; return;}
            refund = refundRules(book);
            book.status = 'Canceled';
            book.updated_at = new Date();
            book.updated_by = body.updated_by ?? 'user';
        
            book.save(function (err) {
                if(err) {
                    return res.send(500, {error: err});
                }
                if (refund > 0) {
                    const income = new db.Income({
                        source_id: book._id, 
                        amount: refund*-1, 
                        created_by: "user",
                        updated_at: null,
                        updated_by: null
                    });
                    income.save(function (err) {
                        if (err) return err;
                    });
                    
                }
            });
        });
        if (refund > 0) return `Booking canceled. Refunded: ${refund}`;
        return response;
    } catch (err) {
        return err;
    }
}


// helper
function refundRules(body) {
    const hourDiff = (body.schedule_date - new Date())/ 36e5;
    if (hourDiff > 0 && hourDiff <= 48) return body.total_price * .5;
    if (hourDiff < 0 && hourDiff > -1 && body.status.toLowerCase() === 'active') return body.total_price * .75;
    if (hourDiff > 48) return body.total_price;
    return 0;
}