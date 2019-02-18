import React from 'react';
import queryString from 'query-string';


const About  = ({location, match}) => {
    const query = queryString.parse(location.search);

    //query string 값은 모두 문자열이다. 따라서 boolean, number에 무관하게 문자열 비교나 형변환 시켜 비교해야 함
    console.log(query);
    const {color} = query;

    return (
        <div>
            <h2 style={{color}}>소개</h2>
            <p>
                Hello, I'm {match.params.name} 입니다.
            </p>
        </div>
    )
}

export default About;