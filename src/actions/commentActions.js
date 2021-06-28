import { FETCH_COMMENTS, NEW_COMMENT } from './types';
import axios from 'axios';

//each action creator is a function
//thunk middleware allows us to call dispatch function directly so we can make asynchronous requests
//dispatch is like resolving a promise; dispatch allows for sending of data
export const fetchComments = () => dispatch => {
    // axios.get('https://my-json-server.typicode.com/Hower16/CommentsJSON/comments')
    //     .then(comments => dispatch({
    //         type: FETCH_COMMENTS,
    //         payload: comments.data
    // }));
}

export const createComment = (postComment) => dispatch => {
    // axios.post('https://my-json-server.typicode.com/Hower16/CommentsJSON/comments',{
    //         author: postComment.author,
    //         body: postComment.body
    //     })
    //     .then(comment => dispatch({
    //         type: NEW_COMMENT,
    //         payload: comment.data
    // }));
}
