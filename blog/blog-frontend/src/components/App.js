import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {ListPage, PostPage, EditorPage, NotFoundPage} from 'pages';

/**
 * 리액트 라우터의 Switch 컴포넌트
 *  - 설정된 라우트 중에서 일치하는 라우트 1개만을 보여줌
 *  - 맨 아래 설정된 NotFoundPage는 path 지정없으므로, 어떤 경우에도 렌더링이 가능
 *  - Switch로 감싸서 맨 먼저 매칭된 라우트 하나만을 보여준다.
 *
 */
const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={ListPage}/>
                <Route exact path="/page/:page" component={ListPage}/>
                <Route exact path="/tag/:tag/:page?" component={ListPage}/>
                <Route exact path="/post/:id" component={PostPage}/>
                <Route exact path="/editor" component={EditorPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    );
};

export default App;
