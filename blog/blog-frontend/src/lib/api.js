/**
 * 글 작성 REST API 함수 생성
 *
 */

import axios from 'axios';

export const writePost = ({title, body, tags}) => axios.post('/api/posts', {title, body, tags});


