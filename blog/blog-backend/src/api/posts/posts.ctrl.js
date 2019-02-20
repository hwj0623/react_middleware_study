/**
 * controller 파일 작성
 *
 *  posts.get('/', (ctx) => { ... });
 */

let postId = 1

const posts = [
    {
        id: 1,
        title: '제목',
        body: '내용'
    }
]

/**
 * 포스트 작성
 * POST /api/posts
 *  { title, body }
 */
exports.write = (ctx) => {
    //REST API 의 request body는 ctx.request.body 에서 조회할 수 있다.

    console.log("ctx request : ", ctx.request)
    const {
        title,
        body
    } = ctx.request.body

    postId += 1 //기존 postId 값 increment

    const post = {id: postId, title, body}
    posts.push(post)
    ctx.body = post
}

/**
 * 포스트 목록 조회
 * GET /api/posts
 */
exports.list = (ctx) => {
    ctx.body = posts
}

/**
 * 특정 포스트 조회
 * GET /api/posts/:id
 */

exports.read = (ctx) => {
    const {id} = ctx.params

    /** 주어진 id 값으로 post를 찾는다.
     파라미터로 받아 온 값은 문자열 형식이다.
     1)따라서 파라미터를 숫자로 변환하거나
     2)비교할 p.id 값을 문자열로 변경해야 함
     */
    const post = posts.find(p => p.id.toString() === id)

    /**
     * 포스트 없으면 오류 반환
     */
    if (!post) {
        ctx.status = 404
        ctx.body = {
            message: "Post doesn't exist. "
        }
        return
    }

    ctx.body = post
}

/**
 * 특정 포스트 제거
 * DELETE /api/posts/:id
 *
 */

exports.remove = (ctx) => {
    const {id} = ctx.params

    //해당 id를 가진 post가 몇 번째인지 확인합니다.
    const index = posts.findIndex(p => p.id.toString() === id)

    //포스트가 없으면 오류를 반환
    if (index === -1) {
        ctx.status = 404
        ctx.body = {
            message: "Post doesn't exist. "
        }
        return
    }

    //index 번째 아이템 제거
    posts.splice(index, 1)
    ctx.status = 204 // No Content

}

/**
 * 포스트 수정(교체)
 * PUT /api/posts/:id
 * {title, body}
 */
exports.replace = (ctx) => {
    //PUT 메서드는 전체 포스트 정보를 입력하여 데이터를 통째로 교체할 때 사용
    const {id} = ctx.params

    //해당 id를 가진 post가 몇 번째인지 확인
    const index = posts.findIndex(p => p.id.toString() === id)

    //포스트가 없으면 오류를 반환
    if (index === -1) {
        ctx.status = 404
        ctx.body = {
            message: "Post doesn't exist. "
        }
        return
    }

    //전체 객체를 덮어 씌운다.
    //id를 제외한 기존 정보 날리고 객체를 새로 만듬
    posts[index] = {
        id,
        ...ctx.request.body
    }
    ctx.body = posts[index]
}


/**
 * 포스트 수정(특정 필드값 변경 )
 * PUT /api/posts/:id
 * {title, body}
 */

exports.update = (ctx) => {
    //PATCH 메서드는 주어진 필드만 교체
    const {id} = ctx.params

    //해당 id를 가진 post가 몇 번째인지 확인
    const index = posts.findIndex(p => p.id.toString() === id)

    //포스트가 없으면 오류를 반환
    if (index === -1) {
        ctx.status = 404
        ctx.body = {
            message: "Post doesn't exist. "
        }
        return
    }

    //기존 값에 정보 덮어씌움
    posts[index] = {
        ...posts[index],
        ...ctx.request.body
    }
    ctx.body = posts[index]
}