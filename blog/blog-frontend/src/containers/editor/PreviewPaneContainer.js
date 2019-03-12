import React, {Component} from 'react';
import {connect} from 'react-redux';
import PreviewPane from '../../components/editor/PreviewPane';


class PreviewPaneContainer extends Component {
    render() {
        const {markdown, title} = this.props;
        return (
            <PreviewPane title={title} markdown={markdown} preview="제목을 입력해주세요" />
        );
    }
}

/**
 * store에서 title, markdown을 받아와서 PreviewPane에 넣어준다.
 * 해당 액션을 PreviewPaneContainer와 연동
 * (= previewPane 을 Action 생성함수와 감싸서 컨테이너 컴포넌트로 내보낸다)
 */
export default connect(
    (state) => ({
        title: state.editor.get('title'),
        markdown: state.editor.get('markdown'),
    })
)(PreviewPaneContainer);