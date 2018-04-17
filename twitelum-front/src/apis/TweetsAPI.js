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