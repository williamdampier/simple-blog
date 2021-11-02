import React, { useContext } from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import { AuthContext } from "../context";

import { publicRoutes, privateRoutes } from "../router/routes";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);
    console.log(isAuth)

    if (isLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                       
                    />
                )}
                <Redirect to='/posts'/>
            </Switch>

            :
            <Switch>
            {publicRoutes.map(route =>
                <Route 
                component={route.component} 
                path={route.path} 
                exact={route.exact}
                />
                
            )}
            <Redirect to='/login'/>
            </Switch>
        
    );
};


export default AppRouter;