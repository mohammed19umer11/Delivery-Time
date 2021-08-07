const reducer = (sideMenu = [], action) => {
    if(action.type === 'FETCH'){
        return action.payload;
    }
    else {
        return sideMenu;
    }
};

export default reducer;