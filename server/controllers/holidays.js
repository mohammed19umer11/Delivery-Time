import Holidays from '../model/holidays.js';

export const isPublicHoliday = async (date,code) => {
    try {
        const {holidays} = await Holidays.findOne({code : code})
        if(holidays.find((holiday) => holiday.date.toDateString() === new Date(date).toDateString())) return true;
        return false;
    } catch (error) {
        console.log(error.message);
    }
    
};

export const isWeekEnd = async (date) => {
    try {
        const weekDay = new Date(date).getDay();
        if(weekDay === 6 || weekDay === 0) return true;
        return false;
    } catch (error) {
        console.log(error.message);
    }
};