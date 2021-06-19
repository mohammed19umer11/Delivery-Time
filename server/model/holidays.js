import mongoose from 'mongoose';


const holiday = mongoose.Schema({
    name : String,
    date : Date
},{_id : false});

const Holidays = mongoose.model('holidays',mongoose.Schema({
    _id : {type: mongoose.Types.ObjectId, ref: 'country'},
    code : String,
    holidays : [holiday]
}));

export default Holidays;