'use strict'

require('dotenv').config()

const { MongoClient, ObjectId } = require('mongodb')
const users = require('.')
const { expect } = require('chai')

const { env: { DB_URL } } = process

describe('user', () => {
    let client

    before(() =>
        MongoClient.connect(DB_URL, { useNewUrlParser: true })
            .then(_client => {
                client = _client
                users.collection = client.db().collection('users')
            })
    )

    beforeEach(() => users.collection.deleteMany())

    describe('add', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        it('should succeed on correct data', () =>
            users.add(_user)
                .then(id => {
                    expect(id).to.exist
                    expect(id).to.be.a('string')

                    return users.collection.findOne({ _id: ObjectId(id) })
                })
                .then(({ name, surname, email, password }) => {
                    expect(name).to.equal(_user.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                })
        )
    })
    describe('find user by email', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }
        beforeEach(()=> users.collection.insertOne(_user))

        it('should succeed on correct data', () =>
            users.findByEmail(_user.email)
                .then(({ name,surname,email,password,id,_id}) => {
                    
                    expect(id).to.exist
                    expect(id).to.be.a('string')
                    expect(_id).to.be.a('undefined')
                    expect(name).to.equal(_user.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                })
                
        )
    })

    describe('find user by id', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }
        let _id 

        beforeEach(()=> 
        users.collection.insertOne(_user)
        
        .then((id) => {
            return users.findByEmail(_user.email).then(({ id }) => {
                _id = id
            })
        })
        
        
        )

        it('should succeed on correct data', () =>
            users.findById(ObjectId(_id))
                .then((user) => {
                    
                    expect(user.name).to.equal(_user.name)
                    expect(user.id).to.equal(_id)
                    expect(user.surname).to.equal(_user.surname)
                    expect(user.email).to.equal(_user.email)
                    expect(user.password).to.equal(_user.password)
                })
                
        )
    })
    after(() =>
        users.collection.deleteMany()
            .then(() => client.close())
    )
    
})