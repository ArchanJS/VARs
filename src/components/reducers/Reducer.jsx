export const initialState=localStorage.getItem("VARsToken")?true: false;

export const reducer=(state, action)=>{
    if(action.type==="USER"){
        return action.payload;
    }
    return state;
}