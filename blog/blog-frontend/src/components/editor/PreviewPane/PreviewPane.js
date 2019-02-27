import React from 'react';
import styles from './PreviewPane.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


const PreviewPane = ({markdown, title}) => (
    <div className={cx('preview-pane')}>
        <h1 className={cx('title')}>
            title
        </h1>
        <div>
            content
        </div>
    </div>
);

export default PreviewPane;