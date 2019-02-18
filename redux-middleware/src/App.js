
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from './modules/counter';
import * as postActions from './modules/post';

import axios from 'axios';
/**
 * axios는 비동기 호출 모듈. Promise를 구현함
 *
 */
class App extends Component {
    /**
     * 요청 취소 작업
     */
    cancelRequest = null
    handleCancel = () => {
        if(this.cancelRequest){
            this.cancelRequest();
            this.cancelRequest = null;
        }
    }
    //ES7 async, await 적용시
    loadData = async () => {
        const { PostActions, number} = this.props;
        try{
            // const response = await  PostActions.getPost(number)
            // console.log(response);
            /**  요청 취소 작업  */
            const p = PostActions.getPost(number)
            this.cancelRequest = p.cancel;
            const response = await p;
            console.log(response);
        }catch(e){
            console.log(e);
        }

    }
    // ES6 only
    // loadData = () => {
    //     const { PostActions, number} = this.props;
    //     PostActions.getPost(number).then(
    //         (response) => {
    //             console.log(response);
    //         }
    //     ).catch(
    //         (error) => {
    //             console.log(error);
    //         }
    //     );
    // }
    componentDidMount(){
        // //컴포넌트 마운트 시점에서 비동기 함수 호출
        // axios.get('https://jsonplaceholder.typicode.com/posts/1')
        //     .then(response => console.log(response));
        this.loadData();
        window.addEventListener('keyup', (e)=>{
            if(e.key =='Escape'){
                this.handleCancel();
            }
        })
    }
    componentDidUpdate(prevProps, prevState){
        //이전 number와 비교
        if(this.props.number !== prevProps.number){
            this.loadData();
        }
    }


    render() {
        const { CounterActions, number, post, error, loading } = this.props;


        return (
            <div>
                <h1>{number}</h1>
                {
                    (()=>{
                        if(loading)
                            return (<h2>loading...</h2>)
                        if(error)
                            return (<h2>error occured!!</h2>)

                        return (
                            <div>
                                <h2>{post.title}</h2>
                                <p>{post.body}</p>
                            </div>
                        )
                    })()
                }
                <button onClick={CounterActions.increment}>+</button>
                <button onClick={CounterActions.decrement}>-</button>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        number: state.counter,
        post : state.post.data,
        loading : state.pender.pending['GET_POST'],
        error : state.pender.failure['GET_POST']
    }),
    (dispatch) => ({
        CounterActions: bindActionCreators(counterActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(App);