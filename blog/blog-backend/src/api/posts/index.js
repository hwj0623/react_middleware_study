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


posts.get('/', postsCtrl.list)
posts.post('/', postsCtrl.write)

/** ObjectId 검증 필요한 부분에 미들웨어 추가 */
posts.get('/:id', postsCtrl.checkObjectId, postsCtrl.read)
posts.delete('/:id', postsCtrl.checkObjectId, postsCtrl.remove)
/** posts.put 제거 */
posts.patch('/:id', postsCtrl.checkObjectId, postsCtrl.update)

module.exports = posts
