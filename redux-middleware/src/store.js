import { createStore, applyMiddleware } from 'redux';
import modules from './modules';

import {createLogger} from 'redux-logger';
import penderMiddleware from 'redux-pender';
/**
 * penderMiddleware
 * - Promise 기반 액션들을 관리하는 미들웨어가 포함된 라이브러리
 * - redux-promise-middleware와 유사
 * - 액션 객체 안에 payload가 Promise 형태라면 시작하기 전, 완료, 실패 뒤에 PENDING, SUCCESS, FAILURE 접미사 붙여줌
 * - 요청 관리 리듀서가 포함됨
 * - 요청 관련 액션들을 처리하는 액션 핸들러 함수 자동 생성 가능
 * - 요청 중인 액션 취소 기능 내장
 *
 */

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

const store = createStore(modules, applyMiddleware(logger, penderMiddleware() ))

export default store;
