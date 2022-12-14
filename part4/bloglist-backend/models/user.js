const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   blogs: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Blog',
      },
   ],
   username: {
      type: String,
      required: [true, 'please provide username'],
      unique: true,
      minlength: 3,
   },
   name: String,
   passwordHash: String,
   likes: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Blog',
      },
   ],
});

userSchema.set('toJSON', {
   transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject.__v;
      delete returnedObject.passwordHash;
   },
});

module.exports = mongoose.model('User', userSchema);
