import React from "react";
import profilePageReducer, {addPost, deletePost} from "./profilePageReducer";

let state = {
    posts: [
        {id: '1', post: 'How are you my dear friends', likeCounts: '60'},
        {id: '2', post: 'Its my first project', likeCounts: '67'}
    ],
};
it('length of state should be incremented', () => {
    let action = addPost('yoyoyoy');
    let newState=profilePageReducer(state, action)
    expect(newState.posts.length).toBe(3)
});
it('length of state should be decremented', () => {
    let action = deletePost(2);
    let newState = profilePageReducer(state,action)
    expect(newState.posts.length).toBe(2)
});
