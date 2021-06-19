import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

import order from './routes/order.js';
import country from './routes/country.js';

dotenv.config();
app.use(express.json());
app.use(cors());


app.get('',async (req,res)=>{
    return res.send("WELLCOME");
});
app.use('/order',order);
app.use('/country',country);



const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=> app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));
