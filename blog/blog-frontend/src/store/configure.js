/**
 * store 생성 함수 configure 구현
 * 서버사이드 렌더링시 서버에서도 호출하므로 함수를 별도로 만든다.
 * 앞서 만든 모듈들(base,editor, index, list, post) => combinReducers 로 합친다
 */

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import penderMiddleware from 'redux-pender';
import * as modules from './modules';

const reducers = combineReducers(modules);
const middlewares = [penderMiddleware()];

//dev mode
const isDev = process.env.NODE_ENV === 'development';
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;

//preloadedState 는 추후 서버사이드 렌더링 시 전달받는 초기 상태
const configure = (preloadedState) => createStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares)
));

export default configure;

