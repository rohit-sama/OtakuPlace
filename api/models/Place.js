const mongoose = require('mongoose');
const {Schema} = mongoose;

const PlaceSchema = new Schema({
    owner : {type : mongoose.Schema.Types.ObjectId, res: 'user'},
    ownername : String,
    title : String,
    address : String,
    photos : [String],
    description : String,
    extrainfo : String,
});

const PlaceModel = mongoose.model('place', PlaceSchema);
module.exports = PlaceModel;