//npm install redux

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

function tweetsReducer(state = [], action= {}){
    console.log(action)

    if(action.type === 'CARREGA_TWEETS'){
        
        const novoEstado = action.tweets
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
