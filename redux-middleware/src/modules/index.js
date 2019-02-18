import { combineReducers } from 'redux';
import counter from './counter';
import post from './post';

/**
 * penderReducer는 루트 리듀서에 넣는다.
 * - 요청 상태 관리
 * penderReducer의 상태구조
 * {
 *      pending : {},
 *      success : {},
 *      failure : {}
 *  }
 *
 * - Promise기반 액션 디스패치하면 상태가 아래와 같이 변함
 *  {
 *      pending: {
 *          'ACTION_NAME' : true
 *      },
 *      success : {
 *          'ACTION_NAME' : false
 *      },
 *      failure : {
 *          'ACTION_NAME' : false
 *      }
 *  }
 *
 * - 성공적으로 요청이 끝난다면 다음과 같이 변한다.
 *  {
 *      pending: {
 *          'ACTION_NAME' : false
 *      },
 *      success : {
 *          'ACTION_NAME' : true
 *      },
 *      failure : {
 *          'ACTION_NAME' : false
 *      }
 *  }
 *
 * - 실패로 끝나면 failure 부분이 true
 */
import { penderReducer } from 'redux-pender';

export default combineReducers({
    counter,
    post,
    pender : penderReducer
});
