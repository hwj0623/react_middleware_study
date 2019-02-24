/**
 * Store 생성함수 -- configure 구현
 * 클라이언트에서 스토어 생성하지만
 * 서버사이드 렌더링 할 떄 서버에서도 호출해야 하므로
 * 함수를 따로 만드는 것이 유리
 */

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import penderMiddleware from 'redux-pender';
import * as modules from './modules';

const reducers = combineReducers ( modules )
const middlewares = [penderMiddleware () ];

//개발 모드일 때만 Redux Devtools를 적용한다 (isDev)
const isDev = process.env.NODE_ENV === 'development';
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE;
const composeEnhancers = devtools || compose;


//preloadedState는 추후 서버사이드 렌더링 시 전달받는 초기 상태
const configure = (preloadedState) => createStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
)

export default configure;
