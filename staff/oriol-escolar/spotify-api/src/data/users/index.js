'use strict'
const jwt= require('jsonwebtoken')

const user = {
    collection: null,

    add(user) {
        // TODO validate user and its fields (type and content)

        return this.collection.insertOne(user)
            .then(res => res.insertedId.toString())
    },

    authenticate(email,password){
        return this.collection.findOne({email:email,password:password})
        .then(user => {
            if (!user) throw Error(`user with email ${email} not found`)
            if (user.password !== password) throw Error('wrong credentials')
            let id = user._id.toString()
            let token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: {id}
            }, 'mysecretkey');
            return {
                id,
                token
            }
        })
    }
}

module.exports = user