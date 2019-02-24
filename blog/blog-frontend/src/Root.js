import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import App from 'components/App'

import {Provider} from 'react-redux';
import configure from 'store/configure';

/**
 * App 컴포넌트 대신 Root 컴포넌트 생성 (src/Root.js)
 * - 클라이언트 쪽에서만 사용하므로
 * App 컴포넌트는 components/App 에 생성.
 * Root 컴포넌트는 App 컴포넌트를 웹 브라우저에서 사용하는 라우터인 BrowerRouter 컴포넌트 안에 감싼다.
 * - 이후 서버사이드 렌더링 구현시 서버 렌더링 전용 라우터인 StaticRouter 컴포넌트에 App을 감싸서 사용한다.
 */

const store = configure();

const Root = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    )
}

export default Root;
