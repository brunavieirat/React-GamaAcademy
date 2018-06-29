import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://arkevrock-api.herokuapp.com/'
});

export function searctTweets(hashtag) {
    return instance.get(`search/${hashtag}`)
}