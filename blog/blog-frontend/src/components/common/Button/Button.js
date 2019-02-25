import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom';

const cx = classNames.bind(styles);

//전달받은 classANme, onClick 등 값들은 rest 안에 들어 있다.
//JSX에서 ...을 사용하려면 내부에 있는 값들을 props로 넣어 준다.

const Div = ({children, ...rest}) => <div {...rest}> {children} </div>;

const Button =
    ({
         children, to, onClick, disabled, theme = 'default',
     }) => {

        const Element = (to && !disabled) ? Link : Div;

        //비활성화되면(if disabled) onClick은 실행되지 않음 (Link 대신 Div
        //disabled 값이 true가 되면 className에 disabled를 추가
        return (
            <Element
                to={to}
                className={cx('button', theme, {disabled})}
                onClick={disabled ? () => null : onClick}>
                {children}
            </Element>
        )
    };

export default Button;