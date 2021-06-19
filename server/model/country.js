import mongoose from 'mongoose';

const working_hours = mongoose.Schema({
    start : Number,
    end : Number,
    shift : Number 
},{ _id : false })
const Country = mongoose.model('country',mongoose.Schema({
    name : String,
    code : String,
    hours : working_hours
}));
export default Country;