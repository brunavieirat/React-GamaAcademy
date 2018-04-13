import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/LoginPage'

class PrivateRoute extends Component {

    estaAutenticado(){

        if(localStorage.getItem('TOKEN')){
            return true
            
        }
        return false
    }

    render(){
        const Component = this.props.component
        const props = this.props

        if(this.estaAutenticado()){                    

        return (
            <Route render={() =><Component {...props} /> }/>
                
        )        
    }
        return (<Redirect to = "/login" />)
    }

}

const Roteamento = () => {
    return (

        <Switch>
            <PrivateRoute path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route path="*" component={() => (<div> Page 404 Not Found  </div>)} />
        </Switch>
    )
}
export default Roteamento