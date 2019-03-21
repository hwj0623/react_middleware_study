import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import moment from 'moment';
import removeMd from 'remove-markdown';

/** props로 받아온 데이터로 텍스트 채우기.
 *  #, **, ```등의 마크다운 특수문자가 그대로 보이므로
 *  remove-markdown 라이브러리를 사용하여 이를 숨긴다.
 */
const cx = classNames.bind(styles);
/** PostItem 내부에 매핑할 tag리스트 태그들 */

const PostItem = ({ title, body, publishedDate, tags, id}) => {
    const tagList = tags.map(
        tag => <Link key={tag} to={`/tag/${tag}`}>#{tag}</Link>
    );

    return (
        <div className={cx('post-item')}>
            <h2><Link to={`/post/${id}`}>{title}</Link></h2>
            <div className={cx('date')}>{moment(publishedDate).format('ll')}</div>
            <p>{removeMd(body)}</p>
            <div className={cx('tags')}>
                {tagList}
            </div>
        </div>
    )
};
const PostList = ({posts}) => {
    /** PostList 내부에서 정의하여 렌더링할 postList 작성*/
    const postList = posts.map(
        (post) => {
            const { _id, title, body, publishedDate, tags } = post.toJS();
            return (
                <PostItem
                    title={title}
                    body={body}
                    publishedDate={publishedDate}
                    tags={tags}
                    key={_id}
                    id={_id}
                />
            )
        }
    );
    return (
        <div className={cx('post-list')}>
            {postList}
        </div>
    );
};

export default PostList;