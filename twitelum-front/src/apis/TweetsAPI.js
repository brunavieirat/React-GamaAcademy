export const carrega = () => {

    return (dispatch) => {

        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
            .then((res) => res.json())
            .then((tweetsServer) => {

                dispatch({ type: 'CARREGA_TWEETS', tweets: tweetsServer })
                /* this.setState({
                     tweetsServer
                 })*/
            })
    }

}

export const adiciona = (novoTweet) => {
    return (dispatch) => {
        //const token = localStorage.getItem('TOKEN')

        if (novoTweet) {
            fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
                {
                    method: 'POST',
                    body: JSON.stringify({ conteudo: novoTweet })
                })
                .then((res) => {
                    return res.json()
                })
                .then((tweetPronto) => {

                    dispatch({ type: 'ADICIONA_TWEET', novoTweet: tweetPronto })

                    // console.log(this.state)

                })
        }
    }

}

export const remove = (idTweet) => {

    return (dispatch) => {

        fetch(`http://localhost:3001/tweets/${idTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
            {
                method: 'DELETE'
            })
            .then((res) => res.json())
            .then((resPronto) => {
                dispatch({ type: 'REMOVE_TWEET', idTweet: idTweet })
                dispatch({ type: 'REMOVE_TWEET_ATIVO' })

                console.log('teste dispatch remover')
            })
    }
}

export const like = (idTweet) => {

    return (dispatch) => {

        fetch(`http://localhost:3001/tweets/${idTweet}/like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
        {method: 'POST'})
        .then( res => res.json())
        //.then(res => console.log(res))

        dispatch({ type: 'LIKE_TWEET', idTweet })
    }
}