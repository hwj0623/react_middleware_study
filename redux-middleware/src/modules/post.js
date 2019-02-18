import { handleActions, createAction } from 'redux-actions';

import axios from 'axios';

function getPostAPI(postId){
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}

const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

const getPostPending = createAction(GET_POST_PENDING);
const getPostSuccess = createAction(GET_POST_SUCCESS);
const getPostFailure = createAction(GET_POST_FAILURE);


export const getPost = (postId) => dispatch =>{
    //먼저 요청이 시작함을 알림 -- GET_POST_PENDING 상태
    dispatch(getPostPending());

    //요청 시작. promise를 리턴해야 나중에 컴포넌트 호출시 getPost().then(...) 가능
    return getPostAPI (postId).then((response)=> {
        //요청이 성공시 서버 응답 내용을 payload로 설정하여
        //GET_POST_SUCCESS 액션을 디스패치 함
        dispatch(getPostSuccess(response))

        //나중에 getPostAPI.then 시 then 에 전달하는
        //함수에서 response에 접근할 수 있게 한다.
        return response;
    }).catch(error =>{
        //오류 발생시 오류 내용을 payload로 설정하여
        //GET_POST_FAILURE 액션을 디스패치
        dispatch(getPostFailure(error))
        //error를 던져서 다시 한 번 catch 할 수 있도록 함
        throw (error);
    })
}

const initialState = {
    pending: false,
    error: false,
    data : {
        title:'',
        body:''
    }

}

export default handleActions({
    [GET_POST_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        }
    },
    [GET_POST_SUCCESS]: (state, action )=>{
        const {title, body} = action.payload.data;
        return{
            ...state,
            pending:false,
            data:{
                title,
                body
            }
        }
    },
    [GET_POST_FAILURE] : (state, action) => {
        return {
            ...state,
            pending: false,
            error : true
        }
    }
},initialState);