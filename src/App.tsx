import * as React from 'react';
import './App.css';
import Layout from './framework/Layout';
import {BrowserRouter} from 'react-router-dom'
const App: React.FC = (props: any) => {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
