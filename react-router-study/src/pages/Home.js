import React from 'react';

/**
 *
 * history
 * - javascript에서 페이지 이동하는 로직 작성시 사용 (history.push('대상 url')
 * - 라우트로 사용된 컴포넌트가 받아오는 props 중 하나
 */
const Home = ({history}) => {
    return (
        <div>
            <h2>Home </h2>
            <button onClick={() => {
                history.push('/about/javascript')
            }} > 자바스크립트 사용하여 이동 </button>
        </div>
    )
};

export default Home;
