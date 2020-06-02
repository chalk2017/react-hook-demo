import * as React from 'react';
// 创建context要指定初始值，这个初始值是<Provider>里value的初始值，
// 本工程里value的值是addReducer钩子返回项目，所以初始值的类型必须是 Array<any,Function>，
// Array<any,Function>类型的初始值实例就是 [{} as any,(()=>{}) as Function]
export const AppContext = React.createContext([{} as any,(()=>{}) as Function]);

export const Provider = AppContext.Provider;