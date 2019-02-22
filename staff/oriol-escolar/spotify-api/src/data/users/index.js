'use strict'

const user = {
    collection: null,

    add(user) {

        return this.collection.insertOne(user)
            .then(res => res.insertedId.toString())
    },

    findByEmail(email){
        return this.collection.findOne({email})
        .then(user =>{
            user.id = user._id.toString()
            delete user._id
            return user
            

        })
    },
    findById(_id){
        return this.collection.findOne({_id})
        .then(user =>{
            user.id = user._id.toString()
            delete user._id
            return user
            

        })
    },

    retrieve(){
        


    }

}

module.exports = user