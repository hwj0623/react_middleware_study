/**
 * controller 파일 작성
 *
 *  posts.get('/', (ctx) => { ... });
 */
const Post = require('models/post');
/** Request Body 검증 */
const Joi  = require('joi');

/**
 * ObjectId 검증 미들웨어 생성
 */
const {ObjectId } = require('mongoose').Types;
exports.checkObjectId = (ctx, next) =>{
    const{id} = ctx.params;

    //verification failure
    if(!ObjectId.isValid(id)){
        ctx.status = 400;  //400 Bad Request
        return null;
    }

    return next() //ctx,body 설정을 위해 next를 리턴한다
};
/**
 * 포스트 작성
 * POST /api/posts
 *  { title, body }
 */
exports.write = async (ctx) => {
    /** RequestBody validation ==*/
    const schema = Joi.object().keys({
        title: Joi.string().required(), //required() 는 필수 항목을 의미
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required() //문자열 배열

    });

    //첫번째 파라미터는 검증할 객체, 두번째는 스키마
    const result = Joi.validate(ctx.request.body, schema);

    //if error in validation
    if(result.error){
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const {title, body, tags} = ctx.request.body;

    //create new post instance
    const post = new Post({
        title, body, tags
    });

    try {
        await post.save();      //DB에 등록
        ctx.body = post;        //저장 결과 반환
    } catch (e) {
        //DB 오류 발생
        ctx.throw(e, 500)
    }
};

/**
 * 포스트 목록 조회
 * GET /api/posts
 *
 * pagination 기능 구현
 *  - skip 함수 사용
 *  - limit 함수 사용
 */
exports.list = async (ctx) => {
    //page 주어지지 않으면 1로 간주
    //query는 문자열 형태로 받아 오므로 숫자로 변환한다.
    const page = parseInt(ctx.query.page || 1, 10);

    if(page < 1){
        ctx.status = 400;
        return;
    }
    try {
        //최근 순서(내림차순 : -1)으로 정렬
        const posts = await Post.find()
                            .sort({_id: -1})
                            .limit(10)
                            .skip((page - 1) * 10)
                            .lean()
                            .exec();
        // 마지막 페이지 번호 알려주기
        const postCount = await Post.countDocuments().exec()
        // 마지막 페이지 알려주기.
        // ctx.set은 response header를 설정한다.
        ctx.set('Last-Page', Math.ceil(postCount/10));

        /** 내용 길이 제한
         * 불필요한 데이터 들어가는 것 방지
         *  - 방법 1) 조회한 객체를 toJson 함수로 JSON 형태로 변환
         *  - 방법 2) 쿼리할 때 lean 함수를 사용하여 처음부터 JSON 형태로 조회
         */
        const limitBodyLength = post => ({
            ...post, //.toJSON(),
            body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`
        });

        ctx.body = posts.map(limitBodyLength);  //post add to response body

    } catch (e) {
        ctx.throw(e, 500)
    }
};

/**
 * 특정 포스트 조회
 * GET /api/posts/:id
 */
exports.read = async (ctx) => {
    const {id} = ctx.params;

    try {
        const post = await Post.findById(id).exec();
        if(!post){
            ctx.status = 404;
            return;
        }
        ctx.body = post;      //post add to response body
    }catch (e){
        ctx.throw(e, 500);
    }

};

/**
 * 특정 포스트 제거
 * DELETE /api/posts/:id
 *  remove - 특정 조건 만족 데이터 모두 지움
 *  findByIdAndRemove(id) : id 찾아서 지움
 *  findOneAndRemove(조건 ) : 특정 조건 만족 데이터 하나를 찾아서 제거
 *
 */
exports.remove = async (ctx) => {
    const{id } = ctx.params;

    try{
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204;
    }catch(e){
        ctx.throw(e, 500);
    }

};



/**
 * 포스트 수정(특정 필드값 변경 )
 * PUT /api/posts/:id
 * {title, body}
 */
exports.update = async (ctx) => {
    const {id} = ctx.params;
    try{
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true
            //이 값을 설정해야 업데이트 된 객체를 반환함
            //설정하지 않으면 업데이트 전의 객체 반환
        }).exec();

        if(!post){
            ctx.status = 404;
            return
        }
        ctx.body = post

    }catch(e){
        ctx.throw(e, 500)
    }

};