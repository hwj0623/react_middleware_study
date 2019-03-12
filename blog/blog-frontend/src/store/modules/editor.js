import {createAction, handleActions} from 'redux-actions';

import {Map} from 'immutable';
import {pender} from 'redux-pender';

import * as api from '../../lib/api';


// action types
const INITIALIZE = 'editor/INITIALIZE';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';
const WRITE_POST = 'editor/WRITE_POST';


//action creators  액션 생성
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const writePost = createAction(WRITE_POST, api.writePost);

//initialstate
const initialState = Map({
    title: '',
    markdown: '',
    tags: '',
    postId: null    /** api 요청시 서버의 응답 _id 값 받아와 editor 리덕스 모듈에서 사용하는 state */
});

//reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        const {name, value} = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type:WRITE_POST,
        onSuccess: (state, action) => {
            const {_id } = action.payload.data;
            return state.set('postId', _id);
        }
    })

}, initialState);
