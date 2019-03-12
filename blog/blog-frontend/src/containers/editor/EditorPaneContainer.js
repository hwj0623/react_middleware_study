/**
 * src/store/modules/editor 모듈이 가진
 * 상태와 액션들을 사용하는 컨테이너 컴포넌트
 */
import React, {Component} from 'react';
import EditorPane from '../../components/editor/EditorPane';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as editorActions from '../../store/modules/editor';

class EditorPaneContainer extends Component {

    handleChangeInput = ({name, value}) => {
        const { EditorActions } = this.props;
        EditorActions.changeInput({name, value});
    }

    render() {
        const { title, tags, markdown } = this.props;
        const { handleChangeInput } = this;

        return (
            <EditorPane
                title={title}
                markdown={markdown}
                tags={tags}
                onChangeInput={handleChangeInput}
            />
        );
    }
}

//리액트 컴포넌트를 스토어에 연동
//bindActionCreators(액션 생성 함수들이 들어있는 객체, dispatch)
// - 액션 생성 함수들을 연결시켜주는 리덕스 내장함수
export default connect(
    (state) => ({
        title: state.editor.get('title'),
        markdown: state.editor.get('markdown'),
        tags: state.editor.get('tags')
    }),
    (dispatch) => ({
        EditorActions: bindActionCreators(editorActions, dispatch)
    })
)(EditorPaneContainer);