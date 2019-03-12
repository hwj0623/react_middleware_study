require('dotenv').config()

const mongoose = require('mongoose')

/** 환경 변수
 * Node.js에서 환경변수는 process.env 파일로 조회 가능
 * 비구조화 할당으로 process.env 파일 내부 값에 대한 레퍼런스 생성
 */
const {
    PORT : port = 4000, //값 없으면 4000을 디폴트로 설정
    MONGO_URI : mongoURI
} = process.env


/**
 * mongoose에서 데이터베이스에 요청시, 이를 Promise기반으로 처리할 수 있다.
 * 내장된 Promise (node v7~ )를 사용하도록 설정
 */
mongoose.Promise = global.Promise //Node의 Promise를 사용하도록 설정
mongoose.connect(mongoURI, { useNewUrlParser: true }).then(
    console.log('connected to mongodb')
).catch((e) => {
    console.error(e)
})

const Koa = require('koa')

const Router = require('koa-router')
/**
 * POST PUT PATCH 같은 http 메서드의 Request Body에 JSON 형식으로 데이터 넣어주면 이를 파싱하여 서버에서 사용가능하게 한다.
 */
const bodyParser = require('koa-bodyparser')

/**
 * /api 경로 등록 위한 모듈 호출
 */
const api = require('./api')

//Koa 인스턴스 생성
const app = new Koa()
const router = new Router()

//api route 적용 -- 기존 라우터에 /api 경로 적용
router.use('/api', api.routes())

/**라우터 적용 전에 설정 */
app.use(bodyParser());

//router 설정
router.get('/', (ctx) => {
    ctx.body = 'Home'
})
/**
 //  '/params'
 router.get('/about/:name?', (ctx)=>{
    const {name} = ctx.params
    //name 존재 유무에 따라 다른 결과 출력
    ctx.body = name? `${name}의 소개 ` : 'About...'
    // ctx.body = 'About..'
})

 //query string으로 url params 받기
 router.get('/posts', (ctx)=>{
    const {id} = ctx.query
    //id의 존재 유무에 따라 다른 결과 출력
    ctx.body = id? `포스트 #${id} `: '포스트 아이디가 없습니다.'
})
 */

/**app 인스턴스에 라우터 적용*/
app.use(router.routes())
    .use(router.allowedMethods())

// ES7 비동기 연습 async / await
// app.use(async (ctx, next)=>{
//     console.log(1)       //1
//     await next()         // next에 해당하는 2번
//     console.log('bye')   //4
//
// })
//
// app.use((ctx, next)=>{
//     console.log(2)       //2
//     next()
//     console.log('bye 2') //3
// })
//
// app.use((ctx)=> {
//     ctx.body = 'hello world'
// })

app.listen(port, () => {
    console.log('listening to port ', port)
})