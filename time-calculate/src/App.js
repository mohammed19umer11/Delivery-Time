import React, {useState,useEffect} from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {makeStyles} from '@material-ui/core';
import {Paper,Button,Select,MenuItem,InputLabel,Typography,ThemeProvider} from '@material-ui/core';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import theme from './theme.js';


import * as api from '../src/api';

const useStyles = makeStyles((theme)=>({
  paper:{
    padding:theme.spacing(2),
  },
  form:{
    display: 'flex',
    flexDirection:'column',
  },
  gap:{
    marginBottom:theme.spacing(3)
  },
  button:{
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
}));

function App() {
  const classes = useStyles();
  const [Data, setData] = useState({
    code :"",
    type : "",
    date : new Date(),
    time : new Date().getHours()
  });
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState("");
  const [type, settype] = useState("");
  const [date, setdate] = useState(new Date());
  const [deliveryTime, setdeliveryTime] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data} = await api.calculateTime(Data);
    setdeliveryTime(data.expectedTime);
  }

  useEffect(async ()=>{
    try {
      var response = await api.fetchCountries();
      setcountries(response.data);
    } catch (error) {
      console.log(error)
    }
  },[]);
  
  
  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.paper}>
            <form 
                className={classes.form}
                autoComplete="off" 
                onSubmit={handleSubmit}>
                    <div className={classes.gap}>
                      <InputLabel>Country</InputLabel>
                      <Select
                        required
                        variant='outlined'
                        value={country}
                        onChange={(e)=> {
                          console.log(e.target.value);
                          setData({...Data,code:e.target.value.trim()});
                          setcountry(e.target.value)
                        }}>
                          {
                            countries.map((country)=>(
                              <MenuItem key={country._id} value={country.code}>{country.name}</MenuItem>
                            ))
                          }
                      </Select>
                    </div>
                    <div className={classes.gap}>
                      <InputLabel>Order Type</InputLabel>
                      <Select
                        required
                        variant='outlined'
                        value={type}
                        onChange={(e)=> {
                          console.log(e.target.value);
                          setData({...Data,type:e.target.value.trim().toLowerCase()});
                          settype(e.target.value)
                        }}>
                          <MenuItem value={"urgent"}>Urgent</MenuItem>
                          <MenuItem value={"normal"}>Normal</MenuItem>
                      </Select>
                    </div>
                    <div className={classes.gap}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker 
                            disableToolbar
                            variant='inline'
                            margin="normal"
                            label="Date"
                            views={['year', 'month', 'date']}
                            value={date}
                            format="dd/MM/yyyy"
                            onChange={(date)=>{
                              setdate(date)
                              console.log(date.getHours())
                              console.log(date)
                              setData({...Data,
                                date,
                                time:date.getHours()});
                            }}
                            KeyboardButtonProps={{'aria-label': 'change date'}}/>
                      </MuiPickersUtilsProvider>
                    </div>
                    <div className={classes.button}>
                      <div>
                        <Typography>{deliveryTime ? `Delivery Time : ${deliveryTime} hours` : ``}</Typography>
                      </div>
                      <Button
                          variant='outlined' color='primary' size='small' type='submit'>
                              Delivery Time
                      </Button>
                    </div>                    
            </ form>
        </Paper>
    </ThemeProvider>
  );
}

export default App;
