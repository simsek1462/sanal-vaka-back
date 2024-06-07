const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stepSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    heads: [
        {
            type: Schema.Types.ObjectId,
            ref: "HeadTitle"
        }
    ],
    questions: [
        {
            type:Schema.Types.ObjectId,
            ref: "Question"
        }
    ],
    type: {
        type: Schema.Types.ObjectId,
        ref: 'ComponentType'
    }
});

const Step = mongoose.model('Step', stepSchema);

module.exports = Step;