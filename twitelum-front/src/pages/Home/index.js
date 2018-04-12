import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'


class Home extends Component {
constructor(){
    super()
    this.state={
        novoTweet: '',
        tweets: []
    }

    this.adicionaTweet = this.adicionaTweet.bind(this)
}

pegaValorInput=(event) => {
    this.setState({
         novoTweet: event.target.value
        })
   
    
    }

adicionaTweet(e){
    e.preventDefault()

    const novoTweet = this.state.novoTweet
    //const tweets = this.state.tweets

    this.setState({
        tweets:[novoTweet, ...this.state.tweets],
        novoTweet: ''
    })
   
    
}

    render() {
        return (
            <Fragment>
                <Cabecalho>
                    <NavMenu usuario="@omariosouto" />
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
                                        ? 'novoTweet__status--invalido' : '' }
                                         
                                         `}> 
                                         { this.state.novoTweet.length }/140</span>
                                    <textarea className="novoTweet__editor" 
                                    value={ this.state.novoTweet}
                                    onChange={ this.pegaValorInput }
                                    placeholder="O que está acontecendo?"></textarea>
                                </div>
                                <button type="submit" className="novoTweet__envia"
                                disabled={ this.state.novoTweet.length > 140 ? true : false}
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
                           
                            
                            {this.state.tweets.length===0 ?
                                <div> Compartilhe seu primeiro Tweet </div> : false}
                            
                          

                            {this.state.tweets.map((novoTweet) =>{
                            
                            return <Tweet 
                            key={novoTweet}
                            texto={novoTweet} 
                            />
                            }
                            )}
                                
                            </div>
                        </Widget>
                    </Dashboard>
                </div>
            </Fragment>
        );
    }
}

export default Home;
