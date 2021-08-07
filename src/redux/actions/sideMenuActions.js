import * as sideMenuApi from '../../api/sideMenuApi';

export const fetchSideMenu = ()=> async (dispatch) =>{
    try {
        const {data} = await sideMenuApi.getSideMenu();
        dispatch({type:'FETCH', payload:data});
    } catch (error) {
        console.log(error);
    }
};