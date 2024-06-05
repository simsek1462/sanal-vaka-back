const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComponentTypeSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    }
})
const ComponentType = mongoose.model('ComponentType',ComponentType);
module.exports = ComponentType;