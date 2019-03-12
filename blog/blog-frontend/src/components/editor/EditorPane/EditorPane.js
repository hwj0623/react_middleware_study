import React, {Component} from 'react';
import styles from './EditorPane.scss';
import classNames from 'classnames/bind';

import CodeMirror from 'codemirror';

import 'codemirror/mode/markdown/markdown'; //markdown 문법 색상
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';

//CodeMirror를 위한 CSS Style
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

const cx = classNames.bind(styles);

/**
 * 20.6.2.3
 * - EditorPaneContainer로부터 전달받은 props로 받은 값들을 각 input에 설정.
 * - 변화 발생시 props로 전달받은 onChangeInput을 호출
 *
 * - 제목/태그 : input에 [ onChange ] 이벤트설정하여 값 전달 가능
 * - CodeMirror: [ initializeEditor ] 함수 호출될 떄 'change' 이벤트를 직접 등록
 *  - props로 받은 markdown 값을 CodeMirror 인스턴스에 반영해야 함.
 *      -> [ componentDidUpdate ] 부분에서 markdown 값 바꾸면 [ setValue ] 사용해서 내용 변경 필요
 *      -> 이때, cursor 위치가 초기화되지 않도록 [setCursor] 로 커서값 유지해야 함
 */
class EditorPane extends Component {
    editor = null      //에디터 레퍼런스 (ref)
    codeMirror = null  //CodeMirror 인스턴스
    cursor = null //에디터의 텍스트 cursor 위치

    initializeEditor = () => {
        this.codeMirror = CodeMirror(this.editor, {
            mode: 'markdown',
            theme: 'monokai',
            lineNumbers: true, //왼쪽에 라인 넘버 띄우기
            lineWrapping: true //내용이 너무 길면 다음 줄에 작성
        });
        //change 이벤트 직접 등록
        this.codeMirror.on('change', this.handleChangeMarkdown);
    }

    /**
     * life cycle - 컴포넌트 마운트 초기화 시 에디터 초기화 함수 호출
     */
    componentDidMount() {
        this.initializeEditor();
    }

    /**
     * @param e
     * 제목, 태그 입력 이벤트
     */
    handleChange = (e) => {
        const {onChangeInput} = this.props;
        const {name, value} = e.target;

        /**
         * 앞서 onChangeInput은 EditorPaneContainer에 등록된 사용자 정의 이벤트로
         * 역시 props로 name, value 를 전달하며 EditorPaneContainer에 등록된 handleChangeInput 함수를 호출한다.
         */
        onChangeInput({name, value});
    }
    /**
     * @param doc
     * 마크다운의 작성 이벤트
     */
    handleChangeMarkdown = (doc) => {
        const {onChangeInput} = this.props;
        this.cursor = doc.getCursor();  //code mirror 내장함수
        onChangeInput({
            name: 'markdown',
            value: doc.getValue()
        })

    }

    /**
     * life cycle -  렌더링된 컴포넌트의 수정
     */
    componentDidUpdate(prevProps, prevState) {
        /** 스토어 (EditorPaneContainer.js참고) 에 설정된
         *  상태값 'markdown' 변경되면 에디터 값도 변경
         *  이 과정에서 텍스트 커서 위치 초기화 가능하므로
         *  컴포넌트 리렌더링시 저장된 커서의 위치가 있다면 해당 위치로 설정한다.
         */
        if (prevProps.markdown !== this.props.markdown) {
            const {codeMirror, cursor} = this;

            //[ ESCAPE ] : 인스턴스 codeMirror가 아직 만들어지지 않은 상태
            if (!codeMirror) return;
            //markdown값 설정
            codeMirror.setValue(this.props.markdown);

            //[ ESCAPE ] : 커서 없다면 --handleChangeMarkdown 호출 안된 상태라면
            if (!cursor) return;
            //커서 설정
            codeMirror.setCursor(cursor);
        }
    }

    render() {

        const {handleChange} = this;
        const {tags, title } = this.props;

        return (
            <div className={cx('editor-pane')}>
                <input
                    className={cx('title')}
                    placeholder="제목 입력해주세요 "
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
                <div className={cx('code-editor')} ref={ref => this.editor = ref}></div>
                <div className={cx('tags')}>
                    <div className={cx('description')}> Tag</div>
                    <input
                        name="tags"
                        placeholder="tag를 입력하세요 (쉼표로 구분)"
                        value={tags}
                        onChange={handleChange}
                    />
                </div>
            </div>
        )
    }
}

export default EditorPane;