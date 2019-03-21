import React from 'react';
import PageTemplate from '../components/common/PageTemplate';
import ListWrapper from '../components/list/ListWrapper';
import ListContainer from '../containers/list/ListContainer';

/**ListContainer로 PostList와 Pagination 컴포넌트 대체 */


const ListPage = ({match}) => {
    //page 기본값 존재하지 않으면 1로 설정
    const {page = 1, tag} = match.params;

    return (
        <PageTemplate>
            <ListWrapper>
                <ListContainer
                    page={parseInt(page, 10)}
                    tag={tag}
                />
            </ListWrapper>
        </PageTemplate>
    );
};

export default ListPage;
