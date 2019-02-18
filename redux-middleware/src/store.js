import { createStore, applyMiddleware } from 'redux';
import modules from './modules';
import {createLogger} from 'redux-logger';
import ReduxThunk from 'redux-thunk';

/**
 * ReduxThunk 미들웨어는 객체가 아닌 함수도 디스패치 가능
 * - 일반객체가 불가능한 지연 실행 등의 기능을 구현 가능
 * - 리턴 함수에서 dispatch, getState를 파라미터로 받게 하여 스토어 상태에도 접근 가능
 * - 액션 생성 함수가 아닌 thunk 생성 함수 : 객체가 아니라 함수를 반환하는 함수이므로
 * - thunk 생성 함수는 dispatch와 getState를 파라미터로 가지는 새로운 함수를 만들어서 반환해야 한다.
 */

/**
 * 로그 설정 커스터마이징
 * https://github.com/evenyrodionov/redux-logger#options
 */
const logger = createLogger();

const store = createStore(modules, applyMiddleware(logger, ReduxThunk))

export default store;
