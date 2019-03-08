/**
 * children 을 쓰기엔 JSX 형태로 전달받아 사용할 내용이 3종류나 된다.
 * 세 종류 JSX가 블록형태로 붙어있는 것이 아니라, 각자 다른 곳에 렌더링해야 한다.
 * children 대신 header, editor, preview를 props로 받아서 알맞는 곳에 렌더링 한다.
 *
 */
/**
 * 컴포넌트 클래스
 */
import React, {Component} from 'react';
import styles from './EditorTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class EditorTemplate extends Component{

    state={
        leftPercentage: 0.5
    }

    //seperator 클릭 후 마우스 이벤트에 따라 퍼센티지 업데이트
    handleMouseMove = (e) => {
        this.setState({
            leftPercentage:e.clientX / window.innerWidth
        });
    }

    handleMouseUp = (e) => {
        document.body.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    //seperator 클릭 시
    handleSeperatorMouseDown = (e) => {
        document.body.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    render(){
        const { header, editor, preview } = this.props;
        const {leftPercentage } = this.state;
        const {handleSeperatorMouseDown} = this;

        //각 영역에 flex 값 적용
        const leftStyle = {
            flex: leftPercentage
        };
        const rightStyle={
            flex: 1-leftPercentage
        };

        const seperatorStyle = {
            left: `${leftPercentage * 100}%`
        };


        return(
          <div className={cx('editor-template')}>
              {header}
              <div className={cx('panes')}>
                  <div className={cx('pane', 'editor')} style={leftStyle}>
                      {editor}
                  </div>
                  <div className={cx('pane', 'preview')} style={rightStyle}>
                      {preview}
                  </div>
                  <div
                      className={cx('seperator')}
                      style={seperatorStyle}
                      onMouseDown={handleSeperatorMouseDown}
                  />
              </div>
          </div>
        );
    }
}
export default EditorTemplate;
