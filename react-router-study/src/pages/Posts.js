import React from 'react';
import {Post} from 'pages';
import {Link, Route} from 'react-router-dom';

/**
 * Post 목록을 보여줄 Posts 페이지 컴포넌트
 */
const Posts = ({match}) => {
    return (
        <div>
            <h3> Post List</h3>
            <ul>
                <li><Link to={`${match.url}/1`}>Post #1</Link></li>
                <li><Link to={`${match.url}/2`}>Post #2</Link></li>
                <li><Link to={`${match.url}/3`}>Post #3</Link></li>
            </ul>
            <Route exact path={match.url} render={() => (<p> select Post </p>)}/>
            <Route exact path={`${match.url}/:id`} component={Post} />

        </div>
    )
}

export default Posts;