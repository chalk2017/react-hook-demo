import { handleActions } from 'redux-actions';

// 因为hook无法在路由跳转后保持状态，所以需要添加一个全局状态，控制menu开启或关闭
export const FrameworkReducer = handleActions({
    ['MENU_OPEN']: (state: any, action: any) => {
        console.log(state,action);
        return action.payload;
    },
}, {open:false});