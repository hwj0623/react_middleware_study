/**
 * 글 작성 REST API 함수 생성
 * 클라이언트에서 호출할 REST API 함수들을 저장
 */

import axios from 'axios';
import queryString from 'query-string';


/** 포스트 작성하기 */
export const writePost = ({title, body, tags}) => axios.post('/api/posts', { title, body, tags });

/** 포스트 보여주기 */
export const getPost = (id) => axios.get(`/api/posts/${id}`);

/** 포스트 리스트 조회
 *  queryString.stringify - 객체를 URL 쿼리 문자열로 변환시 사용
 *  queryString.stringify ({ param1, param2 } ) 구조
 *  - 나중에 백엔드에서 전달받은 파라미터는 ctx.query.param1, ctx.query.param2 이런 식으로 찾는다.
 */
export const getPostList = ({ tag, page }) => axios.get(`/api/posts/?${queryString.stringify({ tag, page })}`);

