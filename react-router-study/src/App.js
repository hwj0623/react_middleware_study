import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Home, About, Posts} from 'pages';
import Menu from 'components/Menu';

class App extends Component {
    render() {
        return (
            <div >
                <Menu/>
                {/* Route 설정. 경로는 path. 보여줄 컴포넌트는 component값으로 설정
                    exact는 주소가 설정한 path와 정확히 일치할 때만 보이도록 설정 */}
                <Route exact path="/" component={Home}/>
                {/*<Route path="/about" component={About}/>*/}
                {/* url params 지정할 때는 :key 형식으로 설정
                    :key? 로 하면 컴포넌트가 중복생성되지 않고, params 값이 있는 경우만 키를 나타낸다.*/}
                <Route path="/about/:name?" component={About} />
                <Route path="/posts" component={Posts} />
            </div>
        );
    }
}

export default App;
