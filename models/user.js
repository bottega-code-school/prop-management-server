const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// define our model
const userSchema = new Schema({
    fullname: String,
    unit: String,
    email: { type: String, unique: true, lowercase: true },
    password: String,
    admin: Boolean
});

// on save hook, encrypt password
// before saving a model, run this function.
userSchema.pre('save', function(next) {
    // get access to the user model. current instance user.email user.password type junk
    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        if(err) { return next(err); }
        //hash / encrypt the password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) {
                return next(err);
            }
          
            // overrite plain text password with encrypted password
            user.password = hash;
            next();
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) { return callback(err); }

        callback(null, isMatch);
    })
}

// create the model class
const ModelClass = mongoose.model('user', userSchema)

// export the model
module.exports = ModelClass;


