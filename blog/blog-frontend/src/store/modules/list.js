import {createAction, handleActions} from 'redux-actions';

import {Map, List, fromJS} from 'immutable';
import {pender} from 'redux-pender';
import * as api from '../../lib/api';

/**
 * getPostList 위한 list 모듈 생성
 *
 */
//action types
const GET_POST_LIST = 'list/GET_POST_LIST';

//action creators
export const getPostList = createAction(GET_POST_LIST, api.getPostList, meta => meta);

//initialstate

const initialState = Map({
    posts: List(), /** 포스트 목록 데이터 */
    lastPage: null  /** 마지막 페이지 알려주는 상태값 */
});

//reducer
/**
 * 이전에 API 작성시 Last-Page라는 커스텀 http header를 넣어 응답하도록 코드 작성함.
 * 이를 action.payload.headers['last-page'] 에서 읽어오도록 조치
 */
export default handleActions({
    ...pender({
        type: GET_POST_LIST,
        onSuccess: (state, action) => {
            const {data: posts} = action.payload;

            const lastPage = action.payload.headers['last-page'];
            return state.set('posts', fromJS(posts))
                        .set('lastPage', parseInt(lastPage, 10));
        }
    })
}, initialState);
