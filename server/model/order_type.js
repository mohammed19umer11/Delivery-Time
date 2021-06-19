import mongoose from 'mongoose';


const Order = mongoose.model('order_type',mongoose.Schema({
    type : String,
    time : Number
}));
export default Order;