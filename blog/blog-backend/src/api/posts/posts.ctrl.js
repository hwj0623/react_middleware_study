/**
 * controller 파일 작성
 *
 *  posts.get('/', (ctx) => { ... });
 */

const Post = require('models/post')

/**
 * ObjectId 검증 미들웨어 생성
 */
const {ObjectId } = require('mongoose').Types
exports.checkObjectId = (ctx, next) =>{
    const{id} = ctx.params

    //verification failure
    if(!ObjectId.isValid(id)){
        ctx.status = 400    //400 Bad Request
        return null
    }

    return next() //ctx,body 설정을 위해 next를 리턴한다
}
/**
 * 포스트 작성
 * POST /api/posts
 *  { title, body }
 */
exports.write = async (ctx) => {
    const {title, body, tags} = ctx.request.body

    //create new post instance
    const post = new Post({
        title, body, tags
    })

    try {
        await post.save();      //DB에 등록
        ctx.body = post;        //저장 결과 반환
    } catch (e) {
        //DB 오류 발생
        ctx.throw(e, 500)
    }
}

/**
 * 포스트 목록 조회
 * GET /api/posts
 */
exports.list = async (ctx) => {
    try {
        const posts = await Post.find().exec()
        ctx.body = posts  //post add to response body
    } catch (e) {
        ctx.throw(e, 500)
    }
}

/**
 * 특정 포스트 조회
 * GET /api/posts/:id
 */
exports.read = async (ctx) => {
    const {id} = ctx.params

    try {
        const post = await Post.findById(id).exec()
        if(!post){
            ctx.status = 404
            return
        }
        ctx.body = post      //post add to response body
    }catch (e){
        ctx.throw(e, 500)
    }

}

/**
 * 특정 포스트 제거
 * DELETE /api/posts/:id
 *  remove - 특정 조건 만족 데이터 모두 지움
 *  findByIdAndRemove(id) : id 찾아서 지움
 *  findOneAndRemove(조건 ) : 특정 조건 만족 데이터 하나를 찾아서 제거
 *
 */
exports.remove = async (ctx) => {
    const{id } = ctx.params

    try{
        await Post.findByIdAndRemove(id).exec()
        ctx.status = 204
    }catch{
        ctx.throw(e, 500)
    }

}

/**
 * 포스트 수정(교체)
 * PUT /api/posts/:id
 * {title, body}
 */
exports.replace = async (ctx) => {


}


/**
 * 포스트 수정(특정 필드값 변경 )
 * PUT /api/posts/:id
 * {title, body}
 */
exports.update = async (ctx) => {
    const {id} = ctx.params
    try{
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true
            //이 값을 설정해야 업데이트 된 객체를 반환함
            //설정하지 않으면 업데이트 전의 객체 반환
        }).exec()

        if(!post){
            ctx.status = 404
            return
        }
        ctx.body = post

    }catch(e){
        ctx.throw(e, 500)
    }

}