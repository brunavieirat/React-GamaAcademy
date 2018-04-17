//npm install redux

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

function tweetsReducer(state = [], action= {}){
    console.log(action)

    if(action.type === 'CARREGA_TWEETS'){
        
        const novoEstado = action.tweets
        return novoEstado
    }

    if(action.type === 'ADICIONA_TWEET'){
        
        console.warn('oq ta acontecendo', action.type, state)

        const novoEstado = [action.novoTweet, ...state]
        return novoEstado
    }

    return state

}

const store = createStore(  
    
    tweetsReducer,
    applyMiddleware(
        thunk
    )

)
 
export default store
