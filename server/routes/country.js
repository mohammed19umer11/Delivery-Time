import express from 'express';
import Country from '../model/country.js'

const router = express.Router();


router.get('', async (req,res)=>{
    const countries = await Country.find({});
    return res.status(200).json(countries);
} );


export default router;

