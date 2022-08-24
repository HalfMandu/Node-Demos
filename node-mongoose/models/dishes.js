const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        require: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema]
},{
    //auto gen timestamp
    timestamps: true
});

//PLURAL auto constructed name in Mongoose...
//create a modal of type Dish schema defined above
var Dishes = mongoose.model('Dish', dishSchema);

//make modal available to rest of application
module.exports = Dishes;