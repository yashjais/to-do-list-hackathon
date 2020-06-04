const mongoose = require('mongoose')

const setUpDB = () => {
    mongoose.connect('mongodb://localhost:27017/to-do-list-hackathon', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
        .then(res => console.log('connected to the DB'))
        .catch(err => console.log(err))
}

module.exports = setUpDB