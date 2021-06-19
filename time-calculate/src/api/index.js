import axios from 'axios';

const url = 'http://localhost:9000/';

export const fetchCountries = () => axios.get(`${url}country`);
export const calculateTime = (data) => axios.post(`${url}order/${data.code}/${data.type}`,data); 
