//npm install redux

import { createStore } from 'redux'

function tweetsReducer(state = [], action= {}){
    console.log(action)

    if(action.type === 'CARREGA_TWEETS'){
        
        const novoEstado = action.tweets
        return novoEstado
    }

    return state

}

const store = createStore(tweetsReducer)
 
export default store
