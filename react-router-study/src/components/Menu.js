import React from 'react';
// import {Link} from 'react-router-dom';
import {NavLink } from 'react-router-dom';

/** Link 컴포넌트
 * <a href ... >Link </a> 에 의한 링크는 새로고침으로 페이지 로딩이 발생
 * 이를 방지하려면 리액트 라우터의 Link 컴포넌트 사용
 */
/** NavLink 컴포넌트
 * Link + @
 * 현재 주소와 해당 컴포넌트의 목적지 주소가 일치하면 특정 스타일 또는 클래스 지정이 가능하다.
 * 기존 Menu 컴포넌트의 코드를 다음곽 같이 수정
 */

const Menu = () =>{
    const activeStyle = {
        color: 'green',
        fontSize : '2rem'
    };
    return (
        <div>
            <ul>
                <li><NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink></li>
                <li><NavLink exact to="/about" activeStyle={activeStyle}>소개</NavLink></li>
                <li><NavLink to="/about/react" activeStyle={activeStyle}>React 소개</NavLink></li>
                <li><NavLink to="/posts" activeStyle={activeStyle}>Post 목록 </NavLink></li>

            </ul>
        </div>
    )
}
export default Menu;