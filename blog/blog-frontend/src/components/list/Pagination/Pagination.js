import React from 'react';
import styles from './Pagination.scss';
import classNames from 'classnames/bind';
import Button from '../../../components/common/Button';

/** 페이지네이션 기능 구현
 *  전달받은 page값, lastPage값, tag값 사용하여 이전/다음 페이지 링크로 이동
 *  Button 컴포넌트에 Link 기능이 있으므로 to 값을 설정하여 만든다.
 *  비활성화 대상
 *  - 첫 페이지에서는 이전 버튼
 *  - 마지막 페이지에서는 다음 버튼
 */
const cx = classNames.bind(styles);

const Pagination = ({page, lastPage, tag}) => {
    const createPagePath = (page) => {
        return tag ? `/tag/${tag}/${page}` : `/page/${page}`;
    }
    return (
        <div className={cx('pagination')}>
            <Button disabled={page === 1} to={createPagePath(page - 1)}>
                이전 페이지
            </Button>
            <div className={cx('number')}>
                페이지 {page}
            </div>
            <Button disabled={page === lastPage} to={createPagePath(page + 1)}>
                다음 페이지
            </Button>
        </div>
    );
};
export default Pagination;


