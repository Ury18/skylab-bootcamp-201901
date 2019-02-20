const uuid = require('uuid/v4')
const fs = require('fs')
const path = require('path')
const file = path.join(__dirname, 'artist-comments.json')


const artistComment = {
    add(comment) {
        comment.id = uuid()
        return new Promise((resolve, reject) =>

            fs.readFile(file, 'utf8', ((err, data) => {
                if (err) reject(err)
                data = JSON.parse(data)
                data.push(comment)
                dataJS = JSON.stringify(data)
                fs.writeFile(file, dataJS, err => {
                    if (err) reject(err)
                    resolve(true)
                })

            }))

        )
    },

    retrieve(id) { //Param: Comment.id, returns the comment object
        return new Promise((resolve, reject) =>

            fs.readFile(file, 'utf8', ((err, data) => {

                if (err) reject(err)
                data = JSON.parse(data)
                data = data.filter(comment => comment.id === id)
                if (data[0]) resolve(data[0])
                else resolve(undefined)
            })


            ))
    },

    update(newComment) { //Overrides a comment
        return new Promise((resolve, reject) =>


            fs.readFile(file, 'utf8', ((err, data) => {
                if (err) reject(err)
                else {
                    data = JSON.parse(data)
                    objectToReplace = data.findIndex(comment => comment.id === newComment.id)
                    data.splice(objectToReplace, 1, newComment)
                    dataJSON = JSON.stringify(data)
                    fs.writeFile(file, dataJSON, err => {
                        if (err) reject(err)
                        resolve(true)
                    })
                }
            }))


        )

    },

    delete(id) { //Deletes a comment, param comment.id

        return new Promise((resolve, reject) =>

            fs.readFile(file, 'utf8', ((err, data) => {

                if (err) reject(err)
                data = JSON.parse(data)
                let index = data.findIndex(comment => comment.id === id)
                console.log('INDEX:' + index)
                data.splice(index, 1)
                let dataJSON = JSON.stringify(data)
                fs.writeFile(file, dataJSON, err => {
                    if (err) reject(err)
                    resolve(true)
                })

            }))

        )


    },

    find(props) {
        return new Promise((resolve, reject) =>

            fs.readFile(file, 'utf8', ((err, data) => {

                if (err) reject(err)
                data = JSON.parse(data)
                data = data.filter(comment => {

                    for (const key in props) {
                        
                        if (comment[key] !== props[key]) return false

                    }
                    return true
                })
                debugger
                if (data) resolve(data)
                else resolve(undefined)
            })


            ))


    }
}

module.exports = artistComment;