import * as React from 'react';
import './App.css';
import Layout from './framework/Layout';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from './store/context';
import { AppReducer } from './store/reducer';

const App: React.FC = (props: any) => {
  //contextValue是一个useReducer，就可以用 [state,action] = useContext() 的方式使用useContext了
  // 否则useContext无法解构出[state,action]，需要自己调用
  const contextValue = React.useReducer(AppReducer, {});
  return (
    <div className="App">
      <BrowserRouter>
        <Provider value={contextValue}>
          <Layout />
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
