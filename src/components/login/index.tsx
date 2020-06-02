
import * as React from 'react';
import Button from '@material-ui/core/Button';
import {AppContext} from '../../store/context';

const Login: React.FC = (props: any) => {
    // useContext 全局状态
    const [appState, appDispatch] = React.useContext(AppContext);
    console.log(appState);
    return (
        <div>
            <div>这是login组件</div>
            <Button variant="contained" color="secondary" onClick={()=>{
                appDispatch({count:((appState.count||0)+1)})
            }}>全局状态计数器</Button>
        </div>
    );
}

export default Login;