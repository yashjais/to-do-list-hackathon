const mongoose = require('mongoose')

const setUpDB = () => {
    mongoose.connect('mongodb://localhost:27017/to-do-list', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(res => console.log('connected to the DB'))
        .catch(err => console.log(err))
}

module.exports = setUpDB