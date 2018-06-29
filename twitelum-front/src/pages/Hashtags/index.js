import React, { Component, Fragment } from 'react';
import * as apiTwiteer from '../../api/twitter'

class Hashtags extends Component {

    constructor (){
        super()

        this.state ={


        }

componentDidMount(){
    apiTwiteer.searctTweets('teste')
    .then(response =>{

        this.setState({
            statuses: response.data.statuses
        })
        .catch(error =>{
            console.log("Erro ao carregar api hashtags ", error )
        })
    })
}

        }

        render(){


        }

    }

    return (



    )
    
}

export default Hashtags;
