import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/LoginPage'

const Roteamento = () => {
    return (

        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route path="*" component={() => (<div> Page 404 Not Found  </div>)} />
        </Switch>
    )
}
export default Roteamento