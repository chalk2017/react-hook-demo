
import * as React from 'react';
import {
    Route,
    Switch
} from "react-router-dom";
import Login from '../components/login';
import Home from '../components/home';

const Routers: React.FC = (props: any) => {
    return (
        <Route render={({ location }) => {
            return (
                <Switch key={location.pathname}>
                    <Route location={location} exact={true} path="/login" component={Login} />
                    <Route location={location} exact={true} path="/home" component={Home} />
                    {/*<Route component={NoMatch}/>*/}
                </Switch>
            )
        }} />
    );
}

export default Routers;