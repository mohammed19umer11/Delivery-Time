import Country from '../model/country.js';
import Order from '../model/order_type.js';
import {isPublicHoliday, isWeekEnd} from '../controllers/holidays.js';

export const calculateTime = async (req,res)=>{
    const data = req.body;
    try {
        var expectedTime = 0;
        const {hours:{start,end,shift}} = await Country.findOne({code : data.code});
        const orderType = await Order.findOne({type : data.type})
        const orderTime = data.time;
        const orderDate = new Date(data.date);
        console.log(orderDate);
        if(await isPublicHoliday(new Date(orderDate),data.code)){
            console.log('Public Holiday check');
            expectedTime+=(24-orderTime+orderType.time);
            if(expectedTime+orderTime>24){
                let nextDate = new Date(orderDate);
                nextDate.setDate(nextDate.getDate()+(Math.floor((expectedTime+orderTime)/24)));
                while(await isPublicHoliday(nextDate,data.code)){
                    console.log('Next date is also a public holiday');
                    expectedTime+=24;
                    nextDate.setDate(nextDate.getDate()+1);
                }
            }
            expectedTime+=start;
        }
        else if(await isWeekEnd(new Date(orderDate))){
            console.log('Weekend check');
            expectedTime+=(24-orderTime)+orderType.time;
            if(expectedTime+orderTime>24){
                let nextDate = new Date(orderDate);
                nextDate.setDate(nextDate.getDate()+(Math.floor((expectedTime+orderTime)/24)));
                while(await isWeekEnd(nextDate)){
                    console.log('Next date is also a weekend');
                    expectedTime+=24;
                    nextDate.setDate(nextDate.getDate()+1);
                }
            }
            expectedTime+=start;
        }
        else if(orderTime>=start && orderTime<end){
            console.log('Order before closed');
            expectedTime+=(end-orderTime)+orderType.time;
            if(expectedTime>=shift){
                expectedTime+=(24-orderTime)+start;
            }
            if(expectedTime+orderTime>24){
                let nextDate = new Date(orderDate);
                nextDate.setDate(nextDate.getDate()+(Math.floor((expectedTime+orderTime)/24)));
                while(await isPublicHoliday(nextDate,data.code) || await isWeekEnd(nextDate) ){
                    expectedTime+=24;
                    nextDate.setDate(nextDate.getDate()+1);
                }
            }
        }
        else if(orderTime>=end){
            console.log('Order after closed');
            expectedTime+=(24-orderTime)+start+orderType.time; 
            if(orderType.time>shift){
                expectedTime+=(24-end)+start;
            }
            if(expectedTime+orderTime>24){
                console.log('Next day check');
                let nextDate = new Date(orderDate);
                nextDate.setDate(nextDate.getDate()+(Math.floor((expectedTime+orderTime)/24)));
                while(await isPublicHoliday(nextDate,data.code) || await isWeekEnd(nextDate) ){
                    expectedTime+=24;
                    nextDate.setDate(nextDate.getDate()+1);
                }
            }
        }
        else if(orderTime<start){
            console.log('Order before open');
            expectedTime+=(start-orderTime)+orderType.time; 
            if(orderType.time>shift){
                expectedTime+=(24-end);
            }
            if(expectedTime+orderTime>24){
                console.log('Next day check');
                let nextDate = new Date(orderDate);
                nextDate.setDate(nextDate.getDate()+(Math.floor((expectedTime+orderTime)/24)));
                console.log(nextDate);
                while(await isPublicHoliday(nextDate,data.code) || await isWeekEnd(nextDate) ){
                    expectedTime+=24;
                    nextDate.setDate(nextDate.getDate()+1);
                }
            }
            expectedTime+=start;
        }
        console.log(`Expected Time ${expectedTime}`);
        return res.send({expectedTime});
    } catch (error) {
        return res.status(404).json({
            message:error.message
        });
    }
};


