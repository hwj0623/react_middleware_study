const Router = require('koa-router')
const posts = new Router()

const postsCtrl = require('./posts.ctrl')
/**
 * postsCtrl를 불러오면 다음 객체가 불려온다
 * {
 *      write : [Function],
 *      list : [Function],
 *      read : [Function],
 *      remove : [Function],
 *      replace : [Function],
 *      update : [Function]
 * }
 */

posts.get('/', postsCtrl.list)
posts.post('/', postsCtrl.write)
posts.get('/:id', postsCtrl.read)
posts.delete('/:id', postsCtrl.remove)
posts.put('/:id', postsCtrl.replace)
posts.patch('/:id', postsCtrl.update)

module.exports = posts
