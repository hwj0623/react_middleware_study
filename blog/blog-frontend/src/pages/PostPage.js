import React from 'react';
import PageTemplate from '../components/common/PageTemplate';
// import PostInfo from 'components/post/PostInfo';
// import PostBody from 'components/post/PostBody';
import Post from '../containers/post/Post';

/**
 * 컴포넌트를 PostPage에 렌더링
 * id에 현재 라우트의 id를 넣어준다.
 * */
const PostPage = ({match}) => {
    const {id} = match.params;
    return (
        <PageTemplate>
            <Post id={id}/>
        </PageTemplate>
    );
};

export default PostPage;
