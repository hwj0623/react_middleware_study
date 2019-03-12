import React, {Component} from 'react';
import styles from './MarkdownRender.scss';
import classNames from 'classnames/bind';

import marked from 'marked';

const cx = classNames.bind(styles);

/**
 * 마크다운 변환을 위한 Presentational Component
 * markdown 변경시 호출
 * Editor로 작성한 마크다운을 HTML로 변환하여 화면에 띄워준다.
 * markdown 은 editor.js에서 설정한 스토어의 초기 상태값 중 하나 이다.
 *
 * << PreviewPane 뷰컴포넌트에서 이 컴포넌트를 사용한다 >>
 */
class MarkdownRender extends Component {
    state = {
        html: ''
    }

    renderMarkdown = () => {
        const {markdown} = this.props;
        //마크다운 존재하지 않으면 공백처리
        if (!markdown) {
            this.setState({html: ''});
            return;
        }

        this.setState({
            html: marked(markdown, {
                breaks: true,   //enter 키로 새 줄 입력
                sanitisze: true //마크다운 내부 html 무시
            })
        });
    }

    /**
     * constructor는 컴포넌트 (MarkdownRender)생성시 호출된다.
     */
    constructor(props) {
        super(props);
        const {markdown} = props;
        /** 서버사이드 렌더링에서도 마크다운 처리가 되도록 constructor 쪽에서도 마크다운 변환작업을 구현한다.*/
        this.state = {
            html: markdown ? marked(props.markdown, {breaks: true, sanitize: true}) : ''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        //markdown 값이 변경되면 renderMarkdown을 호출한다.
        if (prevProps.markdown !== this.props.markdown) {
            this.renderMarkdown();
        }
    }

    render() {
        const {html} = this.state;

        /**
         * React에서 html을 렌더링하려면
         * 객체를 만들어 내부에
         * __html 값을 설정해야 한다. */
        const markup = {
            __html: html
        };

        /**
         * dangerouslySetInnerHTML 값에 해당 객체를 넣는다.
         * XSS 방지?
         */
        return (
            <div className={cx('markdown-render')} dangerouslySetInnerHTML={markup}/>
        );
    }
}

export default MarkdownRender;