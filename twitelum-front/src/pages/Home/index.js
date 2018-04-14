import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'


class Home extends Component {
    constructor() {
        super()
        this.state = {
            novoTweet: '',
            tweets: [],
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
                    tweets
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
                    novoTweet: ''

                })
                // console.log(this.state)

            })

    }

    removeTweet = (idTweet) => {

        const tweetsAtualizados = this.state.tweets.filter((tweetsAtual) => {
            return tweetsAtual._id !== idTweet
        })

        this.setState({
            tweets: tweetsAtualizados
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
                    tweets: tweetsAtualizados
                })
            })
    }

    abreModal = (idTweet) => {
        //  console.log('id', idTweet)
        const tweetAtivo = this.state
            .tweets
            .find((tweetAtual) => tweetAtual._id === idTweet)
    //    console.log(tweetAtivo)
       this.setState({
            tweetAtivo: tweetAtivo
        })

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
                        <Widget>
                            <div className="tweetsArea">


                                {this.state.tweets.length === 0 ?
                                    <div> Compartilhe seu primeiro Tweet </div> : false}



                                {this.state.tweets.map((tweetInfo) => {

                                    return <Tweet
                                        key={tweetInfo._id}
                                        texto={tweetInfo.conteudo}
                                        tweetInfo={tweetInfo}
                                        handleRemove={() => this.removeTweet(tweetInfo._id)}
                                        handleModal={() => this.abreModal(tweetInfo._id)}

                                    />
                                }
                                )}

                            </div>
                        </Widget>
                    </Dashboard>
                </div>

 {this.state.tweetAtivo._id &&
                            <Tweet
                            texto={this.state.tweetAtivo.conteudo}
                                        tweetInfo={this.state.tweetAtivo}
                                        handleRemove = {()=>{this.removeTweet(this.state.tweetAtivo._id)}}
                        
                        />}

            </Fragment>
        );
    }
}

export default Home;
