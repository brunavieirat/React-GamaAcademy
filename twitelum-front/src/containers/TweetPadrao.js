import Tweet from '../components/Tweet'
import { connect } from 'react-redux'
import * as TweetsAPI from '../apis/TweetsAPI'



//class TweetPadrao extends Component {
    //handleRemove () { store.dispatch(TweetsAPI.remove())}
    //render(){
        //return (
            //<Tweet handleRemove={ handleRemove } />

      //  )
   // }

//}

const mapDispatchToProps = (dispatch, props) =>{
    return {

        handleRemove: () =>{
            dispatch(TweetsAPI.remove(props.tweetInfo._id))
        }
        
    }

}

const TweetPadraoContainer = connect(null, mapDispatchToProps)(Tweet)

export default TweetPadraoContainer