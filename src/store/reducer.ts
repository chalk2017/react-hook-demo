
export const AppReducer = (state:any, action:any) => {
    let init_state = {};
    console.log(state,action);
    return action || init_state;
}