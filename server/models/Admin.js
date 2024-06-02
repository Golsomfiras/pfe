require('./db')
const mongoose = require('mongoose');
require('./Survey')

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const AdminModel = mongoose.model("admins", AdminSchema)
module.exports = AdminModel