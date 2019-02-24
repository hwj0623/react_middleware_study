import React from 'react';
import styles from './Header.scss'
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

const HeaderTemplate = () => (
    <div className = {cx('header-template')}>
        PageTemplate
    </div>
)

export default HeaderTemplate;

