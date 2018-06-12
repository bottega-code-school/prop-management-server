const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our model
const newsletterSchema = new Schema({
    // email: { type: String, unique: true, lowercase: true },
    title: String,
    body: String,
    date: Date,
    imageUrl: String
    // image: { data: Buffer, contentType: String }
});

// create the model class
const ModelClass = mongoose.model('newsletter', newsletterSchema)

// export the model
module.exports = ModelClass;


