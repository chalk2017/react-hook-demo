
export const FrameworkReducer = (state:any, action:any) => {
    let init_state = { open: false };
    console.log(state,action);
    return action || init_state;
}