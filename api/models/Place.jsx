const mongooose = require('mongoose');

const PlaceSchema = new mongooose.Schema({
    owner : {type : mongooose.Schema.Types.ObjectId, res: 'user'},
    title : String,
    address : String,
    photos : [String],
    description : String,
    perks : [String],
    extraInfo : String,
});

const PlaceModel = mongooose.model('place', PlaceSchema);
module.exports = PlaceModel;