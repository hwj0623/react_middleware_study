/**
 * Post 내용이 보이는 PostBody 컴포넌트.
 */
import React from 'react';
import styles from './PostBody.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PostBody = () => (
    <div className={cx('post-body')}>
        <div className={cx('paper')}>
            content
        </div>
    </div>
)

export default PostBody;