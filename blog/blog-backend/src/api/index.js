const Router = require('koa-router')
const posts = require('./posts')

const api = new Router()

// api.use('/posts', posts.routes())

//api/posts route 적용 -- 기존 라우터에 /api/posts 경로 적용
api.use ('/posts', posts.routes())

module.exports = api