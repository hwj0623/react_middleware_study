/**
 * mongoose 스키마 생성
 *
 * 스키마 !== 모델
 * 스키마 : 컬렉션에 들어가는 문서 내부의 각 필드가 어떤 형식으로 되어 있는지 "정의하는 객체" (like RDB schema)
 * 모델 : 스키마를 사용하여 만드는 "인스턴스". DB에서 실제 작업을 처리할 수 있는 함수들을 지니고 있는 객체
 *
 * [ 스키마 ] --> mongoose.model(...)로 모델로 만들기 --> [ 모델 ] ---> 모델은 데이터 읽고 쓰는데 사용 --> DB
 *
 * mongoose 모듈의 Schema 에서 기본으로 지원하는 타입
 * - String, Number, Date, Boolean,
 * - Buffer (파일을 담을 수 있는 버퍼),
 * - Mixed (Schema.Types.Mixed - 어떤 데이터도 넣을 수 있는 형식)
 * - ObjectId (Schema.Types.ObjectId ) : 객체 아이디, 주로 다른 객체 참조할 때 넣는다
 * - Array : 배열 형태의 값. [ ] 로 감싸서 사용한다.
 *
 */

const mongoose = require('mongoose')
const { Schema } = mongoose

/**
 * 스키마 Post 생성
 */
const Post = new Schema({
    title: String,
    body: String,
    tags: [String], //String array
    publishedDate : {
        type: Date,
        default : new Date() //현재 날짜를 기본 값으로 지정
    }
})

/**
 * 모델 생성 -- mongoose.model 함수
 * - model( '스키마 이름', 스키마 객체 ) --> 스키마 이름의 복수 형태로 DB에 컬렉션 생성됨
 *
 * 혹은 사용자 정의 방식으로 컬렉션 이름을 작성하려면 다음과 같이 작성
 * - model( '스키마 이름', 스키마 객체, '사용자 정의 컬렉션 이름' )
 */
module.exports = mongoose.model('Post', Post)
