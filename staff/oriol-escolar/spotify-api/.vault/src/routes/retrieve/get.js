
const logic = require('../../logic')

module.exports = (req, res) => {
    
    const { headers: { authorization }, params:{id} } = req 
    
    try {
      
            logic.retrieveUser(id,authorization)
            .then(res.json.bind(res))

            .catch(({ message }) => {
                res.status(401).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(401).json({
            error: message
        })
    }
}