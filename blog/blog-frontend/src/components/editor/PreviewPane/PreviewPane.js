import React from 'react';
import styles from './PreviewPane.scss';
import classNames from 'classnames/bind';
import MarkdownRender from '../../../components/common/MarkdownRender';

const cx = classNames.bind(styles);

const PreviewPane = ({markdown, title, preview}) => (
    <div className={cx('preview-pane')}>
        <h1 className={cx('title')} >
            {title}
            {/* title 입력 여부로 부연설명 추가  */}
            { (!title) ? <div className={cx('description')}> {preview}</div> : ''}

        </h1>
        <div>
            {/*contents*/}
            <MarkdownRender markdown={markdown}/>
        </div>
    </div>
);

export default PreviewPane;