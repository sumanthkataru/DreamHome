const mongoose = require('mongoose');

const wishlistLandSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    landId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Land',
        required: true
    }
});


module.exports  = mongoose.model('WishlistLand', wishlistLandSchema);

