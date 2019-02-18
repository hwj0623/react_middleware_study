import { handleActions, createAction } from 'redux-actions';

import axios from 'axios';
import { pender , applyPenders} from 'redux-pender';



function getPostAPI(postId){
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}

const GET_POST = 'GET_POST';

export const getPost = createAction( GET_POST, getPostAPI);

const initialState = {
    pending: false,
    error: false,
    data : {
        title:'',
        body:''
    }

}
/**
 * applyPenders 함수 사용시
 */
const reducer = handleActions({
    //다른 일반 액션 관리
}, initialState);
export default applyPenders(reducer, [
    {
        type: GET_POST,
        onSuccess: (state, action) =>{
            //성공시 작업
            const { title, body} = action.payload.data;
            return {
                data: {
                    title,
                    body
                }
            }
        },
        onCancel : (state, action ) =>{
            return {
                data: {
                    title : '취소됨',
                    body: '취소됨'
                }
            }
        }
    }
    //,다른 pender 액션들
    // {type: GET_SOMETHING, onSuccess: (state, action) => ... },
    // {type: GET_SOMETHING, onSuccess: (state, action) => ... },

])
/**
 * redux-pender 액션 구조는 Flux 표준을 따르므로 (github.com/acdlite/flux-standard-action)
 * createAction으로 액션을 생성할 수 있다.
 * 다만, 두번째 파라미터는 Promise를 반환하는 함수여야 한다.
 *
 * 비동기 작업 여러개 관리시 ...pender를 여러번 사용하거나 applyPenders 함수 사용
 */

// export default handleActions ({
//     ...pender({
//         type:GET_POST, //type이 주어지면 이 type에 접미사 붙인 액션 핸들러들이 담긴 객체를 생성한다.
//         /**
//          * 요청 중일 때와 실패했을 때 추가 작업이 있으면
//          * onPending : (state, action ) => state,
//          * onFailure : (state, action ) => state  추가 작성
//          */
//         onSuccess : (state, action )=>{
//             const {title, body} = action.payload.data;
//             return {
//                 data: {
//                     title,
//                     body
//                 }
//             }
//         }
//         //함수 생략시에는 기본값으로 (state, action) => state를 설정한다.
//         //state를 그대로 반환
//     })
// }, initialState);

/*
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
*/
