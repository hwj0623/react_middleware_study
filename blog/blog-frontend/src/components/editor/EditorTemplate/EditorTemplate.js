/**
 * 단순히 children을 JSX의 props로 전달하지 않는다.
 * 세 종류의 JSX가 블록형태 하나로 붙어있지 않고,
 * 각자 다른 곳에 렌더링을 하므로,
 * header, editor, preview로 props를 나눈다.
 *
 * header={<EditorHeader/>}
 * editor={<EditorPane/>}     ==> PageTemplate ==> View page rendering
 * preview={PreviewPane/>}
 *
 */

import React, {Component} from 'react';
import styles from './EditorTemplate.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

class EditorTemplate extends Component {
    //리사이즈 기능 구현 - 각 영역 사이에 separator 렌더링 후 이 DOM 클릭시 이벤트 등록
    state = {
        leftPercentage: 0.5
    }

    //separator 클릭후 마우스 드래그 --> leftPercentage 업데이트
    handleMouseMove = (e) => {
        this.setState({
            leftPercentage: e.clientX / window.innerWidth
        });
    }

    //마우스 뗐을 때 등록한 이벤트 제거
    handleMouseUp = (e) => {
        document.body.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    //separator 클릭 시
    handleSeparatorMouseDown = (e) => {
        document.body.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    }


    render() {
        const {header, editor, preview} = this.props;
        const {leftPercentage} = this.state;
        const {handleSeparatorMouseDown, handleMouseUp} = this;

        //각 영역에 flex 값 적용
        const leftStyle = {
            flex: leftPercentage
        };
        const rightStyle = {
            flex: 1 - leftPercentage
        };
        //separator 위치 설정
        const separatorStyle = {
            left: `${leftPercentage * 100}%`
        };


        return (
            <div className={cx('editor-template')}>
                {header}
                <div className={cx('panes')}>
                    <div className={cx('pane', 'editor')} style={leftStyle}>
                        {editor}
                    </div>
                    <div className={cx('pane', 'preview')} style={rightStyle}>
                        {preview}
                    </div>
                    <div className={cx('separator')}
                         style={separatorStyle}
                         onMouseDown={handleSeparatorMouseDown}
                         onMouseUp={handleMouseUp}/>
                </div>
            </div>
        );
    }
}

export default EditorTemplate;
