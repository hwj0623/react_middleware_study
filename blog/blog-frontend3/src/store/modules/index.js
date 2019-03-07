export {default as editor} from './editor';
export {default as list} from './list';
export {default as post} from './post';
export {default as base} from './base';
export {penderReducer as pender} from 'redux-pender';

/**
 * 모듈을 불러와 내보낼 인덱스 파일.
 * 비동기 액션을 관리하는 redux-pender의 penderReducer도 같이 내보낸다.
 */