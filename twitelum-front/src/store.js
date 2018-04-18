//npm install redux

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

function tweetsReducer(state = [], action= {}){
  //  console.log(action)

    if(action.type === 'CARREGA_TWEETS'){
        
        const novoEstado = action.tweets
        return novoEstado
    }

    if(action.type === 'ADICIONA_TWEET'){
        
     //   console.warn('oq ta acontecendo', action.type, state)

        const novoEstado = [action.novoTweet, ...state]
        return novoEstado
    }


    if(action.type === 'REMOVE_TWEET'){
        
       // console.warn('oq ta REMOVENDO', state)
       // console.log(action.tweets)
        const novoEstado = state.filter((tweetAtual)=> tweetAtual._id !== action.idTweet)
        
       return novoEstado

        //const tweetsAtualizados = state.tweets.filter((tweetAtual) => tweetAtual._id !== state.novoTweet.id)
     /*   const novoEstado = [action.tweets.filter((tweetAtual)=> tweetAtual._id !== idTweet)]

        const tweetsAtualizados = this
        .state.tweets.filter((tweetAtual) => tweetAtual._id !== idTweet)
    this.setState({
        tweets: tweetsAtualizados

        const novoEstado = [action.novoTweet, ...state]
        return novoEstado */
       // console.log(tweetsAtualizados)
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
