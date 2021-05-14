import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import SignEn from './pages/SignEn';
import SignUp from './pages/SignUp';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/about">
                <About />
            </Route>
            <Route exact path="/signin">
                <SignEn />
            </Route>
            <Route exact path="/signup">
                <SignUp />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
}

export default Routes;