const mongoose = require('mongoose');

const wishlistHouseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    houseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House',
        required: true
    }
});


module.exports  = mongoose.model('WishlistHouse', wishlistHouseSchema);

