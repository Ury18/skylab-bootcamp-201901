'use strict'

import userApi from '.'

describe('user api', () => {
    const username = `manuelbarzi-${Math.random()}`
    const password = '123'

    describe('register', () => {
        it('should succeed on correct data', () =>
            userApi.register(username, password)
                .then(id => expect(id).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        )

        it('should fail on already existing user', () =>
            userApi.register(username, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${username}\" already exists`)
                })
        )
    })


    describe('auth', () => {
        it('should succeed on correct data', () =>
            userApi.auth(username, password)
                .then(({ id, token }) => {

                    expect(token).toBeDefined()
                    expect(id).toBeDefined()
                })
                .catch(error => expect(error).toBeUndefined())
        )

        it('should fail on incorrect user data', () =>
            userApi.auth(username, '4')
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()

                })
        )

    })

    describe('retrieve', () => {
        it('should succeed on correct data', () => {
            userApi.auth(username, password)
                .then(({ id, token }) => {

                    expect(token).toBeDefined()
                    expect(id).toBeDefined()
                    userApi.retrive(id, token)
                        .then((data) => expect(data).toBeDefined())


                })
                .catch(error => expect(error).toBeUndefined())
        }
        )

        it('should fail on invalid token and id',()=>{

            userApi.retrive('a','a')
            .then(()=>{
                throw Error('should not have passed by here')
            })
            .catch(error => {expect(error).toBeDefined()                
            })


        })

    })
    
    describe('update', () => {
        it('should succeed on correct data', () => {
            return userApi.auth(username, password)
                .then(({ id, token }) => {

                    expect(token).toBeDefined()
                    expect(id).toBeDefined()
                    userApi.update(id, token, {age:20})
                    userApi.retrive(id,token)
                        .then((data) => {
                            
                            expect(data.age).toBe(20)
                        
                        
                        })


                })
                .catch(error => expect(error).toBeUndefined())
        }
        )

        it('should fail on invalid token',()=>{

            userApi.update('a','a',{age:20})
            .then((error => expect(error).toBeDefined()))
            .catch(({age}) => expect(age).toBeUnDefined())



        })

    })
    describe('remove', () => {
        it('should succeed on correct data', () => {
            return userApi.auth(username, password)
                .then(({ id, token }) => {

                    expect(token).toBeDefined()
                    expect(id).toBeDefined()
                    userApi.remove(username,password,id, token)
                    userApi.retrive(id,token)
                        .then((data) => {
                            
                            expect(data).toBeUndefined()
                        
                        
                        })


                })
                .catch(error => expect(error).toBeUndefined())
        }
        )

        it('should fail on invalid token',()=>{

            userApi.update('a','a',{age:20})
            .then((error => expect(error).toBeDefined))
            .catch(({age}) => expect(age).toBeUnDefined())



        })

    })
})