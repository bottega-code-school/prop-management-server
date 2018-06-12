const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our model
const requestSchema = new Schema({
    // email: { type: String, unique: true, lowercase: true },
    title: String,
    body: String,
    date: Date,
    imageUrl: String,
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: String
    // image: { data: Buffer, contentType: String }
});

// create the model class
const ModelClass = mongoose.model('request', requestSchema)

// export the model
module.exports = ModelClass;


