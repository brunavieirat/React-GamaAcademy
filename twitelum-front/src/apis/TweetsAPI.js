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

export const adiciona = (novoTweet) =>{
    return (dispatch) => {
    //const token = localStorage.getItem('TOKEN')

    if(novoTweet){
        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
            {
                method: 'POST',
                body: JSON.stringify({ conteudo: novoTweet })
            })
            .then((res) =>{
                return res.json()
            })
            .then((tweetPronto) => {

                dispatch({ type: 'ADICIONA_TWEET', novoTweet: tweetPronto })
                
                // console.log(this.state)

            })
        }
    }

}