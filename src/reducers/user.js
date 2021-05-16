var userState = {
    user: {},
    session: '',
};

const userReducer = (state=userState,action) => {
    switch(action.type){
        case 'DISPLAY':
            return state;
        case 'SETUSERSTATE':
            return action.payload;
        case 'RESETSTATE':
            return userState;
        default:
            return state;
    }
}

export default userReducer;