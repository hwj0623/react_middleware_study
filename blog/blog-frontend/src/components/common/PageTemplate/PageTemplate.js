import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
const cx = classNames.bind(styles);
/**
 *  UI Component들 .. PageTemplate
 */
const PageTemplate= ({children}) => (
    <div className={cx('page-template')}>

        <Header/>
        <main>
            {children}
        </main>
        <Footer/>
    </div>
);

export default  PageTemplate;