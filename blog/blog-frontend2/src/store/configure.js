/**
 * configure.js는 스토어 생성함수인 configure를 구현.
 *
 * - 별도의 스토어 생성 함수인 configure 만드는 이유?
 *  =>스토어를 클라이언트에서 생성하지만, 추후 서버사이드 렌더링 할 떄 서버에서도 호출해야 하므로
 *
 * - modules의 모듈들을 combineReducers로 합치고, penderMiddleware 적용
 * -
 */


import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import penderMiddleware from 'redux-pender';
import * as modules from './modules';

const reducers = combineReducers(modules);
const middlewares = [penderMiddleware()];

// 개발모드일때만 redux devtools 적용
const isDev = process.env.NODE_ENV === 'development';
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;

/**
 * preloadedState는 추후 서버사이드 렌더링 했을 때 전달받는 초기 상태를 의미
 */
const configure = (preloadedState) => createStore(reducers, preloadedState, composeEnhancers(
    applyMiddleware(...middlewares)
));

export default configure;