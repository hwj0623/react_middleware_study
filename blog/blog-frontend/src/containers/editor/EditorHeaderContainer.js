/**
 *  21.
 *  EditorHeader 컴포넌트에 리덕스 상태와 액션 생성 함수 붙이기
 *  => << 컨테이너 컴포넌트 >>작성
 *
 *  [뒤로가기] [작성하기] 버튼에 기능 붙이기
 *  - 뒤로가기 : [ history 객체] 의 [ goBack ] 함수 호출
 *      - [ withRouter ]를 불러와 컴포넌트 내보낼때 감싸줌
 *          -> 해당 컴포넌트에서 리액트 라우터가 전달해주는 props 값을 받아오기 위함
 *  - 현재 EditorHeaderContainer 에서 리덕스와 상태 연결을 위해 connect 함수로 감싸지만,
 *    connect와 withRouter 중첩되어도 무방
 *  --------
 *  - 작성하기 : 글쓰기 액션 발생시킴. postId 값을 받아와서 포스트 주소로 이동
 *      - componentDidMount 발생시 INITIALIZE 액션 실행으로 에디터 상태 초기화 해준다.
 */

import React, {Component} from 'react';
import EditorHeader from '../../components/editor/EditorHeader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';

import * as editorActions from '../../store/modules/editor';

class EditorHeaderContainer extends Component {
    componentDidMount() {
        const {EditorActions} = this.props;
        EditorActions.initialize(); //editor 초기화
    }

    /**
     * 뒤로가기 이벤트 핸들러
     */
    handleGoBack = () => {
        const {history} = this.props;
        history.goBack();
    }
    /**
     * @returns {Promise<void>}
     * 글 작성 이벤트 핸들러
     */
    handleSubmit = async () => {
        const {title, markdown, tags, EditorActions, history} = this.props;
        const post = {
            title,
            body: markdown,
            // 태그 텍스트를 , 로 분리시키고 앞뒤 공백을 지운 후 중복되는 값을 제거함
            tags: tags === "" ? [] : [...new Set(tags.split(',').map(tag => tag.trim()))]
        };
        try{
            await EditorActions.writePost(post);
            //페이지를 이동시킴.
            /**
             * postId는 현재 값을 불러오기 위해서 위쪽에서 레퍼런트 만들지 말아야 한다.
             * 이 자리에서 this,props.postId를 조회해야 한다.
             */
            history.push(`/post/${this.props.postId}`);
        }catch(e){
            console.log(e);
        }
    }
    render(){
        const { handleGoBack, handleSubmit} = this;

        return (
            <EditorHeader
                onGoBack={handleGoBack}
                onSubmit={handleSubmit}
            />
        );
    }
}

export default connect(
    (state) => ({
        title: state.editor.get('title'),
        markdown: state.editor.get('markdown'),
        tags: state.editor.get('tags'),
        postId: state.editor.get('postId')
    }),
    (dispatch) => ({
        EditorActions : bindActionCreators(editorActions, dispatch)
    })
)(withRouter(EditorHeaderContainer));