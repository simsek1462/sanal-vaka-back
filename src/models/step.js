const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    heads: [
        {
            type: Schema.Types.ObjectId,
            ref:"HeadTitle"
        }
    ],
    type: {
        type: Schema.Types.ObjectId,
        ref: 'ComponentType'
    }
});

const Step = mongoose.model('Step');

module.exports = Step;