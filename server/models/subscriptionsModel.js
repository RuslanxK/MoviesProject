const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({ 

    movieid: String,
    memberid: String,
    date: String
})

module.exports = mongoose.model("subscriptions", subscriptionSchema)

