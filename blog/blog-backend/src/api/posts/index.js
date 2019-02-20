const Router = require('koa-router')
const postsCtrl = require('./posts.ctrl')

const posts = new Router()

/**
 * postsCtrl를 불러오면 다음 객체가 불려온다
 * {
 *      write : [Function],
 *      list : [Function],
 *      read : [Function],
 *      remove : [Function],
 *      replace : [Function], -- 제거
 *      update : [Function]
 * }
 */

const printInfo  = (ctx) =>{
    ctx.body = {
        method: ctx.method,
        path : ctx.path,
        params : ctx.params,
    }
}


posts.get('/', postsCtrl.list)
posts.post('/', postsCtrl.write)
posts.get('/:id', postsCtrl.read)
posts.delete('/:id', postsCtrl.remove)
/** posts.put 제거 */
posts.patch('/:id', postsCtrl.update)

module.exports = posts
