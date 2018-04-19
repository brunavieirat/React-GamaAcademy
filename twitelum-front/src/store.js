//npm install redux

import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

function tweetsReducer(state={ lista:[], tweetAtivo:{} }, action= {}){
  //  console.log(action)

    if(action.type === 'CARREGA_TWEETS'){
        
        const novoEstado = { ...state,
             lista:action.tweets
        }
        return novoEstado
    }

    if(action.type === 'ADICIONA_TWEET'){
        
     //   console.warn('oq ta acontecendo', action.type, state)

        const novoEstado ={ ...state,
            lista: [action.novoTweet, ...state.lista]
        }
        return novoEstado
    }


    if(action.type === 'REMOVE_TWEET'){
        
       // console.warn('oq ta REMOVENDO', state)
       // console.log(action.tweets)
        const novoEstado ={
            ...state,
             lista: state.lista.filter((tweetAtual)=> tweetAtual._id !== action.idTweet),
            
            }
        
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

    if(action.type === 'ADD_TWEET_ATIVO'){
        
            const tweetAtivo = state.lista
                  .find((tweetAtual) => tweetAtual._id === action.idTweet)
        

        const novoEstado = {
            ...state,
            tweetAtivo: tweetAtivo
        }

        return novoEstado

    }

    if(action.type === 'REMOVE_TWEET_ATIVO'){
    
        return{
            ...state,
            tweetAtivo: {}
        }
    
    }

    if(action.type === 'LIKE_TWEET'){
       
       console.log(action)

       const tweetsAtualizados = state.lista.map((tweetAtual) => {
          if(tweetAtual._id === action.idTweet ){

            const { likeado, totalLikes } = tweetAtual

            tweetAtual.likeado = !likeado
            tweetAtual.totalLikes = likeado ? totalLikes-1 : totalLikes+1
              
        }

        
    
        return tweetAtual
    })

    return {

        ...state,
        lista: tweetsAtualizados 

    
    }
}



    return state

}

function notificacoesReducers(state = '', action ={}){

    if(action.type === 'ADD_NOTIFICACAO'){
        const novoEstado = action.msg
        
        return novoEstado
    }

    if(action.type === 'REMOVE_NOTIFICACAO'){
        const novoEstado = ''
        
        return novoEstado
    }

    return state
}

const store = createStore(  
    combineReducers({
        tweets: tweetsReducer,
        notificacao: notificacoesReducers
    }),
    
    applyMiddleware(
        thunk
    )

)
 
export default store
