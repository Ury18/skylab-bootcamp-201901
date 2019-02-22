'use strict'

const user = {
    collection: null,

    add(user) {
        // TODO validate user and its fields (type and content)

        return this.collection.insertOne(user)
            .then(res => res.insertedId.toString())
    },

    authenticate(email,password){
        return this.collection.findOne({email:email,password:password})
    }
}

module.exports = user