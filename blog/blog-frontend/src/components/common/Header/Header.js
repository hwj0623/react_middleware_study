import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import {Link } from 'react-router-dom';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);
/**
 *  UI Component들 .. Header
 */
const Header= () => (

    <header className={cx('header')}>
        <div className={cx('header-content')}>
            <div className={cx('brand')}>
                <Link to="/" >reactblog </Link>
            </div>
            <div className={cx('right')}>
                {/*조건에 따라 다른 버튼 렌더링한다*/}
                <Button theme="outline" to="editor"> 새 포스트 </Button>
            </div>
        </div>
    </header>
);

export default  Header;