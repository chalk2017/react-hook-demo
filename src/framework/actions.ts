import {createAction} from 'redux-actions'; //
//创建action
export const menuOpenAction = createAction('MENU_OPEN',(inState:any)=>{
    console.log(inState);
    //这里写拦截器
    return inState;
});
