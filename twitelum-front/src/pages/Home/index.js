import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import Modal from '../../components/Modal'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            novoTweet: '',
            tweets: [],
            buscaTweets: [],
            login: localStorage.getItem('LOGIN'),
            tweetAtivo: {}
        }

        this.adicionaTweet = this.adicionaTweet.bind(this)
    }

    componentDidMount() {


        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
            .then((res) => res.json())
            .then((tweets) => {
                this.setState({
                    tweets,
                    buscaTweets: tweets
                })
            })
        
    }

    pegaValorInput = (event) => {
        this.setState({
            novoTweet: event.target.value
        })

    }

    adicionaTweet(e) {
        e.preventDefault()

        const novoTweet = this.state.novoTweet

        const token = localStorage.getItem('TOKEN')

        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${token}`,
            {
                method: 'POST',
                body: JSON.stringify({ conteudo: novoTweet })
            })
            .then(res => res.json())
            .then((tweetPronto) => {

                this.setState({
                    tweets: [tweetPronto, ...this.state.tweets],
                    buscaTweets: [tweetPronto, ...this.state.tweets],
                    novoTweet: ''

                })
                // console.log(this.state)

            })

    }

    buscaTweet = (textoTweet) => {

        const filtroTweet = this.state.tweets.filter((tweet) => {
            return  tweet.conteudo.indexOf(textoTweet) !== -1
        })

      //  console.log(filtroTweet)
        this.setState({
            buscaTweets: filtroTweet
        })

    //     var str = "Hello world, welcome to the universe.";
    // var n = str.includes("world");
    // document.getElementById("demo").innerHTML = n;

    }

    handleChange = (e) =>{
        const texto = e.target.value

        if(!texto){
           
            this.setState({
                buscaTweets: this.state.tweets
            })
            
        }
        else{
            this.buscaTweet(texto)
        }

        //console.log(this.state.tweets)
        //console.log('busca '+this.state.buscaTweets)
    }

    removeTweet = (idTweet) => {

        const tweetsAtualizados = this.state.tweets.filter((tweetsAtual) => {
            return tweetsAtual._id !== idTweet
        })

        this.setState({
            tweets: tweetsAtualizados,
            buscaTweets: tweetsAtualizados
        })

        fetch(`http://localhost:3001/tweets/${idTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
            {
                method: 'DELETE'
            })
            .then((res) => res.json())
            .then((resPronto) => {
                const tweetsAtualizados = this
                    .state.tweets.filter((tweetAtual) => tweetAtual._id !== idTweet)
                this.setState({
                    tweets: tweetsAtualizados,
                    buscaTweets: tweetsAtualizados
                })
            })
    }

    abreModal = (idTweet, event) => {
        //  console.log('id', idTweet)
        const ignoraModal = event.target.closest('.ignoraModal')
        // console.log(ignoraModal)
        if (!ignoraModal) {
            const tweetAtivo = this.state
                .tweets
                .find((tweetAtual) => tweetAtual._id === idTweet)
            //    console.log(tweetAtivo)
            this.setState({
                tweetAtivo: tweetAtivo
            })
        }
    }

    fechaModal = (event) => {
        const isModal = event.target.classList.contains('modal')
        if (isModal) {
            this.setState({
                tweetAtivo: {}
            })
        }
    }

    render() {
        return (
            <Fragment>
                <Cabecalho>

                    <NavMenu usuario="" login={this.state.login} />

                </Cabecalho>
                <div className="container">
                    <Dashboard>
                        <Widget>
                            <form className="novoTweet" onSubmit={this.adicionaTweet}>
                                <div className="novoTweet__editorArea">
                                    <span
                                        className={
                                            `novoTweet__status
                                         ${ this.state.novoTweet.length > 140
                                                ? 'novoTweet__status--invalido' : ''}
                                         
                                         `}>
                                        {this.state.novoTweet.length}/140</span>
                                    <textarea className="novoTweet__editor"
                                        value={this.state.novoTweet}
                                        onChange={this.pegaValorInput}
                                        placeholder="O que está acontecendo?"></textarea>
                                </div>
                                <button type="submit" className="novoTweet__envia"

                                    disabled={this.state.novoTweet.length > 140 || this.state.novoTweet === '' ? true : false}

                                >Tweetar</button>
                            </form>
                        </Widget>
                        <Widget>
                            <TrendsArea />
                        </Widget>
                    </Dashboard>
                    <Dashboard posicao="centro">

                    <input type="texto" onChange={this.handleChange} />

                        <Widget>
                            <div className="tweetsArea">


                                {this.state.tweets.length === 0 ?
                                    <div> Compartilhe seu primeiro Tweet </div> : false}


                                {this.state.buscaTweets.map((tweetInfo) => {

                                    return <Tweet
                                        key={tweetInfo._id}
                                        texto={tweetInfo.conteudo}
                                        tweetInfo={tweetInfo}
                                        handleRemove={() => this.removeTweet(tweetInfo._id)}
                                        handleModal={(event) => this.abreModal(tweetInfo._id, event)}

                                    />
                                }
                               
                                )}

                            </div>
                        </Widget>
                    </Dashboard>
                </div>



                <Modal isOpen={this.state.tweetAtivo._id} fechaModal={this.fechaModal}>
                    <Widget>
                        <Tweet
                            texto={this.state.tweetAtivo.conteudo || ''}
                            tweetInfo={this.state.tweetAtivo}
                            handleRemove={() => { this.removeTweet(this.state.tweetAtivo._id) }}
                        />
                    </Widget>
                </Modal>


            </Fragment >
        );
    }
}

export default Home;
